const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User Model
const User = require('../../models/User');

// @route   POST api/users/register
// @desc    Register User
// @access  Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                errors.email = 'Email exists';
                return res.status(400).json(errors);
            } else {
                if (!isValid) {
                    return res.status(400).json(errors);
                }
                const newUser = new User({
                    email: req.body.email,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => res.status(404).json(err));
                    });
                });
            }
        })
        .catch(err => res.status(400).json(err));
});

// @route   GET api/users/login
// @desc    Login User / Return JWT Token
// @access  Public
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            // Check for user
            if (!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }

            // Check Password
            bcrypt
                .compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // User Matched
                        const payload = {
                            id: user.id,
                            email: user.email
                        };

                        // Sign Token
                        jwt.sign(
                            payload,
                            keys.secret,
                            { expiresIn: '7d' },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            }
                        );
                    } else {
                        errors.password = 'Password incorrect';
                        return res.status(400).json(errors);
                    }
                })
                .catch(err => res.status(404).json(err));
        })
        .catch(err => res.status(400).json(err));
});

// @route   GET api/users/me
// @desc    Return current user
// @access  Private
router.get(
    '/me',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json(req.user);
    }
);

// @route   DELETE api/users
// @desc    Delete User
// @access  Private
router.delete(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        User.findOneAndRemove({ _id: req.user.id })
            .then(() => res.json({ success: true }))
            .catch(err => res.status(404).json(err));
    }
);

module.exports = router;
