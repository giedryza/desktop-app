import React, { Fragment } from 'react';
import classnames from 'classnames';

const TextArea = ({ name, placeholder, value, error, onChange }) => {
    return (
        <Fragment>
            <textarea
                className={classnames('', {
                    'invalid-input': error
                })}
                rows="6"
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            {error && <div className="invalid-error">{error}</div>}
        </Fragment>
    );
};

export default TextArea;
