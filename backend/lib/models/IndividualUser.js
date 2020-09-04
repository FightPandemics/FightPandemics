const { Schema } = require("mongoose");
const { model: User } = require("./User");

const INDIVIDUAL_USER_TYPES = ["Individual"];

function fullName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}

const individualUserSchema = new Schema(
  {
    authId: {
      required: true,
      type: String,
    },
    firstName: {
      required: true,
      type: String,
    },
    hide: {
      address: { default: false, type: Boolean },
    },
    lastName: {
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
      default: "Individual",
      enum: INDIVIDUAL_USER_TYPES,
      type: String,
    },
    urls: {
      facebook: String,
      github: String,
      instagram: String,
      linkedin: String,
      twitter: String,
      website: String,
    },
  },
  { collection: "users" },
);

individualUserSchema.virtual("name").get(function getFullName() {
  return fullName(this.firstName, this.lastName);
});

individualUserSchema.virtual("organisations", {
  foreignField: "ownerId",
  localField: "_id",
  ref: "OrganisationUser",
});

const IndividualUser = User.discriminator(
  "IndividualUser",
  individualUserSchema,
);

module.exports = {
  INDIVIDUAL_USER_TYPES,
  model: IndividualUser,
  schema: individualUserSchema,
};
