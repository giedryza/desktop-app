import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import Spinner from '../common/Spinner';
import NotFound from '../common/NotFound';
import Button from '../common/Button';
import clearErrors from '../../utils/clearErrors';
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
        if (
            nextProps.account.recipe &&
            nextProps.account.recipe !== this.state
        ) {
            this.setState({
                title: nextProps.account.recipe.title,
                body: nextProps.account.recipe.body
            });
        }
    }

    componentWillUnmount() {
        this.props.clearRecipe();
        this.props.clearErrors();
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const data = { title: this.state.title, body: this.state.body };
        const id = this.props.match.params.id;
        const history = this.props.history;

        this.props.editRecipe(data, id, history);
    };

    render() {
        if (!this.props.auth.isAuthenticated) {
            return <Redirect to="/login" />;
        }

        const { errors } = this.props;
        const { loading, recipe } = this.props.account;

        let editContent;
        if (loading) {
            editContent = <Spinner />;
        } else if (!recipe || errors.message) {
            editContent = <NotFound />;
        } else {
            editContent = (
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
            );
        }

        return <Fragment>{editContent}</Fragment>;
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    account: state.account,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { editRecipe, getRecipe, clearRecipe, clearErrors }
)(withRouter(EditRecipes));
