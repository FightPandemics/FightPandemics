const { model, Schema } = require("mongoose");

// User Schema
const UserSchema = new Schema(
  {
    _id: {
      required: true,
      type: Schema.Types.ObjectId,
    },
    accessToken: {
      required: false,
      type: String,
    },
    dateJoined: {
      default: Date.now,
      type: Date,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    firstName: {
      required: true,
      type: String,
    },
    lastName: {
      required: false,
      type: String,
    },
    location: Object,
    type: String,
  },
  {
    timestamps: true,
  },
);

const User = model("User", UserSchema);

exports.model = User;
exports.schema = UserSchema;
