import React from 'react';
import PropTypes from 'prop-types';

const PostCodePresentational = props =>
  (<span className="form-group">
    <label className="control-label" htmlFor={props.name}>Postcode:</label>
    <input className="form-control" readOnly={props.mode === 'readOnly'} {...props} />
  </span>);

PostCodePresentational.propTypes = {
  name: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
};

PostCodePresentational.defaultProps = {
  mode: 'edit',
};

export default PostCodePresentational;
