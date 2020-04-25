// -- Imports
const { Schema } = require("mongoose");
const { model: User } = require("./user");
const { model: Post } = require("./post");
const { model: Comment } = require("./comment");

// -- Schema
function updateAuthorNameReferences(name) {
  Post.where(
    { "author.authorId": this._id },
    { $set: { "author.authorName": name } },
  );
  Comment.where(
    { "author.authorId": this._id },
    { $set: { "author.authorName": name } },
  );

  return name;
}

function updateAuthorTypeReferences(type) {
  Post.where(
    { "author.authorId": this._id },
    { $set: { "author.authorType": type } },
  );
  Comment.where(
    { "author.authorId": this._id },
    { $set: { "author.authorType": type } },
  );

  return type;
}

const organizationSchema = new Schema(
  {
    global: Boolean,
    industry: { required: true, type: String },
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
        "Individual",
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

// -- Indexes

// -- Model
const OrganizationUser = User.discriminator(
  "OrganizationUser",
  organizationSchema,
);

exports.schema = organizationSchema;
exports.model = OrganizationUser;
