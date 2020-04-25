// -- Imports
const { Schema, model } = require("mongoose");
const { schema: locationSchema } = require("./location");
const { model: Post } = require("./post");
const { model: Comment } = require("./comment");

// -- Schema
const userSchema = new Schema(
  {
    about: { maxLength: 100, trim: true, type: String },
    authId: { required: true, type: String },
    email: {
      required: true,
      type: String,
      validator(email) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
    },
    location: locationSchema,
    photo: String,
  },
  { collection: "users", timestamps: true },
);

// -- Methods
function updateAuthorLocationReference(location) {
  Post.where(
    { "author.authorId": this._id },
    { $set: { "author.location": location } },
  );
  Comment.where(
    { "author.authorId": this._id },
    { $set: { "author.location": location } },
  );

  return location;
}
userSchema.path("location", {
  set: updateAuthorLocationReference,
});

// -- Indexes
/* eslint-disable */
userSchema.index({
  type: 1,
  ownerId: 1,
  createdAt: -1,
});
/* eslint-enable */

// -- Model
const User = model("User", userSchema);

exports.schema = userSchema;
exports.model = User;
