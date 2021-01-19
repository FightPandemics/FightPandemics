// -- Imports
const { Schema, model, ObjectId } = require("mongoose");

const MODERATOR_ACTIONS = ["accept", "reject"];

const auditLogSchema = new Schema(
  {
    moderatorId: {
      ref: "User",
      required: true,
      type: ObjectId,
    },
    action: {
      required: true,
      type: String,
      enum: MODERATOR_ACTIONS,
    },
    justification: {
      required: true,
      type: String,
    },
    postId: {
      ref: "Post",
      required: true,
      type: ObjectId,
    },
  },
  { collection: "auditlogs", timestamps: true },
);

// -- Model
const Audit = model("Audit", auditLogSchema);

module.exports = {
  MODERATOR_ACTIONS,
  model: Audit,
  schema: auditLogSchema,
};
