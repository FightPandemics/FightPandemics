const isEmpty = require('./is-empty');

module.exports = {
    validateGeolocation(data) {
        const errors = {};
        const { latitude, longitude } = data;

        if (!latitude) {
            errors.lat = 'Latitude is required';
        } else if (typeof latitude !== 'number') {
            errors.lat = 'Latitude must be a number';
        }

        if (!longitude) {
            errors.long = 'Longitude is required';
        } else if (typeof longitude !== 'number') {
            errors.lat = 'Longitude must be a number';
        }

        return {
            errors,
            isValid: isEmpty(errors),
        };
    },
};
