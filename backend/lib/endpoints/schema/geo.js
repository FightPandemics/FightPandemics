const S = require("fluent-schema");

const getCountrySchema = {
  querystring: S.object()
    .prop("latitude", S.number().minimum(0).maximum(90).required())
    .prop("longitude", S.number().minimum(-180).maximum(180).required()),
};

module.exports = {
  getCountrySchema,
};
