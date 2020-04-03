const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  likedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  likedComment: {
    type: Schema.Types.ObjectId,
    ref: "comments",
  },
  likedPost: {
    type: Schema.Types.ObjectId,
    ref: "posts",
  },
});

module.exports = Like = mongoose.model("likes", LikeSchema);
