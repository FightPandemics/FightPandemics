const express = require("express");
const { config } = require("../../config");
const { findByLatLong } = require("../components/Geo");
const { geoSchema } = require("./schema/geo");

const router = express.Router();

/**
 * @route POST api/geo/country
 * @desc Retrieve country based on geo coordinates
 * @access Public
 */
router.post("/country", async (req, res) => {
  const {
    error,
    value: { latitude, longitude },
  } = geoSchema.validate(req.body, config.joi.params);
  if (error) res.status(400).json(error);

  try {
    const data = await findByLatLong(latitude, longitude);
    return res.json(data);
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;
