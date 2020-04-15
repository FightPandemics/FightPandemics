const { Schema } = require("mongoose");

// User Schema
const UserSchema = new Schema({
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
  location: {
    ref: "Location",
    type: Schema.Types.ObjectId,
  },
});

module.exports = UserSchema;
