const S = require("fluent-schema");
const { strictSchema } = require("./utils");
const { POST_STATUS } = require("../../models/Post");
const { MODERATOR_ACTIONS } = require("../../models/Audit");

const createPostReportSchema = {
  body: strictSchema().prop("reason", S.string().required().maxLength(500)),
  params: strictSchema().prop("postId", S.string().required()),
};

const getPostReportsSchema = {
  querystring: strictSchema()
    .prop("limit", S.integer().minimum(1).maximum(20).default(10))
    .prop("status", S.string().enum(POST_STATUS).required())
    .prop("skip", S.number())
    .prop("includeMeta", S.boolean().default(false)),
};

const moderatorActionSchema = {
  body: strictSchema()
    .prop("justification", S.string().required())
    .prop("action", S.string().enum(MODERATOR_ACTIONS).required()),
  params: strictSchema().prop("postId", S.string().required()),
};

const getAuditLogSchema = {
  body: strictSchema()
    .prop("limit", S.integer().minimum(1).maximum(20).default(10))
    .prop("skip", S.number()),
};

module.exports = {
  createPostReportSchema,
  getAuditLogSchema,
  getPostReportsSchema,
  moderatorActionSchema,
};
