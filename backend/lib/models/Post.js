const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CommentSchema = require("./Comment").schema;

// Create Schema
const PostSchema = new Schema({
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "users",
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
  likes: {
    type: [Schema.Types.ObjectId],
    ref: "likes",
  },
  tags: [String],
  language: [String],
  website: String,
  iosUrl: String,
  androidUrl: String,
  media: String,
  postEmail: String,
});

module.exports = Post = mongoose.model("posts", PostSchema);
