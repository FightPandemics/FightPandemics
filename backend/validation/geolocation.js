const Validator = require('validator');

module.exports = function validateGeolocation(data) {
    const errors = {};
    const { latitude, longitude } = data;

    if (Validator.isEmpty(latitude)) {
        errors.lat = 'Latitude is required';
    } else if (typeof latitude !== 'number') {
        errors.lat = 'Latitude must be a number';
    }

    if (Validator.isEmpty(longitude)) {
        errors.long = 'Longitude is required';
    } else if (typeof longitude !== 'number') {
        errors.lat = 'Longitude must be a number';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
