const express = require("express");
const geocoder = require('local-reverse-geocoder');

geocoder.init({}, function() {
    console.log('geocoder is loaded and ready to run');
});

const router = express.Router();

module.exports = router;
