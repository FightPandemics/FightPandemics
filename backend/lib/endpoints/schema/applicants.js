const S = require("fluent-schema");
const { APPLICANT_STATUS, ORG_MEMBERS_TYPES } = require("../../models/Applicant");
const { strictQueryStringSchema, strictSchema } = require("./utils");

const getApplicantByIdSchema = {
  params: S.object().prop("applicantId", S.string().required()),
};

const getApplicantsSchema = {
  queryString: strictQueryStringSchema()
    .prop("applicantId", S.string())
    .prop("organizationId", S.string())
    .prop("skip", S.integer())
    .prop("includeMeta", S.boolean().default(false))
    .prop("permissions", S.string())
    .prop("status", S.string())
    .prop("userId", S.string()),
};

const getOrganizationApplicantsSchema = {
  params: strictSchema()
    .prop("organizationId", S.string().required()),
  queryString: strictQueryStringSchema()
    .prop("status", S.string())
    .prop("permissions", S.string())
    .prop("userId", S.string())
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
    .prop("status", S.string().enum(APPLICANT_STATUS)),
  params: strictSchema()
    .prop("applicantId", S.string().required()),
  queryString: strictQueryStringSchema()
    .prop("permissions", S.string().enum(ORG_MEMBERS_TYPES)),
};

module.exports = {
  createApplicantSchema,
  getApplicantByIdSchema,
  getApplicantsSchema,
  getOrganizationApplicantsSchema,
  updateApplicantStatusSchema,
};