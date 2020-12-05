const {
  getAddressPredictions,
  getLocationDetailsByPlaceId,
  getLocationByLatLng,
} = require("../components/Geo");
const {
  getAddressPredictionsSchema,
  getLocationDetailsSchema,
  getLocationReverseGeocodeSchema,
} = require("./schema/geo");

emergency_numbers = require("../json_utils/emergency_info.json");

/*
 * /api/geo
 */
async function routes(app) {
  app.get(
    "/address-predictions",
    { schema: getAddressPredictionsSchema },
    async (req) => {
      const { input, sessiontoken } = req.query;
      const [err, data] = await app.to(
        getAddressPredictions(input, sessiontoken),
      );
      if (err) {
        app.log.error(err, "Failed retrieving address prediction results");
        throw app.httpErrors.internalServerError();
      }
      return data;
    },
  );

  app.get(
    "/location-details",
    { schema: getLocationDetailsSchema },
    async (req) => {
      const { placeId, sessiontoken } = req.query;
      const [err, data] = await app.to(
        getLocationDetailsByPlaceId(placeId, sessiontoken),
      );
      if (err) {
        app.log.error(err, "Failed retrieving location place details");
        throw app.httpErrors.internalServerError();
      }
      return data;
    },
  );

  app.get(
    "/location-reverse-geocode",
    { schema: getLocationReverseGeocodeSchema },
    async (req) => {
      const { lat, lng } = req.query;
      const [err, data] = await app.to(getLocationByLatLng(lat, lng));
      if (err) {
        app.log.error(err, "Failed retrieving location by reverse geocode");
        throw app.httpErrors.internalServerError();
      }
      return data;
    },
  );

  app.get(
    "/local-emergency-numbers",
    { schema: getLocationReverseGeocodeSchema },
    async (req) => {
      const { lat, lng } = req.query;
      const [err, data] = await app.to(getLocationByLatLng(lat, lng));
      const country = data["location"]["country"];
      if (err) {
        app.log.error(err, "Failed retrieving location by reverse geocode");
        throw app.httpErrors.internalServerError();
      }
      return emergency_numbers[country];
    },
  );
}

module.exports = routes;
