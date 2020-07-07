const { Schema } = require("mongoose");
const { model: User } = require("./User");

const organizationSchema = new Schema(
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
      linkedin: String,
      playStore: String,
      twitter: String,
      website: String,
    },
  },
  { collection: "users" },
);

const OrganizationUser = User.discriminator(
  "OrganizationUser",
  organizationSchema,
);

exports.schema = organizationSchema;
exports.model = OrganizationUser;
