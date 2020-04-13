const { Schema } = require("mongoose");

const CommentSchema = new Schema(
  {
    authorId: {
      ref: "User",
      required: true,
      type: Schema.Types.ObjectId,
    },
    comment: {
      required: true,
      type: String,
    },
    createdAt: {
      required: true,
      type: Date,
    },
    parentId: {
      ref: "Comment",
      type: Schema.Types.ObjectId,
    },
    postId: {
      ref: "Post",
      required: true,
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  },
);

CommentSchema.index({
  createdAt: 1,
  postId: 1,
});

module.exports = CommentSchema;
