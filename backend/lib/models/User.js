const { Schema, model } = require("mongoose");

// User Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    unique: true,
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: false,
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: "Location",
  },
});

module.exports = model("User", UserSchema);
