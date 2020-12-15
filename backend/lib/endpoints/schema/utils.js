const S = require("fluent-schema");
const {
  config: { query: queryConfig },
} = require("../../../config");

function strictSchema() {
  return S.object().additionalProperties(false);
}

function strictQueryStringSchema() {
  return strictSchema().prop(
    "limit",
    S.integer().minimum(0).maximum(queryConfig.maxLimit),
  );
}

module.exports = {
  strictQueryStringSchema,
  strictSchema,
};
