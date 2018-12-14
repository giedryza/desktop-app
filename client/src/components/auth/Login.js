import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../../actions/authActions';
import { clearErrors } from '../../utils/helperActions';
import TextInput from '../common/TextInput';
import Button from '../common/Button';

class Login extends Component {
    state = {
        email: '',
        password: ''
    };

    componentWillUnmount() {
        this.props.clearErrors();
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(userData);
    };

    render() {
        if (this.props.auth.isAuthenticated) return <Redirect to="/tvseries" />;

        return (
            <form onSubmit={this.onSubmit} noValidate>
                <h1>Login</h1>
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

                <Button type="submit" value="Login" />
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
    { loginUser, clearErrors }
)(Login);
