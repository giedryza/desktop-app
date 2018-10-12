import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Spinner from '../common/Spinner';
import RecipesForm from './RecipesForm';
import RecipesFeed from './RecipesFeed';
import { getRecipes, clearRecipes } from '../../actions/recipesActions';

class Recipes extends Component {
    componentDidMount() {
        this.props.getRecipes();
    }

    componentWillUnmount() {
        this.props.clearRecipes();
    }

    render() {
        if (!this.props.auth.isAuthenticated) {
            return <Redirect to="/login" />;
        }

        const { recipes, loading } = this.props.account;

        let recipesContent;
        if (loading) {
            recipesContent = <Spinner />;
        } else if (recipes.length === 0) {
            recipesContent = <h5>No Recipes</h5>;
        } else {
            recipesContent = <RecipesFeed recipes={recipes} />;
        }

        return (
            <div>
                <RecipesForm />
                <div className="feed">{recipesContent}</div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    account: state.account
});

export default connect(
    mapStateToProps,
    { getRecipes, clearRecipes }
)(Recipes);
