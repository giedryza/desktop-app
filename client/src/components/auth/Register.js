import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { clearErrors } from '../../utils/helperActions';
import TextInput from '../common/TextInput';
import Button from '../common/Button';

class Register extends Component {
    state = {
        email: '',
        password: '',
        password2: ''
    };

    componentWillUnmount() {
        this.props.clearErrors();
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerUser(newUser);
    };

    render() {
        if (this.props.auth.isAuthenticated) return <Redirect to="/" />;

        return (
            <form onSubmit={this.onSubmit} noValidate>
                <h1>Register</h1>
                <TextInput
                    placeholder="john@gmail.com"
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={this.props.errors.email}
                />

                <TextInput
                    placeholder="password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={this.props.errors.password}
                />

                <TextInput
                    placeholder="confirm password"
                    type="password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={this.props.errors.password2}
                />

                <Button type="submit" value="Register" />
            </form>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser, clearErrors }
)(Register);
