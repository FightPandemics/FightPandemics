const { findByLatLong } = require("../components/Geo");

/*
 * /api/geo
 */
async function routes(app) {
  app.get("/country", { preValidation: [app.authenticate] }, async (req) => {
    const { latitude, longitude } = req.query;
    return findByLatLong(latitude, longitude);
  });
}

module.exports = routes;
