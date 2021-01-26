// -- Imports
const { Schema, model, ObjectId } = require("mongoose");
const { USER_TYPES } = require("./Author");

const CONVERSATION_STATUS_OPTIONS = [
  "accepted",
  "archived",
  "blocked",
  "pending",
  "ignored",
];

// -- Schema
const participantSchema = new Schema({
  id: {
    ref: "User",
    required: true,
    type: ObjectId,
  },
  emailSent: Boolean,
  lastAccess: Date,
  name: {
    required: true,
    type: String,
  },
  newMessages: {
    default: 0,
    required: true,
    type: Number,
  },
  photo: String,
  status: {
    default: "accepted",
    enum: CONVERSATION_STATUS_OPTIONS,
    lowercase: true,
    required: true,
    trim: true,
    type: String,
  },
  type: {
    enum: USER_TYPES,
    required: true,
    trim: true,
    type: String,
  },
  verified: Boolean,
});

const threadSchema = new Schema(
  {
    participants: {
      type: [participantSchema],
    },
  },
  { collection: "threads", timestamps: true },
);

// -- Indexes
/* eslint-disable */
// Index to get inbox sorted
threadSchema.index({
  "participants.id": 1,
  "updatedAt": 1
});

// Index for Notification Lambda to query for unread messages
threadSchema.index({
  "participants.newMessages": 1,
  "participants.lastAccess": 1,
  "participants.emailSent": 1,
  "participants.status": 1,
});
/* eslint-enable */

// -- Model
const Thread = model("Thread", threadSchema);

module.exports = {
  CONVERSATION_STATUS_OPTIONS,
  model: Thread,
  schema: threadSchema,
};
