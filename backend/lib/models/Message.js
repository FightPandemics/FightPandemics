// -- Imports
const { Schema, model, ObjectId } = require("mongoose");
const { schema: authorSchema } = require("./Author");
const { POST_OBJECTIVES: OBJECTIVES } = require("./Post");

const MESSAGE_STATUS_OPTIONS = ["deleted", "edited", "sent"]

// -- Schema
const postRefSchema = new Schema(
  {
    author: Object,
    content: {
      required: true,
      type: String,
    },
    id: {
      ref: "Post",
      required: true,
      type: ObjectId,
    },
    objective: {
      enum: OBJECTIVES,
      required: true,
      trim: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
    }
  }
)

const messageSchema = new Schema(
  {
    authorId: {
      ref: "User",
      required: true,
      type: ObjectId,
    },
    content: {
      required: true,
      trim: true,
      type: String,
    },
    postRef: postRefSchema,
    status: {
      default: "sent",
      enum: MESSAGE_STATUS_OPTIONS,
      lowercase: true,
      required: true,
      trim: true,
      type: String,
    },
    threadId: {
      ref: "Thread",
      required: true,
      type: ObjectId,
    },
  },
  { collection: "messages", timestamps: true },
);

// -- Indexes
/* eslint-disable */
// Index to get messages of a conversation ordered by creation date (_id)uses
// creation timestamp)
messageSchema.index({
  "threadId": 1,
  "status": 1,
  "_id": -1
});
/* eslint-enable */

const Message = model("Message", messageSchema);

module.exports = {
  MESSAGE_STATUS_OPTIONS,
  model: Message,
  schema: messageSchema,
};
