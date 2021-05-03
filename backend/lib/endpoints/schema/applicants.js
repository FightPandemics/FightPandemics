const S = require("fluent-schema");
const { APPLICANT_STATUS } = require("../../models/Applicant");
const { strictQueryStringSchema, strictSchema } = require("./utils");

// const applicant = {
//   organizationId: S.string(),
//   postApplied: S.string(),
//   applicant: 
// };

const getApplicantByIdSchema = {
  queryString: S.object().prop("applicantId", S.string().required()),
};

const getApplicantsSchema = {
  queryString: strictQueryStringSchema()
    .prop("applicantId", S.string())
    .prop(
      "organization",
      S.object()
        .prop("id", S.string().required())
    )
    .prop("skip", S.integer())
    .prop("includeMeta", S.boolean().default(false))
    .prop("permissions", S.string())
    .prop("userId", S.string()),
};

const getOrganizationApplicantsSchema = {
  queryString: strictQueryStringSchema()
    .prop("organisationId", S.string())
    .prop("status", S.string())
    .prop("skip", S.integer())
    .prop("includeMeta", S.boolean().default(false)),
};

const createApplicantSchema = {
  body: strictSchema()
    .prop(
      "organization",
      S.object()
        .prop("id", S.string().required())
    )
    .prop("applicantApplied", S.string())
    .prop(
      "answers",
      S.object()
        .prop("q1", S.string())
        .prop("q2", S.string())
        .prop("q3", S.string())
    )
    .prop("status", S.string().enum(APPLICANT_STATUS).required()),
};

const updateApplicantStatusSchema = {
  body: strictSchema()
    .prop("status", S.string().enum(APPLICANT_STATUS).required()),
  params: strictSchema()
    .prop("applicantId", S.string().required()),
};

module.exports = {
  createApplicantSchema,
  getApplicantByIdSchema,
  getApplicantsSchema,
  getOrganizationApplicantsSchema,
  updateApplicantStatusSchema,
};