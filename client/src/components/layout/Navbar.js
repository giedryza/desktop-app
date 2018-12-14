import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ links, isAuthenticated, onLogoutClick }) => {
    const renderLinks = position => {
        let showLinks = [];
        links.forEach(item => {
            if (item.position === position && item.auth === isAuthenticated)
                showLinks.push(item);
        });

        return showLinks.map(link => (
            <li key={link.label}>
                <Link
                    to={link.linkto}
                    onClick={link.label === 'Logout' ? onLogoutClick : null}
                >
                    {link.label}
                </Link>
            </li>
        ));
    };

    return (
        <nav className="nav-foot">
            <div className="nav-left">
                <ul>{renderLinks('left')}</ul>
            </div>
            <div className="nav-right">
                <ul>{renderLinks('right')}</ul>
            </div>
        </nav>
    );
};

export default Navbar;
