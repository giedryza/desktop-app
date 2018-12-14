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

    showRecipe = body =>
        this.state.showRecipe ? (
            <div className="recipe__body">{body}</div>
        ) : null;

    onDeleteClick = id => () => {
        this.props.deleteRecipe(id);
    };

    render() {
        const { title, body, _id } = this.props.recipe;

        return (
            <Fragment>
                <div className="recipe__title">
                    <div
                        className="button recipe__button"
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
                {this.showRecipe(body)}
            </Fragment>
        );
    }
}

export default connect(
    null,
    { deleteRecipe }
)(RecipeItem);
