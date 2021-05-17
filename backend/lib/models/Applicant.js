// -- Imports
const { Schema, model, ObjectId } = require("mongoose");
const APPLICANT_STATUS = ["applied", "accepted", "rejected"];

// --Schema
const applicantSchema = new Schema(
  {
    organization: {
      id: {
        ref: "OrganisationUser",
        required: true,
        // type: Schema.Types.ObjectId,
        type: ObjectId,
      }
    },
    applicantApplied: {
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
applicantSchema.index({ "applicant.location.coordinates": "2dsphere" });
applicantSchema.index({ "organizationId": 1, createdAt: -1 });
applicantSchema.index({
  // Expiration Filter
  expireAt: -1,
  // Location filter
  "location.country": 1,
  "location.state": 1,
  "location.city": 1,
  "location.neighborhood": 1,
  // Author type filter
  "applicant.type": 1,
  // Post type filter
  types: 1,
  // Objective filter
  objective: 1,
  // Distance sorting
  "applicant.location.coordinates": "2dsphere",
  // Simple most recent sorting
  createdAt: -1,
});
applicantSchema.index({
  // Expiration Filter
  expireAt: -1,
  // Location filter
  "location.country": 1,
  "location.state": 1,
  "location.city": 1,
  // Author type filter
  "applicant.type": 1,
  // Post type filter
  types: 1,
  // Objective filter
  objective: 1,
  // Distance sorting
  "applicant.location.coordinates": "2dsphere",
  // Simple most recent sorting
  createdAt: -1,
});
applicantSchema.index({
  // Expiration Filter
  expireAt: -1,
  // Location filter
  "location.country": 1,
  "location.state": 1,
  // Author type filter
  "applicant.type": 1,
  // Post type filter
  types: 1,
  // Objective filter
  objective: 1,
  // Distance sorting
  "applicant.location.coordinates": "2dsphere",
  // Simple most recent sorting
  createdAt: -1,
});
applicantSchema.index({
  // Expiration Filter
  expireAt: -1,
  // Location filter
  "location.country": 1,
  // Author type filter
  "applicant.type": 1,
  // Post type filter
  types: 1,
  // Objective filter
  objective: 1,
  // Distance sorting
  "applicant.location.coordinates": "2dsphere",
  // Simple most recent sorting
  createdAt: -1,
});
applicantSchema.index({
  // Expiration Filter
  expireAt: -1,
  // No Location filter
  // Author type filter
  "applicant.type": 1,
  // Post type filter
  types: 1,
  // Objective filter
  objective: 1,
  // Distance sorting
  "applicant.location.coordinates": "2dsphere",
  // Simple most recent sorting
  createdAt: -1,
});

// Index for applicant's foreign key for lookup performance
applicantSchema.index({ "applicant.id": 1, createdAt: -1 });

// Index for like's foreign key for lookup performance
applicantSchema.index({ likes: 1 });
/* eslint-enable */

// index title and content for search
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
// report status index
applicantSchema.index({ status: 1 });

// reportedBy user id index
applicantSchema.index({ "reportedBy.id": 1 });

const Applicants = model("Applicants", applicantSchema);

module.exports = {
  APPLICANT_STATUS,
  model: Applicants,
  schema: applicantSchema,
};