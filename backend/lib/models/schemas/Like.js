const { Schema } = require("mongoose");

const LikeSchema = new Schema({
  postId: {
    ref: "posts",
    required: true,
    type: Schema.Types.ObjectId,
  },
  userId: {
    ref: "users",
    required: true,
    type: Schema.Types.ObjectId,
  },
});

module.exports = LikeSchema;
