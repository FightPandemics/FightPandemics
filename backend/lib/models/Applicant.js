// -- Imports
const { Schema, model, ObjectId } = require("mongoose");
const APPLICANT_STATUS = ["applied", "accepted", "rejected"];

// --Schema
const applicantSchema = new Schema(
  {
    organizationId: {
      ref: "OrganisationUser",
      required: true,
      type: Schema.Types.ObjectId,
    },
    postApplied: {
      required: true,
      type: String
    },
    applicant: Object, //Author Schema
    answers: {
      required: true,
      type: [String]
    },
    status: {
      enum: APPLICANT_STATUS,
      required: true,
      type: [String]
    },
  },
  { collection: "applicants", timestamps: true },
);

/* eslint-disable sort-keys */
applicantSchema.index(
  {
    createdAt: -1,
  },
  // {
  //   expireAfterSeconds: 1296000, // 15 days
  // },
);
/* eslint-enable */

const Applicants = model("Applicants", applicantSchema);

module.exports = {
  APPLICANT_STATUS,
  model: Applicants,
  schema: applicantSchema,
};