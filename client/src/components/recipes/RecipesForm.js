import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import Button from '../common/Button';
import { addRecipe } from '../../actions/recipesActions';

class AddRecipes extends Component {
    state = {
        title: '',
        body: ''
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const data = { title: this.state.title, body: this.state.body };

        this.props.addRecipe(data);
        this.setState({ title: '', body: '' });
    };

    render() {
        const { errors } = this.props;

        return (
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

                <Button type="submit" value="Add" />
            </form>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addRecipe }
)(AddRecipes);
