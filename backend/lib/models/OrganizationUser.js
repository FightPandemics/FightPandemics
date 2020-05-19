const { Schema } = require("mongoose");
const { model: User } = require("./User");
const {
  updateAuthorName: updatePostAuthorName,
  updateAuthorType: updatePostAuthorType,
} = require("./Post");
const {
  updateAuthorName: updateCommentAuthorName,
  updateAuthorType: updateCommentAuthorType,
} = require("./Comment");

function updateAuthorNameReferences(name) {
  updatePostAuthorName(this._id, name);
  updateCommentAuthorName(this._id, name);

  return name;
}

function updateAuthorTypeReferences(type) {
  updatePostAuthorType(this._id, type);
  updateCommentAuthorType(this._id, type);

  return type;
}

const organizationSchema = new Schema(
  {
    global: Boolean,
    industry: { required: true, type: String },
    language: String,
    name: {
      required: true,
      set: updateAuthorNameReferences,
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
        "R&D",
        "Startup",
        "University",
      ],
      required: true,
      set: updateAuthorTypeReferences,
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
