const { Schema } = require("mongoose");
const { model: User } = require("./User");
const { updateAuthorName: updatePostAuthorName } = require("./Post");
const { updateAuthorName: updateCommentAuthorName } = require("./Comment");

const INDIVIDUAL_USER_TYPES = ["individual"];

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
    authId: {
      required: true,
      type: String,
    },
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
      default: "individual",
      enum: INDIVIDUAL_USER_TYPES,
      lowercase: true,
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

individualUserSchema.methods.updateAuthorNameReferences = function updateAuthorNameReferences() {
  updatePostAuthorName(this._id, this.name);
  updateCommentAuthorName(this._id, this.name);
};

const IndividualUser = User.discriminator(
  "IndividualUser",
  individualUserSchema,
);

module.exports = {
  INDIVIDUAL_USER_TYPES,
  model: IndividualUser,
  schema: individualUserSchema,
};
