const { DateHelper } = require("./date-helper");
const { EmailFrequency } = require("../models/email-frequency");
const { MongoClient } = require("mongodb");
const { NotificationAction } = require("../models/notification-action");

class DatabaseHelper {
  constructor(config) {
    this.uri = this._buildUri(config);
    this.dbName = config.database;
    this.db = null;
    this.instantUnreadLookbackInterval = config.instantUnreadLookbackInterval;
  }

  async connect(cachedDb = null) {
    if (cachedDb && cachedDb.serverConfig.isConnected()) {
      this.db = cachedDb;
    } else {
      const client = await MongoClient.connect(this.uri);
      this.db = client.db(this.dbName);
    }
  }

  async findNotifications(frequency) {
    if (frequency === EmailFrequency.INSTANT) {
      return this._findInstantNotifications();
    }
    return this._findDigestNotifications(frequency);
  }

  async setEmailSentAt(notificationIds, frequency) {
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

  async _findInstantNotifications() {
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
    await this.setEmailSentAt(
      notifications.map((notification) => notification._id),
      EmailFrequency.INSTANT,
    );
    return notifications;
  }

  async _findDigestNotifications(frequency) {
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
    await this.setEmailSentAt(processedNotificationIds, frequency);

    return digests;
  }

  _aggregateNotifications(notifications) {
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
      .sort((a, b) => b.counts.total - a.counts.total)
      .slice(0, 3);
    return topThreePosts;
  }

  _buildUri(config) {
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
