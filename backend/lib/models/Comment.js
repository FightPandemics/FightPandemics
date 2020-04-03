const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  ownerId: {
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
