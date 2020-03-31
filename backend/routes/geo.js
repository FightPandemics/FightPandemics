const axios = require("axios");
const express = require("express");

const countries = require("../data/countries");
const { validateGeolocation } = require("../validation/geolocation");

const router = express.Router();
const GEO_SERVICE_URL = "http://127.0.0.1:5000/geo-service";
const countryMap = countries.reduce(
  (map, { name, code }) => map.set(code, name),
  new Map()
);

/**
 * @route POST api/geo/country
 * @desc Retrieve country based on geo coordinates
 * @access Public
 */
router.post("/country", (req, res) => {
  const {
    body: { latitude, longitude },
  } = req;
  const { errors, isValid } = validateGeolocation({ latitude, longitude });

  if (!isValid) {
    return res.status(400).json(errors);
  }

  axios
    .get(`${GEO_SERVICE_URL}?lat=${latitude}&long=${longitude}`)
    .then(({ data: response }) => {
      const { cc: code } = response.data;
      const name = countryMap.get(code);

      res.json({ code, name });
    });
});

module.exports = router;
