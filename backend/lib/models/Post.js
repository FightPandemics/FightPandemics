const { Schema } = require("mongoose");

const CommentSchema = require("./Comment");
// const LikeSchema = require("./Like");

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
    // required: true,
  },
  shareWith: {
    type: [String],
    // required: true,
  },
  looking: {
    type: [String],
    // required: true,
  },
  needs: {
    type: [String],
    // required: true,
  },
  status: {
    type: Boolean,
    // required: true,
  },
  comments: {
    type: [CommentSchema],
    default: [],
  },
  likes: {
    type: [Schema.Types.ObjectId],
    refs: "likes",
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

module.exports = PostSchema;
