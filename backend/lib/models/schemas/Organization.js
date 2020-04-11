const { Schema } = require("mongoose");

const OrganizationSchema = new Schema({
  address: {
    required: false,
    type: String,
  },
  androidUrl: {
    required: false,
    type: String,
  },
  description: {
    required: false,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  global: {
    required: false,
    type: Boolean,
  },
  industry: {
    required: true,
    type: String,
  },
  iosUrl: {
    required: false,
    type: String,
  },
  language: {
    required: false,
    type: String,
  },
  linkedinUrl: {
    required: false,
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
    type: Schema.Types.ObjectId,
  },
  twitterUrl: {
    required: false,
    type: String,
  },
  type: {
    required: true,
    type: String,
  },
  website: {
    required: false,
    type: String,
  },
});

module.exports = OrganizationSchema;
