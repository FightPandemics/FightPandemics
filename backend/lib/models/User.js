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
    location: Object,
    photo: String,
    notificationType: {
      type: String,
      enum: ["email", "sms", "push"],
    },
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
