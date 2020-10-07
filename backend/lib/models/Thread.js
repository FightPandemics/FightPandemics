// -- Imports
const { Schema, model, ObjectId } = require("mongoose");
const { USER_TYPES } = require("./Author");

const CONVERSATION_STATUS_OPTIONS = [
  "accepted", "archived", "blocked", "pending"
];

// -- Schema
const participantSchema = new Schema(
  {
    id: {
      ref: "User",
      required: true,
      type: ObjectId,
    },
    lastAccess: Date,
    name: {
      required: true,
      type: String,
    },
    newMessages: {
      default: 0,
      required: true,
      type: Number
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
  }
)

const threadSchema = new Schema(
  {
    participants: {
      type: [participantSchema]
    },
  },
  { collection: "threads", timestamps: true },
);

// -- Indexes
/* eslint-disable */
// Index to ensure unique threads between users
threadSchema.index({ "participants.id": 1 });

// Index to get inbox sorted by most recent
threadSchema.index({
  "participants.id": 1,
  "status": 1,
  "updatedAt": -1
});
/* eslint-enable */

// -- Model
const Thread = model("Thread", threadSchema);

module.exports = {
  CONVERSATION_STATUS_OPTIONS,
  model: Thread,
  schema: threadSchema,
};
