const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
// const { schema: locationSchema } = require("./Location");
const { isValidEmail } = require("../utils");

const userSchema = new Schema(
  {
    about: { maxLength: 100, trim: true, type: String },
    email: {
      required: true,
      type: String,
      unique: true,
      uniqueCaseInsensitive: true,
      validator: isValidEmail,
    },
    notifyPrefs: {
      message: {
        instant: { default: true, type: Boolean },
        daily: { default: false, type: Boolean },
        weekly: { default: false, type: Boolean },
        biweekly: { default: false, type: Boolean },
      },
      like: {
        instant: { default: false, type: Boolean },
        daily: { default: false, type: Boolean },
        weekly: { default: true, type: Boolean },
        biweekly: { default: false, type: Boolean },
      },
      comment: {
        instant: { default: false, type: Boolean },
        daily: { default: true, type: Boolean },
        weekly: { default: false, type: Boolean },
        biweekly: { default: false, type: Boolean },
      },
      post: {
        instant: { default: false, type: Boolean },
        daily: { default: true, type: Boolean },
        weekly: { default: false, type: Boolean },
        biweekly: { default: false, type: Boolean },
      }
    },
    location: Object,
    photo: String,
  },
  { collection: "users", timestamps: true },
);

// indices keys aren't meant to be sorted alphabetically. Please don't change
// the keys' order unless you really intend to change indexing
/* eslint-disable sort-keys */
userSchema.index({
  type: 1,
  ownerId: 1,
  createdAt: -1,
});
/* eslint-enable */

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);

const User = model("User", userSchema);

exports.schema = userSchema;
exports.model = User;
