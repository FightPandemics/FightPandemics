const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "posts",
    required: true,
  },
});

module.exports = Like = mongoose.model("likes", LikeSchema);
