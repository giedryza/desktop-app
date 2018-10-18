import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteRecipe } from '../../actions/recipesActions';

class RecipeItem extends Component {
    state = {
        showRecipe: false
    };

    toggleShowRecipe = () => {
        this.setState(prevState => {
            return { showRecipe: !prevState.showRecipe };
        });
    };

    onDeleteClick = id => () => {
        this.props.deleteRecipe(id);
    };

    render() {
        const { title, body, _id } = this.props.recipe;

        const recipeBody = this.state.showRecipe ? (
            <div className="recipe-body">{body}</div>
        ) : null;

        return (
            <Fragment>
                <div className="recipe-title">
                    <div
                        className="button recipe-button"
                        onClick={this.toggleShowRecipe}
                    >
                        <h4>{title}</h4>
                    </div>
                    <Link to={`/recipes/${_id}`} className="button">
                        <i className="far fa-edit " />
                    </Link>
                    <i
                        className="far fa-trash-alt button"
                        onClick={this.onDeleteClick(_id)}
                    />
                </div>
                {recipeBody}
            </Fragment>
        );
    }
}

export default connect(
    null,
    { deleteRecipe }
)(RecipeItem);
