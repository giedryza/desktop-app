import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteUser } from '../../actions/authActions';

class Navbar extends Component {
    onDeleteClick = e => {
        e.preventDefault();
        this.props.deleteUser();
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const footer = (
            <footer className="nav-foot">
                <div className="nav-left">
                    <ul>
                        <li>{user.email}</li>
                    </ul>
                </div>
                <div className="nav-right">
                    <ul>
                        <li>
                            <a href="/" onClick={this.onDeleteClick}>
                                Delete Account
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
        );

        return isAuthenticated ? footer : null;
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { deleteUser }
)(Navbar);
