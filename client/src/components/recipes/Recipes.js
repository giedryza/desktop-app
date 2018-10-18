import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Spinner from '../common/Spinner';
import RecipesForm from './RecipesForm';
import RecipesFeed from './RecipesFeed';
import { getRecipes, clearRecipes } from '../../actions/recipesActions';
import clearErrors from '../../utils/clearErrors';

class Recipes extends Component {
    componentDidMount() {
        this.props.getRecipes();
    }

    componentWillUnmount() {
        this.props.clearRecipes();
        this.props.clearErrors();
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
            <Fragment>
                <RecipesForm />
                <div className="feed">{recipesContent}</div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    account: state.account
});

export default connect(
    mapStateToProps,
    { getRecipes, clearRecipes, clearErrors }
)(Recipes);
