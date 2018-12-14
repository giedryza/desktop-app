import React from 'react';

const Footer = ({ user, isAuthenticated, onDeleteClick }) => {
    const footer = (
        <footer className="nav-foot">
            <div className="foot-left">{user.email}</div>
            <div className="foot-right " onClick={onDeleteClick}>
                Delete Account
            </div>
        </footer>
    );

    return isAuthenticated ? footer : null;
};

export default Footer;
