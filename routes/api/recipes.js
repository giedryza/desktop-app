const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Input Validation
const validateRecipesInput = require('../../validation/recipes');

// Load Recipe Model
const Recipe = require('../../models/Recipe');

// @route   POST api/recipes
// @desc    Add Recipe
// @access  Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateRecipesInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newRecipe = new Recipe({
            user: req.user.id,
            title: req.body.title,
            body: req.body.body
        });

        newRecipe
            .save()
            .then(recipe => res.json(recipe))
            .catch(err => res.status(400).json(err));
    }
);

// @route   GET api/recipes
// @desc    Get all Recipes
// @access  Private
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Recipe.find({ user: req.user.id })
            .sort({ title: 1 })
            .then(recipes => res.json(recipes))
            .catch(err => res.status(404).json(err));
    }
);

// @route   GET api/recipes/:id
// @desc    Get Recipe by id
// @access  Private
router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Recipe.findOne({ _id: req.params.id })
            .then(recipe => res.json(recipe))
            .catch(err => res.status(404).json(err));
    }
);

// @route   PATCH api/recipes/:id
// @desc    Update Recipe
// @access  Private
router.patch(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateRecipesInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }

        Recipe.findOne({ _id: req.params.id })
            .then(recipe => {
                if (recipe.user != req.user.id) {
                    res.status(500).json({ message: 'not authorized!' });
                } else {
                    const updatedRecipe = {
                        title: req.body.title,
                        body: req.body.body
                    };

                    Recipe.findOneAndUpdate(
                        { _id: req.params.id },
                        { $set: updatedRecipe },
                        { new: true }
                    )
                        .then(recipe => res.json(recipe))
                        .catch(err => {
                            res.status(400).json(err);
                        });
                }
            })
            .catch(err => res.status(400).json(err));
    }
);

// @route   DELETE api/recipes/:id
// @desc    Delete Recipe
// @access  Private
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Recipe.findOne({ _id: req.params.id })
            .then(recipe => {
                if (recipe.user != req.user.id) {
                    res.status(500).json({ message: 'not authorized!' });
                } else {
                    Recipe.findOneAndDelete({ _id: req.params.id })
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
