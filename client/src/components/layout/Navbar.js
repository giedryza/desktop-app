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

        const authLinks = (
            <ul>
                <li>
                    <a href="/" onClick={this.onLogoutClick}>
                        Logout
                    </a>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        );

        return (
            <nav className="nav-foot">
                <div className="nav-left">
                    <ul>
                        <li>
                            {isAuthenticated ? (
                                <Link to="/">TvSeries</Link>
                            ) : (
                                'Desktop App'
                            )}
                        </li>
                    </ul>
                </div>
                <div className="spacer" />
                <div className="nav-right">
                    {isAuthenticated ? authLinks : guestLinks}
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
