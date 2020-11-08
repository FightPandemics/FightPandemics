const fp = require("fastify-plugin");
const { getSocketIdByUserId } = require("./socket");

class Notifier {
  constructor(app) {
    this.app = app;
    this.Notification = app.mongo.model("Notification");
    this.User = app.mongo.model("User");
  }

  async notify(action, post, triggeredById, details = {}) {
    if (post.author.id.toString() == triggeredById.toString()) return; // user interacted with their own post
    if (!this.Notification.schema.tree.action.enum.includes(action)) {
      return this.app.log.error(new Error("Invalid Notification action"));
    }

    const [triggeredByErr, triggeredBy] = await this.app.to(
      this.User.findById(triggeredById),
    );
    if (triggeredByErr || !triggeredBy) return;

    const newNotification = {
      action,
      post: {
        id: post._id,
        title: post.title,
      },
      receiver: post.author.id,
      readAt: null,
      emailSentAt: {
        biweekly: null,
        daily: null,
        instant: null,
        weekly: null,
      },
      sharedVia: details.sharedVia,
      commentText: details.commentText,
      triggeredBy: {
        id: triggeredBy._id,
        name: triggeredBy.name,
        photo: triggeredBy.photo,
        type: triggeredBy.type,
      },
    };

    const [err, notification] = await this.app.to(
      new this.Notification(newNotification).save(),
    );

    if (err) {
      if (err.code === 11000) return; // MongoError: E11000 duplicate key error
      return this.app.log.error(err, "Failed saving new Notification");
    };

    // send real-time web notification if online
    const userIsOnline = await getSocketIdByUserId(
      this.app,
      post.author.id.toString(),
    );
    if (userIsOnline)
      this.app.io
        .to(post.author.id.toString())
        .emit("NEW_NOTIFICATION", notification);
  }
}

function fastifyNotifier(app, config, next) {
  try {
    app.decorate("notifier", new Notifier(app));
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = fp(fastifyNotifier);
