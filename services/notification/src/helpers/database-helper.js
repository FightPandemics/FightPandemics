const { DateHelper } = require("./date-helper");
const { EmailFrequency } = require("../models/email-frequency");
const { MessageThreadStatus } = require("../models/message-thread-status");
const { MongoClient } = require("mongodb");
const { NotificationAction } = require("../models/notification-action");

class DatabaseHelper {
  constructor(config) {
    this.uri = this._buildUri(config);
    this.dbName = config.database;
    this.db = null;
    this.instantUnreadLookbackInterval = config.instantUnreadLookbackInterval;
    console.log("THREAD1")
  }
  
  async connect(cachedDb = null) {
    if (cachedDb && cachedDb.serverConfig.isConnected()) {
      this.db = cachedDb;
    } else {
      const client = await MongoClient.connect(this.uri, {
        useUnifiedTopology: true,
      });
      this.db = client.db(this.dbName);
    }
    console.log("THREAD2")
  }
 
  async findNotifications(frequency) {
    if (frequency === EmailFrequency.INSTANT) {
      return this._findInstantNotifications();
    } else if (frequency === EmailFrequency.MESSAGE) {
      return this._findUnreadDirectMessages();
    }
    return this._findDigestNotifications(frequency);
  }

  async _findUnreadDirectMessages() {
    const threads = await this.db
      .collection("threads")
      .aggregate([
        {
          $match: {
            participants: {
              $elemMatch: {
                newMessages: { $gt: 0 },
                emailSent: false,
                status: {
                  $in: [
                    MessageThreadStatus.ACCEPTED,
                    MessageThreadStatus.PENDING,
                  ],
                },
                $or: [
                  {
                    lastAccess: null,
                  },
                  {
                    lastAccess: {
                      $lt: DateHelper.subtractMinutes(
                        new Date(),
                        this.instantUnreadLookbackInterval,
                      ),
                    },
                  },
                ],
              },
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "participants.id",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $project: {
            participants: {
              $map: {
                input: "$participants",
                in: {
                  id: "$$this.id",
                  emailSent: "$$this.emailSent",
                  lastAccess: "$$this.lastAccess",
                  name: "$$this.name",
                  newMessages: "$$this.newMessages",
                  photo: "$$this.photo",
                  status: "$$this.status",
                  type: "$$this.type",
                  user: {
                    $arrayElemAt: [
                      "$user",
                      {
                        $indexOfArray: ["$user._id", "$$this.id"],
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      ])
      .toArray();

    const threadIds = threads.map((thread) => thread._id);
    console.log("THREAD3")
    // Convert threads array to object keyed by thread ID for O(1) lookup
    // See https://www.olioapps.com/blog/map-reduce/ for indexing an array of objects
    const threadsObject = threads.reduce(
      (accumulator, thread) => ({ ...accumulator, [thread._id]: thread }),
      {},
    );

    const messagesCursor = this.db.collection("messages").aggregate([
      {
        $match: {
          threadId: { $in: threadIds },
          createdAt: {
            $gt: DateHelper.subtractMinutes(new Date(), 30),
          },
        },
      },
      { $sort: { createdAt: 1 } },
      {
        $group: {
          _id: "$threadId",
          latestMessage: {
            $last: "$$ROOT",
          },
        },
      },
    ]);

    const messages = [];

    while (await messagesCursor.hasNext()) {
      const message = await messagesCursor.next();
      const thread = threadsObject[message._id];
      /*
        The thread.participants array will always have only two elements in it
        (at least for direct messages). One of these participants is a sender
        while the other is a receiver. The newMessages count for participants
        is mutually exclusive in that only one of the participants will have
        this count greater than 0, while the other will have this count equal
        to 0. Therefore we can assume that the sender is the participant with
        newMessages count equal to 0, while the receiver is the participant
        with newMessages greater than 0.
      */
      const sender = thread.participants.find((p) => p.newMessages === 0);
      const receiver = thread.participants.find((p) => p.newMessages > 0);
      if (sender === undefined || receiver === undefined) {
        continue;
      }
      const { notifyPrefs, email } = receiver.user;
      if (notifyPrefs && !notifyPrefs.instant.message) {
        // Receiver has disabled instant notifications for direct messages
        continue;
      }
      await this.setThreadParticipantEmailSent(thread._id, receiver.id);
      messages.push({
        sender: { ...sender },
        receiver: { ...receiver, email },
        message: { ...message.latestMessage },
      });
    }

    return messages;
  }

  async setNotificationEmailSentAt(notificationIds, frequency) {
    return this.db.collection("notifications").updateMany(
      {
        _id: { $in: notificationIds },
      },
      {
        $set: {
          [`emailSentAt.${frequency}`]: new Date(),
        },
      },
    );
  }

  async (threadId, userId) {
    console.log("THREAD4")
    return this.db.collection("threads").findOneAndUpdate(
      {
        _id: threadId,
      },
      {
        $set: {
          [`participants.$[userToUpdate].emailSent`]: true,
        },
      },
      {
        arrayFilters: [
          {
            "userToUpdate.id": userId,
          },
        ],
      },
    );
  }
  
  async _findInstantNotifications() {
    console.log("THREAD4")
    const cursor = this.db.collection("notifications").aggregate([
      {
        $match: {
          readAt: null,
          "emailSentAt.instant": null,
          createdAt: {
            $lt: DateHelper.subtractMinutes(
              new Date(),
              this.instantUnreadLookbackInterval,
            ),
          },
          action: { $in: Object.values(NotificationAction) },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "receiver",
          foreignField: "_id",
          as: "receiver",
        },
      },
      {
        $unwind: {
          path: "$receiver",
        },
      },
    ]);
    const notifications = await cursor.toArray();
    // Set emailSentAt timestamp right away so we don't risk sending duplicate emails.
    await this.setNotificationEmailSentAt(
      notifications.map((notification) => notification._id),
      EmailFrequency.INSTANT,
    );
    console.log("THREAD4")
    return notifications;
  }

  async _findDigestNotifications(frequency) {
    console.log("THREAD4")
    let intervalDays;
    if (frequency === EmailFrequency.DAILY) {
      intervalDays = 1;
    } else if (frequency === EmailFrequency.WEEKLY) {
      intervalDays = 7;
    } else if (frequency === EmailFrequency.BIWEEKLY) {
      intervalDays = 14;
    }

    const notificationsByReceiverCursor = this.db
      .collection("notifications")
      .aggregate([
        {
          $match: {
            [`emailSentAt.${frequency}`]: null,
            createdAt: {
              $gt: DateHelper.subtractDays(new Date(), intervalDays),
            },
            action: { $in: Object.values(NotificationAction) },
          },
        },
        {
          $group: {
            _id: "$receiver",
            notifications: {
              $push: "$$ROOT",
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "receiver",
          },
        },
        {
          $unwind: {
            path: "$receiver",
          },
        },
      ]);

    const digests = [];
    const processedNotificationIds = [];

    while (await notificationsByReceiverCursor.hasNext()) {
      console.log("THREAD4")
      const receiver = await notificationsByReceiverCursor.next();
      const topThreePosts = this._aggregateNotifications(
        receiver.notifications,
      );
      digests.push({
        posts: topThreePosts,
        receiver: receiver.receiver,
      });
      for (const notification of receiver.notifications) {
        processedNotificationIds.push(notification._id);
      }
    }

    // Set emailSentAt timestamp right away so we don't risk sending duplicate emails.
    await this.setNotificationEmailSentAt(processedNotificationIds, frequency);

    return digests;
  }

  _aggregateNotifications(notifications) {
    console.log("THREAD4")
    const notificationCountsByPost = {};
    for (const notification of notifications) {
      const postId = notification.post.id;
      const action = notification.action;
      if (!notificationCountsByPost.hasOwnProperty(postId)) {
        notificationCountsByPost[postId] = {
          latest: null,
          post: notification.post,
          counts: {
            comment: 0,
            like: 0,
            share: 0,
            total: 0,
          },
        };
      }
      notificationCountsByPost[postId].counts[action] += 1;
      notificationCountsByPost[postId].counts.total += 1;
      if (notification.action !== NotificationAction.COMMENT) {
        continue;
      }
      if (!notificationCountsByPost[postId].latest) {
        notificationCountsByPost[postId].latest = notification;
        continue;
      }
      if (
        notificationCountsByPost[postId].latest.createdAt <
        notification.createdAt
      ) {
        notificationCountsByPost[postId].latest = notification;
      }
    }

    const topThreePosts = Object.values(notificationCountsByPost)
      .filter((post) => post.counts.comment > 0 || post.counts.like > 0) // we don't care about share count
      .sort((a, b) => b.counts.total - a.counts.total)
      .slice(0, 3);
    return topThreePosts;
  }

  _buildUri(config) {
    console.log("THREAD4")
    const usernamePassword =
      config.username && config.password
        ? `${config.username}:${config.password}@`
        : "";
    const port = config.port ? `:${config.port}` : "";
    const retryWrites = config.retryWrites
      ? "?retryWrites=true&w=majority"
      : "";
    const uri = `${config.protocol}://${usernamePassword}${config.host}${port}${retryWrites}`;
    return uri;
  }
}

module.exports = {
  DatabaseHelper,
};
