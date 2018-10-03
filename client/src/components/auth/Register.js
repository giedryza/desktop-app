import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextInput from '../common/TextInput';

class Register extends Component {
    state = {
        email: '',
        password: '',
        password2: '',
        errors: {}
    };

    componentDidUpdate(prevProps) {
        if (prevProps.errors !== this.props.errors) {
            this.setState({ errors: this.props.errors });
        }
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

        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        if (this.props.auth.isAuthenticated) {
            return <Redirect to="/" />;
        }

        const { errors } = this.state;

        return (
            <div>
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

                    <input className="button" type="submit" value="Register" />
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
    { registerUser }
)(withRouter(Register));
