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
    .prop("skip", S.integer())
    .prop("includeMeta", S.boolean().default(false)),
};

const createApplicantSchema = {
  body: strictSchema()
    .prop("postApplied", S.string())
    .prop(
      "answers", S.array().items(S.string().required())
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
  updateApplicantStatusSchema
};