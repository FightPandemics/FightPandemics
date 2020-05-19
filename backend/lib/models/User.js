const { Schema, model } = require("mongoose");
const { schema: locationSchema } = require("./Location");
const { isValidEmail } = require("../utils");

const userSchema = new Schema(
  {
    about: { maxLength: 100, trim: true, type: String },
    authId: { required: true, type: String },
    email: {
      required: true,
      type: String,
      validator: isValidEmail,
    },
    location: locationSchema,
    photo: String,
  },
  { collection: "users", timestamps: true },
);

// indices keys aren't meant to be sorted alphabetically. Please don't change
// the keys' order unless you really intend to change indexing
userSchema.index({
  type: 1,
  ownerId: 1,
  createdAt: -1,
});

const User = model("User", userSchema);

exports.schema = userSchema;
exports.model = User;
