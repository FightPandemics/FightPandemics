const { Schema } = require("mongoose");
const { model: User } = require("./User");

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
      information: { default: false, required: true, type: Boolean },
      resources: { default: false, required: true, type: Boolean },
      othersDetail: { default: false, required: true, type: String },
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
  },
  { collection: "users" },
);

const OrganisationUser = User.discriminator(
  "OrganisationUser",
  organisationSchema,
);

exports.schema = organisationSchema;
exports.model = OrganisationUser;
