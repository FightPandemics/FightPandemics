const { findByLatLong } = require("../components/Geo");
const { getCountrySchema } = require("./schema/geo");

/*
 * /api/geo
 */
async function routes(app) {
  app.get(
    "/country",
    { preValidation: [app.authenticate], schema: getCountrySchema },
    async (req) => {
      const { latitude, longitude } = req.query;
      return findByLatLong(latitude, longitude);
    },
  );
}

module.exports = routes;
