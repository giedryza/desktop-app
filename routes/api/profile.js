const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        let errors = {};

        Profile.findOne({ user: req.user.id })
            .then(profile => {
                if (!profile) {
                    errors.profile = 'No profile found';
                    return res.status(404).json(errors);
                }
                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
    }
);

// @route   POST api/profile
// @desc    Create Profile
// @access  Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            // Save Profile
            new Profile(profile)
                .save()
                .then(profile => res.json(profile))
                .catch(err => res.status(404).json(err));
        });
    }
);

module.exports = router;
