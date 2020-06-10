const S = require("fluent-schema");
const { strictSchema } = require("./utils");

const getAddressPredictionsSchema = {
  querystring: strictSchema()
    .prop("input", S.string().minLength(3).required())
    .prop("sessiontoken", S.string().format("uuid").required()),
};

const getLocationDetailsSchema = {
  querystring: strictSchema()
    .prop("placeId", S.string().required()) // e.g. ChIJgUbEo8cfqokR5lP9_Wh_DaM
    // Allow place without session token, but when autocomplete is used
    // it should be there (reliant on client)
    .prop("sessiontoken", S.string().format("uuid")),
};

const getLocationReverseGeocodeSchema = {
  querystring: strictSchema()
    .prop("lat", S.number().minimum(0).maximum(90).required())
    .prop("lng", S.number().minimum(-180).maximum(180).required()),
};

module.exports = {
  getAddressPredictionsSchema,
  getLocationDetailsSchema,
  getLocationReverseGeocodeSchema,
};
