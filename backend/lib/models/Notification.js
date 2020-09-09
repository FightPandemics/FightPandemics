const { Schema, model } = require("mongoose");

const notificationSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      enum: ["like", "comment", "post", "share"],
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    isRead: { default: false, required: true, type: Boolean },
  },
  { collection: "notifications", timestamps: true },
);

const Notification = model("Comment", notificationSchema);

module.exports = {
  model: Notification,
  schema: notificationSchema,
};
