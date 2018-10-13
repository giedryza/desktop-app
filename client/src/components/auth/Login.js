import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../../actions/authActions';
import TextInput from '../common/TextInput';
import Button from '../common/Button';
import clearErrors from '../../utils/clearErrors';

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
        if (this.props.auth.isAuthenticated) {
            return <Redirect to="/" />;
        }

        const { errors } = this.props;

        return (
            <Fragment>
                <h1>Login</h1>
                <form onSubmit={this.onSubmit} noValidate>
                    <TextInput
                        placeholder="john@gmail.com"
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        error={errors.email}
                    />

                    <TextInput
                        placeholder="password"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        error={errors.password}
                    />

                    <Button type="submit" value="Login" />
                </form>
            </Fragment>
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
