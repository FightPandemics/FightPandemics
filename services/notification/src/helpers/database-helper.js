const { DateHelper } = require("./date-helper");
const { MongoClient } = require("mongodb");

class DatabaseHelper {
  constructor(config) {
    this.uri = this._buildUri(config);
    this.dbName = config.database;
    this.db = null;
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
    // TODO handle frequency. For now only doing instant
    return this._findInstantNotifications();
  }

  async setEmailSentAt(notificationId) {
    return this.db.collection("notifications").updateOne(
      {
        $eq: {
          _id: notificationId,
        },
      },
      {
        $set: {
          emailSentAt: new Date(),
        },
      },
    );
  }

  async _findInstantNotifications() {
    const cursor = this.db.collection("notifications").aggregate([
      {
        $match: {
          readAt: null,
          emailSentAt: null,
          createdAt: {
            $lt: DateHelper.subtractMinutes(new Date(), 5),
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
    return cursor.toArray();
  }

  _buildUri(config) {
    const usernamePassword =
      config.username && config.password
        ? `${config.username}:${config.password}@`
        : "";
    const port = config.port ? `:${config.port}` : "";
    const retryWrites = config.retryWrites ? "?retryWrites=true&w=majority" : ""
    const uri = `${config.protocol}://${usernamePassword}${config.host}${port}${retryWrites}`;
    return uri;
  }
}

module.exports = {
  DatabaseHelper,
};
