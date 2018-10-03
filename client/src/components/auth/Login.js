import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { loginUser } from '../../actions/authActions';
import TextInput from '../common/TextInput';

class Login extends Component {
    state = {
        email: '',
        password: ''
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(userData, this.props.history);
    };

    render() {
        if (this.props.auth.isAuthenticated) {
            return <Redirect to="/" />;
        }

        const { errors } = this.props;

        return (
            <div>
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

                    <input className="button" type="submit" value="Login" />
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(withRouter(Login));
