const mongoose = require("mongoose");

const { Schema } = mongoose;
const { schema: CommentSchema } = require("./Comment");

// Create Schema
const PostSchema = new Schema({
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: [String],
    required: true,
    default: undefined,
  },
  shareWith: {
    type: [String],
    required: true,
    default: undefined,
  },
  looking: {
    type: [String],
    required: true,
    default: undefined,
  },
  needs: {
    type: [String],
    required: true,
    default: undefined,
  },
  status: {
    type: Boolean,
    required: true,
  },
  comments: {
    type: [CommentSchema],
    default: [],
  },
  tags: [String],
  language: [String],
  website: String,
  iosUrl: String,
  androidUrl: String,
  media: String,
  postEmail: String,
});

module.exports = mongoose.model("Post", PostSchema);
