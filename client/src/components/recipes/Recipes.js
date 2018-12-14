import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRecipes } from '../../actions/recipesActions';
import { clearErrors } from '../../utils/helperActions';

import Spinner from '../common/Spinner';
import RecipesForm from './RecipesForm';
import RecipesFeed from './RecipesFeed';

class Recipes extends Component {
    componentDidMount() {
        this.props.getRecipes();
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    renderRecipes = ({ recipes, loading }) => {
        if (loading) return <Spinner />;
        else if (recipes.length === 0) return <h5>No Recipes</h5>;
        else return <RecipesFeed recipes={recipes} />;
    };

    render() {
        if (!this.props.auth.isAuthenticated) return <Redirect to="/" />;

        return (
            <Fragment>
                <RecipesForm disabled={this.props.account.loading} />
                <div className="feed">
                    {this.renderRecipes(this.props.account)}
                </div>
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
    { getRecipes, clearErrors }
)(Recipes);
