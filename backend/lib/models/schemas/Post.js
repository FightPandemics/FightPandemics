const { Schema } = require("mongoose");

const CommentSchema = require("./Comment");

const PostSchema = new Schema(
  {
    androidUrl: String,
    authorId: {
      ref: "User",
      required: true,
      type: String,
    },
    comments: {
      type: [CommentSchema],
    },
    commentsCount: {
      type: Number,
    },
    description: {
      required: true,
      type: String,
    },
    iosUrl: String,
    language: [String],
    likes: {
      type: [String],
    },
    likesCount: {
      type: Number,
    },
    looking: {
      type: [String],
      // required: true,
    },
    media: String,
    needs: {
      type: [String],
      // required: true,
    },
    postEmail: String,
    shareWith: {
      type: [String],
      // required: true,
    },
    status: {
      type: Boolean,
      // required: true,
    },
    tags: [String],
    title: {
      required: true,
      type: String,
    },
    type: {
      type: [String],
      // required: true,
    },
    website: String,
  },
  {
    timestamps: true,
  },
);

module.exports = PostSchema;
