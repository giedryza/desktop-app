import React, { Fragment } from 'react';

const TextArea = ({ name, placeholder, value, error, onChange }) => (
    <Fragment>
        <textarea
            className={error && 'invalid-input'}
            rows="6"
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
        />
        {error && <div className="invalid-error">{error}</div>}
    </Fragment>
);

export default TextArea;
