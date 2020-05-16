const S = require("fluent-schema");

function strictSchema() {
  return S.object().additionalProperties(false);
}

module.exports = {
  strictSchema,
};
