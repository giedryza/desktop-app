const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTvseriesInput(data) {
    let errors = {};

    data.imdbId = !isEmpty(data.imdbId) ? data.imdbId : '';

    if (!validator.isLength(data.imdbId, { min: 9, max: 9 })) {
        errors.imdbId = 'IMDb ID must be 9 characters';
    }

    if (validator.isEmpty(data.imdbId)) {
        errors.imdbId = 'IMDb ID is required';
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    };
};
