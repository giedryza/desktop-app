const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Input Validation
const validateTvseriesInput = require('../../validation/tvseries');

// Load User Model
const Tvserie = require('../../models/Tvserie');

// @route   POST api/tvseries
// @desc    Add Tvserie
// @access  Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateTvseriesInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newTvserie = new Tvserie({
            user: req.user.id,
            imdbId: req.body.imdbId
        });

        newTvserie
            .save()
            .then(tvserie => res.json(tvserie))
            .catch(err => res.status(400).json(err));
    }
);

// @route   GET api/tvseries
// @desc    Get all Tvseries
// @access  Private
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Tvserie.find({ user: req.user.id })
            .sort({ date: -1 })
            .then(tvseries => res.json(tvseries))
            .catch(err => res.status(404).json(err));
    }
);

// @route   GET api/tvseries/:id
// @desc    Get Tvserie by id
// @access  Private
router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Tvserie.findOne({ _id: req.params.id })
            .then(tvseries => res.json(tvseries))
            .catch(err => res.status(404).json(err));
    }
);

// @route   DELETE api/tvseries/:id
// @desc    Delete Tvserie
// @access  Private
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Tvserie.findOne({ _id: req.params.id })
            .then(tvserie => {
                if (tvserie.user != req.user.id) {
                    res.status(500).json({ message: 'not authorized!' });
                } else {
                    Tvserie.findOneAndDelete({ _id: req.params.id })
                        .then(result =>
                            res.json({ message: 'Delete successful' })
                        )
                        .catch(err => res.status(400).json(err));
                }
            })
            .catch(err => res.status(400).json(err));
    }
);

module.exports = router;
