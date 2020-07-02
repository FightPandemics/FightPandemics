const { Schema, model, ObjectId } = require("mongoose");
const { schema: authorSchema } = require("./Author");
const { translateISOtoRelativeTime } = require("../utils");

const commentSchema = new Schema(
  {
    author: Object,
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
    timeElapsed : String,
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
commentSchema.index({ "author.id": 1, createdAt: -1 });

// Index for like's foreign key for lookup performance
commentSchema.index({ likes: 1 });
/* eslint-enable */

// post-save hook to set timeElapsed property with relative time string generated from createdAt.
commentSchema.post('save', function(doc) {
  this.set({ timeElapsed: translateISOtoRelativeTime(doc.createdAt) });
  this.save();
});

const Comment = model("Comment", commentSchema);

module.exports = {
  model: Comment,
  schema: commentSchema,
};
