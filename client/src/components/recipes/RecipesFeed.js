import React from 'react';
import RecipeItem from './RecipeItem';

const RecipesFeed = props => {
    const { recipes } = props;

    return recipes.map(recipe => (
        <RecipeItem key={recipe._id} recipe={recipe} />
    ));
};

export default RecipesFeed;
