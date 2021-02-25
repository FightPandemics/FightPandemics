const S = require("fluent-schema");
const { strictSchema } = require("./utils");

const orgBookPagesSchema = strictSchema()
  .prop("name", S.string().maxLength(25).required())
  .prop("pageGroupNumber", S.number().minimum(1).maximum(5).required())
  .prop("status", S.string().required())
  .prop("created_by", S.string())
  .prop("created_at", S.string());

module.exports = {
  orgBookPagesSchema,
};
