import React from 'react';
import classnames from 'classnames';

const TextArea = ({ name, placeholder, value, error, onChange }) => {
    return (
        <div className="form-group">
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
        </div>
    );
};

export default TextArea;
