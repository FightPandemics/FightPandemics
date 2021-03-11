const S = require("fluent-schema");
const { strictSchema } = require("./utils");

const orgBookPagesSchema = strictSchema()
  .prop("pageId", S.string().required())
  .prop("name", S.string().maxLength(25).required())
  .prop("pageGroupNumber", S.number().minimum(1).maximum(5).required())
  .prop("status", S.string().required())
  .prop("locked", S.boolean().default(false))
  .prop("content", S.string().required())
  .prop("created_by", S.string().required())
  .prop("created_at", S.string().required())
  .prop("updated_by", S.string())
  .prop("updated_at", S.string());

module.exports = {
  orgBookPagesSchema,
};
