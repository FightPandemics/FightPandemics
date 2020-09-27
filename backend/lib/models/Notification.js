const { Schema, model } = require("mongoose");

const notificationSchema = new Schema(
  {
    action: {
      enum: ["like", "comment", "post"],
      required: true,
      type: String,
    },
    oneOf: {
      CommentNotification: new Schema({
        action: String,
        id: {
          ref: "Comment",
          type: Schema.Types.ObjectId,
        },
        type: String,
      }),
      MessageNotification: new Schema({
        action: String,
        id: {
          ref: "Post",
          type: Schema.Types.ObjectId,
        },
        type: String,
      }),
      OrganizationNotification: new Schema({
        action: String,
        id: {
          ref: "Post",
          type: Schema.Types.ObjectId,
        },
        type: String,
      }),
      PostNotification: new Schema({
        action: String,
        id: {
          ref: "Post",
          type: Schema.Types.ObjectId,
        },
        type: String,
      }),
    },
    receiver: {
      ref: "User",
      required: true,
      type: Schema.Types.ObjectId,
    },
    seenAt: Date,
    sentAt: Date,
    triggeredBy: {
      id: {
        ref: "User",
        type: Schema.Types.ObjectId,
      },
      name: String,
      photo: String,
      type: String,
    },
  },
  { collection: "notifications", timestamps: true },
);

const Notification = model("Comment", notificationSchema);

module.exports = {
  model: Notification,
  schema: notificationSchema,
};
