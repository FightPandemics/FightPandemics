const { Schema } = require("mongoose");

const CommentSchema = new Schema({
  authorId: {
    ref: "User",
    required: true,
    type: Schema.Types.ObjectId,
  },
  comment: {
    required: true,
    type: String,
  },
  postId: {
    ref: "Post",
    required: true,
    type: Schema.Types.ObjectId,
  },
});

module.exports = CommentSchema;
