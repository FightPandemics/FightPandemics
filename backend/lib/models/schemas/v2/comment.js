// -- Imports
const { Schema, model, ObjectId } = require("mongoose");
const { schema: authorSchema } = require("./author");

// -- Schema
const commentSchema = new Schema(
  {
    author: authorSchema,
    content: {
      required: true,
      trim: true,
      type: String,
    },
    likes: {
      // TODO: how to guarantee unique ids?
      default: [],
      ref: "User",
      type: [ObjectId],
    },
    parentId: {
      ref: "Comment",
      type: ObjectId,
    },
    postId: {
      ref: "Post",
      required: true,
      type: ObjectId,
    },
  },
  { collection: "comments", timestamps: true },
);

// -- Indexes
/* eslint-disable */
// Indexes for displaying comment tree of a post, also servers as post's foreign
// key index
commentSchema.index({
  postId: 1,
  parentId: 1,
  createdAt: -1,
});

// Index for parent comment's foreign key for lookup performance
commentSchema.index({ parentId: 1, createdAt: -1 });

// Index for author's foreign key for lookup performance
commentSchema.index({ "author.authorId": 1, createdAt: -1 });

// Index for like's foreign key for lookup performance
commentSchema.index({ likes: 1 });
/* eslint-enable */
// -- Model
const Comment = model("Comment", commentSchema);

exports.schema = commentSchema;
exports.model = Comment;
