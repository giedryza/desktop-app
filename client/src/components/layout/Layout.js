import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser, deleteUser } from '../../actions/authActions';
import Navbar from './Navbar';
import Footer from './Footer';

class Layout extends Component {
    state = {
        links: [
            {
                label: 'TvSeries',
                linkto: '/tvseries',
                position: 'left',
                auth: true
            },
            {
                label: 'Recipes',
                linkto: '/recipes',
                position: 'left',
                auth: true
            },
            {
                label: 'Desktop App',
                linkto: '/',
                position: 'left',
                auth: false
            },
            {
                label: 'Logout',
                linkto: '/',
                position: 'right',
                auth: true
            },
            {
                label: 'Register',
                linkto: '/register',
                position: 'right',
                auth: false
            },
            {
                label: 'Login',
                linkto: '/',
                position: 'right',
                auth: false
            }
        ]
    };

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    onDeleteClick = e => {
        e.preventDefault();
        this.props.deleteUser();
    };

    render() {
        const { auth, children } = this.props;

        return (
            <div className="container">
                <Navbar
                    links={this.state.links}
                    isAuthenticated={auth.isAuthenticated}
                    onLogoutClick={this.onLogoutClick}
                />
                <div className="container-content">{children}</div>
                <Footer
                    user={auth.user}
                    isAuthenticated={auth.isAuthenticated}
                    onDeleteClick={this.onDeleteClick}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default withRouter(
    connect(
        mapStateToProps,
        { logoutUser, deleteUser }
    )(Layout)
);
