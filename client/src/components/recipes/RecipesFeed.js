import React from 'react';
import RecipeItem from './RecipeItem';

const RecipesFeed = ({ recipes }) => {
    return recipes.map(recipe => (
        <RecipeItem key={recipe._id} recipe={recipe} />
    ));
};

export default RecipesFeed;
