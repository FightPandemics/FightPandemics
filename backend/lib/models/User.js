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

userSchema.index(
  {
    name: "text",
    firstName: "text",
    lastName: "text",
    about: "text",
  },
  {
    weights: {
      name: 2,
      firstName: 2,
      lastName: 2,
      about: 1,
    },
  },
);

// To be removed (testing only)
userSchema.createIndexes();
/* eslint-enable */

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);

const User = model("User", userSchema);

exports.schema = userSchema;
exports.model = User;
