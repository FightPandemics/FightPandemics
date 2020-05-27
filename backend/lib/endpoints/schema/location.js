const S = require("fluent-schema");
const { strictSchema } = require("./utils");

const { LOCATION_TYPES } = require("../../models/Location");

const addressSchema = strictSchema()
  .prop("address", S.string())
  .prop("city", S.string())
  .prop("country", S.string())
  .prop("neighborhood", S.string())
  .prop("state", S.string())
  .prop("type", S.string().enum(LOCATION_TYPES))
  .prop("zip", S.string());

const coordinatesSchema = strictSchema().prop(
  "coordinates",
  S.array().items(S.number()).minItems(2).maxItems(2),
);

const locationSchema = S.oneOf([addressSchema, coordinatesSchema]);

module.exports = {
  locationSchema,
};
