const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if (!validator.isEmail(data.email)) {
        errors.email = 'Email must be valid';
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    if (!validator.isLength(data.password, { min: 5 })) {
        errors.password = 'Password must be minimum 5 characters';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords do not match';
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    };
};
