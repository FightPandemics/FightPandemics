const S = require("fluent-schema");
const { strictSchema } = require("./utils");
const { POST_STATUS } = require("../../models/Post");
const createPostReportSchema = {
  body: strictSchema().prop("reason", S.string().required()),
};

const getPostReportsSchema = {
  queryString: strictSchema()
    .prop("limit", S.integer().minimum(1).maximum(20).default(10))
    .prop("status", S.string().enum(POST_STATUS).required())
    .prop("skip", S.number())
    .prop("includeMeta", S.boolean().default(false)),
};

module.exports = {
  createPostReportSchema,
  getPostReportsSchema,
};
