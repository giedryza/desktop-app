import React from 'react';
import RecipeItem from './RecipeItem';

const RecipesFeed = ({ recipes }) =>
    recipes.map(recipe => <RecipeItem key={recipe._id} recipe={recipe} />);

export default RecipesFeed;
