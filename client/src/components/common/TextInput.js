import React, { Fragment } from 'react';
import classnames from 'classnames';

const TextInput = ({ name, type, value, placeholder, error, onChange }) => {
    return (
        <Fragment>
            <input
                className={classnames('', {
                    'invalid-input': error
                })}
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            {error && <div className="invalid-error">{error}</div>}
        </Fragment>
    );
};

export default TextInput;
