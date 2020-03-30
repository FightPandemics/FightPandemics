const express = require('express');

const { validateGeolocation } = require('../validation/geolocation');

const router = express.Router();

/**
 * @route POST api/geo/country
 * @desc Retrieve country based on geo coordinates
 * @access Public
 */
router.post("/country", (req, res) => {
    const { errors, isValid } = validateGeolocation(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // tddo : connect to geo client
   res.json({
       country: 'BE',
   });
});

module.exports = router;
