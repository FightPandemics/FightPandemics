// -- Imports
const { Schema, model, ObjectId } = require("mongoose");
const APPLICANT_STATUS = ["applied", "accepted", "rejected"];

// --Schema
const applicantSchema = new Schema(
  {
    organizationId: {
      ref: "OrganisationUser",
      required: true,
      // type: Schema.Types.ObjectId,
      type: ObjectId,
    },
    postApplied: {
      required: true,
      type: String
    },
    applicant: Object, //Author Schema
    // answers: {
    //   required: true,
    //   type: [String]
    // },
    answers: Object,
    status: {
      enum: APPLICANT_STATUS,
      required: true,
      type: String
    },
  },
  { collection: "applicants", timestamps: true },
);

/* eslint-disable sort-keys */
applicantSchema.index(
  // {
  //   createdAt: -1,
  // },
  // {
  //   expireAfterSeconds: 1296000, // 15 days
  // },
);
/* eslint-enable */

applicantSchema.index(
  {
    "applicant.name": "text",
    content: "text",
    title: "text",
    types: "text",
    "applicant.location.country": "text",
    "applicant.location.state": "text",
    "applicant.location.city": "text",
  },
  {
    language_override: "dummy",
    weights: {
      "applicant.name": 1,
      content: 3,
      title: 5,
      types: 2,
      "applicant.location.country": 1,
      "applicant.location.state": 1,
      "applicant.location.city": 1,
    },
  },
);

const Applicants = model("Applicants", applicantSchema);

module.exports = {
  APPLICANT_STATUS,
  model: Applicants,
  schema: applicantSchema,
};