const { Schema } = require("mongoose");

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

module.exports = LikeSchema;
