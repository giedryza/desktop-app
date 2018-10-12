import React, { Component } from 'react';
import RecipeItem from './RecipeItem';

class RecipeFeed extends Component {
    render() {
        const { recipes } = this.props;

        return recipes.map(recipe => (
            <RecipeItem key={recipe._id} recipe={recipe} />
        ));
    }
}

export default RecipeFeed;
