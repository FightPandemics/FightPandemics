const S = require("fluent-schema");
const { strictSchema } = require("./utils");

const createPostReportSchema = {
  body: strictSchema().prop("reason", S.string().required()),
};

const getPostReportsSchema = {
  queryString: strictSchema().prop("page", S.integer()),
};

module.exports = {
  createPostReportSchema,
  getPostReportsSchema,
};
