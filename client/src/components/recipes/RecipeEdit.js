import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import Button from '../common/Button';
import {
    getRecipe,
    editRecipe,
    clearRecipe
} from '../../actions/recipesActions';

class EditRecipes extends Component {
    state = {
        title: '',
        body: ''
    };

    componentDidMount() {
        this.props.getRecipe(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.recipe !== this.state) {
            //Perform some operation
            this.setState({
                title: nextProps.recipe.title,
                body: nextProps.recipe.body
            });
        }
    }

    componentWillUnmount() {
        this.props.clearRecipe();
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const data = { title: this.state.title, body: this.state.body };
        const id = this.props.match.params.id;

        this.props.editRecipe(data, id, this.props.history);
    };

    render() {
        const { errors } = this.props;

        return (
            <div>
                <form onSubmit={this.onSubmit} noValidate>
                    <TextInput
                        placeholder="Title"
                        type="text"
                        name="title"
                        value={this.state.title}
                        onChange={this.onChange}
                        error={errors.title}
                    />
                    <TextArea
                        placeholder="Recipe"
                        name="body"
                        value={this.state.body}
                        onChange={this.onChange}
                        error={errors.body}
                    />

                    <Button type="submit" value="Save" />
                    <Link to="/recipes">
                        <Button type="button" value="Cancel" />
                    </Link>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    recipe: state.account.recipe,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { editRecipe, getRecipe, clearRecipe }
)(withRouter(EditRecipes));
