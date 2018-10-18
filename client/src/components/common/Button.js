import React from 'react';

const Button = ({ className, type, value, disabled, onClick }) => {
    return (
        <input
            className={className}
            type={type}
            value={value}
            onClick={onClick}
            disabled={disabled}
        />
    );
};

Button.defaultProps = {
    className: 'button'
};

export default Button;
