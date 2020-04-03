const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "posts",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

module.exports = Comment = mongoose.model("comments", CommentSchema);
