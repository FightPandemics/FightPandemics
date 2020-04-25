// -- Imports
const { Schema } = require("mongoose");
const { model: User } = require("./user");
const { model: Post } = require("./post");
const { model: Comment } = require("./comment");

// -- Schema
function updateAuthorFirstNameReferences(firstName) {
  Post.where(
    { "author.authorId": this._id },
    { $set: { "author.authorName": `${firstName} ${this.lastName}` } },
  );
  Comment.where(
    { "author.authorId": this._id },
    { $set: { "author.authorName": `${firstName} ${this.lastName}` } },
  );

  return firstName;
}
function updateAuthorLastNameReferences(lastName) {
  Post.where(
    { "author.authorId": this._id },
    { $set: { "author.authorName": `${this.firstName} ${lastName}` } },
  );
  Comment.where(
    { "author.authorId": this._id },
    { $set: { "author.authorName": `${this.firstName} ${lastName}` } },
  );

  return lastName;
}

const individualUserSchema = new Schema(
  {
    firstName: {
      required: true,
      set: updateAuthorFirstNameReferences,
      type: String,
    },
    lastName: {
      set: updateAuthorLastNameReferences,
      type: String,
    },
    needs: {
      medicalHelp: { default: false, required: true, type: Boolean },
      otherHelp: { default: false, required: true, type: Boolean },
    },
    objectives: {
      donate: { default: false, required: true, type: Boolean },
      shareInformation: { default: false, required: true, type: Boolean },
      volunteer: { default: false, required: true, type: Boolean },
    },
    type: {
      enum: ["individual"],
      lowercase: true,
      required: true,
      type: String,
    },
    urls: {
      facebook: String,
      github: String,
      linkedin: String,
      twitter: String,
      website: String,
    },
  },
  { collection: "users" },
);

// -- Methods

individualUserSchema.virtual("fullName").get(function getFullName() {
  return `${this.firstName} ${this.lastName}`;
});

// -- Indexes

// -- Model
const IndividualUser = User.discriminator(
  "IndividualUser",
  individualUserSchema,
);

exports.schema = individualUserSchema;
exports.model = IndividualUser;
