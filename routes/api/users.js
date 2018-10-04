const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateTvseriesInput = require('../../validation/tvseries');

// Load User Model
const User = require('../../models/User');

// @route   POST api/users/register
// @desc    Register User
// @access  Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    User.findOne({ email: req.body.email }).then(user => {
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
    });
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

    User.findOne({ email }).then(user => {
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
    });
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

// @route   POST api/users/tvseries
// @desc    Add TvSeries
// @access  Private
router.post(
    '/tvseries',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateTvseriesInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }

        User.findOne({ email: req.user.email })
            .then(user => {
                user.tvseries.unshift(req.body);
                user.save().then(user => res.json(user.tvseries[0]));
            })
            .catch(err => res.status(404).json(err));
    }
);

// @route   GET api/users/tvseries
// @desc    Get all TvSeries
// @access  Private
router.get(
    '/tvseries',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const errors = {};

        User.findOne({ email: req.user.email })
            .then(user => {
                if (user.tvseries.length < 1) {
                    errors.notvseries = 'User has no TvSeries';
                    return res.status(404).json(errors);
                }
                res.json(user.tvseries);
            })
            .catch(err => res.status(404).json({ user: 'error' }));
    }
);

// @route   DELETE api/users/tvseries/:tv_id
// @desc    Delete TvSeries
// @access  Private
router.delete(
    '/tvseries/:tv_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        User.findOne({ email: req.user.email })
            .then(user => {
                user.tvseries.remove({ _id: req.params.tv_id });
                user.save().then(user => res.json(user));
            })
            .catch(err => res.status(404).json(err));
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
