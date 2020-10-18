const { Schema, model } = require("mongoose");

const notificationSchema = new Schema(
  {
    action: {
      enum: ["like", "comment", "post"],
      required: true,
      type: String,
    },
    post: {
      id: {
        ref: "Post",
        required: true,
        type: Schema.Types.ObjectId,
      },
      title: String,
    },
    receiver: {
      ref: "User",
      required: true,
      type: Schema.Types.ObjectId,
    },
    readAt: Date,
    emailSentAt: Date,
    triggeredBy: {
      id: {
        ref: "User",
        required: true,
        type: Schema.Types.ObjectId,
      },
      name: String,
      photo: String,
      type: {
        type: String,
      }
    },
  },
  { collection: "notifications", timestamps: true },
);

/* eslint-disable sort-keys */
notificationSchema.index({
  createdAt: -1,
}, {
  expireAfterSeconds: 1296000,  // 15 days
});
notificationSchema.index({
  readAt: -1,
});
notificationSchema.index({
  emailSentAt: -1,
});
/* eslint-enable */

const Notification = model("Notification", notificationSchema);

module.exports = {
  model: Notification,
  schema: notificationSchema,
};
