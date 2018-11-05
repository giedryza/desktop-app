import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { isAuthenticated } = this.props.auth;

        const authLinksRight = (
            <ul>
                <li>
                    <a href="/" onClick={this.onLogoutClick}>
                        Logout
                    </a>
                </li>
            </ul>
        );

        const guestLinksRight = (
            <ul>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        );

        const authLinksLeft = (
            <ul>
                <li>
                    <Link to="/">TvSeries</Link>
                </li>
                <li>
                    <Link to="/recipes">Recipes</Link>
                </li>
            </ul>
        );

        const guestLinksLeft = (
            <ul>
                <li>Desktop App</li>
            </ul>
        );

        return (
            <nav className="nav-foot">
                <div className="nav-left">
                    {isAuthenticated ? authLinksLeft : guestLinksLeft}
                </div>
                <div className="nav-right">
                    {isAuthenticated ? authLinksRight : guestLinksRight}
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Navbar);
