const { Schema } = require("mongoose");
const { model: User } = require("./user");
const { updateAuthorName: updatePostAuthorName } = require("./post");
const { updateAuthorName: updateCommentAuthorName } = require("./comment");

function updateAuthorFirstName(firstName) {
  this.firstName = firstName;

  this.updateAuthorNameReferences();

  return firstName;
}

function updateAuthorLastName(lastName) {
  this.lastName = lastName;

  this.updateAuthorNameReferences();

  return lastName;
}

const individualUserSchema = new Schema(
  {
    firstName: {
      required: true,
      set: updateAuthorFirstName,
      type: String,
    },
    lastName: {
      set: updateAuthorLastName,
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

individualUserSchema.virtual("name").get(function getFullName() {
  return `${this.firstName} ${this.lastName}`;
});

individualUserSchema.methods.updateAuthorNameReferences = function () {
  updatePostAuthorName(this._id, this.name);
  updateCommentAuthorName(this._id, this.name);
};

const IndividualUser = User.discriminator(
  "IndividualUser",
  individualUserSchema,
);

exports.schema = individualUserSchema;
exports.model = IndividualUser;
