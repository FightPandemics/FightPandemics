const S = require("fluent-schema");
const { strictSchema } = require("./utils");

const postReportSchema = strictSchema().prop("reason", S.string());

const errorSchema = S.object()
  .prop("statusCode", S.integer())
  .prop("error", S.string())
  .prop("message", S.string());

const createPostReportSchema = {
  body: postReportSchema.required(["reason"]),
  description: "For flagging and reporting a post by its post id.",
  response: {
    201: S.object().prop("success", S.boolean()),
    401: errorSchema,
    500: errorSchema,
  },
};

const getPostReportsSchema = {
  queryString: strictSchema().prop("page", S.integer()),
};

module.exports = {
  createPostReportSchema,
  getPostReportsSchema,
};
