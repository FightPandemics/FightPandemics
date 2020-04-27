const { Schema } = require("mongoose");

const CommentSchema = require("./Comment");

const PostSchema = new Schema(
  {
    androidUrl: String,
    authorId: {
      ref: "users",
      required: true,
      type: Schema.Types.ObjectId,
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
    fromWhom: {
      type: [String],
      // required: true,
    },
    helpType: String,
    iosUrl: String,
    language: [String],
    likes: {
      type: [Schema.Types.ObjectId],
    },
    likesCount: {
      type: Number,
    },
    media: String,
    needs: {
      type: [String],
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
    title: {
      required: true,
      type: String,
    },
    website: String,
  },
  {
    timestamps: true,
  },
);

module.exports = PostSchema;
