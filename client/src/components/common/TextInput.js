import React from 'react';
import classnames from 'classnames';

const TextInput = ({
    name,
    type,
    value,
    placeholder,
    error,
    info,
    onChange,
    disabled
}) => {
    return (
        <div>
            <input
                className={classnames('', {
                    'invalid-input': error
                })}
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            {info && <small>{info}</small>}
            {error && <div className="invalid-error">{error}</div>}
        </div>
    );
};

export default TextInput;
