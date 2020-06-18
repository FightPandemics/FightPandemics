const S = require("fluent-schema");
const { strictSchema } = require("./utils");

const { LOCATION_TYPES } = require("../../models/Location");

// address/coordinates will always be returned by geo service
const locationSchema = strictSchema()
  .prop("address", S.string().required())
  .prop("city", S.string())
  .prop(
    "coordinates",
    S.array().items(S.number()).minItems(2).maxItems(2).required()
  )
  .prop("country", S.string())
  .prop("neighborhood", S.string())
  .prop("state", S.string())
  .prop("type", S.string().enum(LOCATION_TYPES))
  .prop("zip", S.string());

module.exports = {
  locationSchema,
};
