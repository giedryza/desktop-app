const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRecipesInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.body = !isEmpty(data.body) ? data.body : '';

    if (validator.isEmpty(data.title)) {
        errors.title = 'Title is required';
    }

    if (validator.isEmpty(data.body)) {
        errors.body = 'Recipe is required';
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    };
};
