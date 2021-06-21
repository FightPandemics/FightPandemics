const { Schema } = require("mongoose");
const { model: User } = require("./User");

const posDescription = "";

const organisationSchema = new Schema(
  {
    global: Boolean,
    industry: { required: true, type: String },
    language: String,
    name: {
      required: true,
      type: String,
    },
    needs: {
      donations: { default: false, required: true, type: Boolean },
      other: { default: false, required: true, type: Boolean },
      staff: { default: false, required: true, type: Boolean },
      volunteers: { default: false, required: true, type: Boolean },
    },
    ownerId: {
      ref: "IndividualUser",
      required: true,
      type: Schema.Types.ObjectId,
    },
    type: {
      enum: [
        "Company",
        "Community",
        "Government",
        "Health care provider",
        "Non-profit",
        "Other",
        "Startup",
        "University",
      ],
      required: true,
      type: String,
    },
    urls: {
      appStore: String,
      facebook: String,
      github: String,
      instagram: String,
      linkedin: String,
      playStore: String,
      twitter: String,
      website: String,
    },
    isJoinOrg: {
      required: true,
      type: Boolean,
      default: false,
    },
    isNewApplicant: {
      required: true,
      type: Boolean,
      default: false,
    },
    orgBookLink: {
      required: false,
      type: String,
    },
    positions: {
      name: { default: "Volunteer", type: String, },
      description: { default: "We at-are now accepting volunteers who are as excited as us about our cause. Feel free to submit your application and we will get back to you as soon as possible. Happy volunteering!", required: true, type: String, },
    },
    orgBookPages: Array,
  },
  { collection: "users" },
);

const OrganisationUser = User.discriminator(
  "OrganisationUser",
  organisationSchema,
);

exports.schema = organisationSchema;
exports.model = OrganisationUser;
