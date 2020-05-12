const { model, Schema, Types } = require("mongoose");

const { CommentSchema } = require("./Comment");

const PostSchema = new Schema(
  {
    androidUrl: String,
    authorId: {
      ref: "User",
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
    iosUrl: String,
    language: [String],
    likes: {
      type: [Types.ObjectId],
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

module.exports.PostSchema = PostSchema;
module.exports.PostModel = model("Post", PostSchema);
