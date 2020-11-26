const fp = require("fastify-plugin");

class Notifier {
  constructor(app) {
    this.app = app;
    this.Notification = app.mongo.model("Notification");
    this.User = app.mongo.model("User");
    this.Organisation = app.mongo.model("OrganisationUser");
  }

  async notify(action, post, triggeredById, authUserId, details = {}) {
    if (post.author.id.toString() == triggeredById.toString()) return; // user/org interacted with their own post
    if (!this.Notification.schema.tree.action.enum.includes(action)) {
      return this.app.log.error(new Error("Invalid Notification action"));
    }

    const [triggeredByErr, triggeredBy] = await this.app.to(
      this.User.findById(triggeredById),
    );
    if (triggeredByErr || !triggeredBy) return;

    // org interacted with owner's post or other owned orgs by its owner.
    if (
      triggeredBy.ownerId &&
      triggeredBy.ownerId.toString() == authUserId.toString()
    )
      return;

    if (!triggeredBy.ownerId) { // only do this extra query if triggredBy is user not org
      const [isOwnerErr, isOwner] = await this.app.to(
        this.Organisation.exists({ _id: post.author.id, ownerId: triggeredById }),
      );
      // owner intercated with owned org post.
      if (isOwner) return;
    }

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
    }

    // send real-time web notification, the user will receive it if online
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
