const S = require("fluent-schema");
const {
  config: { query: queryConfig },
} = require("../../../config");

function errorSchema() {
  return S.object()
    .prop("statusCode", S.integer())
    .prop("error", S.string())
    .prop("message", S.string());
}

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
  errorSchema,
  strictQueryStringSchema,
  strictSchema,
};
