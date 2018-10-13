import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextInput from '../common/TextInput';
import Button from '../common/Button';
import clearErrors from '../../utils/clearErrors';

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
        if (this.props.auth.isAuthenticated) {
            return <Redirect to="/" />;
        }

        const { errors } = this.props;

        return (
            <Fragment>
                <h1>Register</h1>
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

                    <TextInput
                        placeholder="confirm password"
                        type="password"
                        name="password2"
                        value={this.state.password2}
                        onChange={this.onChange}
                        error={errors.password2}
                    />

                    <Button type="submit" value="Register" />
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
    { registerUser, clearErrors }
)(Register);
