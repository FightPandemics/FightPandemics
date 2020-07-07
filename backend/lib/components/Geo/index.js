const {
  config: { env, geo },
} = require("../../../config");

const Geo =
  env === "dev" && !geo.googleMapsApiKey
    ? require("./mock")
    : require("./gmaps");

module.exports = Geo;
