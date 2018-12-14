import React, { Fragment } from 'react';

const TextInput = ({ name, type, value, placeholder, error, onChange }) => (
    <Fragment>
        <input
            className={error && 'invalid-input'}
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
        />
        {error && <div className="invalid-error">{error}</div>}
    </Fragment>
);

export default TextInput;
