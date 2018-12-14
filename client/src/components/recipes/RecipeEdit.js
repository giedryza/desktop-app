import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearErrors } from '../../utils/helperActions';
import { getRecipe, editRecipe } from '../../actions/recipesActions';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import NotFound from '../common/NotFound';

class EditRecipes extends Component {
    state = {
        title: '',
        body: ''
    };

    componentDidMount() {
        this.props.getRecipe(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.account !== this.props.account &&
            this.props.account.recipe
        ) {
            this.setState({
                title: this.props.account.recipe.title,
                body: this.props.account.recipe.body
            });
        }
    }

    componentWillUnmount() {
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

    editForm = () => (
        <form onSubmit={this.onSubmit} noValidate>
            <TextInput
                placeholder="Title"
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.onChange}
                error={this.props.errors.title}
            />
            <TextArea
                placeholder="Recipe"
                name="body"
                value={this.state.body}
                onChange={this.onChange}
                error={this.props.errors.body}
            />
            <Button type="submit" value="Save" />
            <Link to="/recipes">
                <Button type="button" value="Cancel" />
            </Link>
        </form>
    );

    renderEditForm = ({ recipe, loading }) => {
        if (loading) return <Spinner />;
        else if (!recipe) return <NotFound />;
        else return this.editForm();
    };

    render() {
        if (!this.props.auth.isAuthenticated) return <Redirect to="/" />;

        return this.renderEditForm(this.props.account);
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    account: state.account,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { editRecipe, getRecipe, clearErrors }
)(withRouter(EditRecipes));
