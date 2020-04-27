const { Schema, Types } = require("mongoose");

const OrganizationSchema = new Schema({
  address: {
    type: String,
  },
  androidUrl: {
    type: String,
  },
  description: {
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  global: {
    type: Boolean,
  },
  industry: {
    required: true,
    type: String,
  },
  iosUrl: {
    type: String,
  },
  language: {
    type: String,
  },
  linkedinUrl: {
    type: String,
  },
  location: {
    ref: "Location",
    type: Schema.Types.ObjectId,
  },
  name: {
    required: true,
    type: String,
  },
  needs: {
    required: true,
    type: Array,
  },
  ownerId: {
    ref: "User",
    required: true,
    type: Types.ObjectId,
  },
  twitterUrl: {
    type: String,
  },
  type: {
    required: true,
    type: String,
  },
  website: {
    type: String,
  },
});

module.exports = OrganizationSchema;
