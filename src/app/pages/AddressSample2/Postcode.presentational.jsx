import React from 'react';
import PropTypes from 'prop-types';

const PostCodePresentational = props =>
  (<span className="form-group">
    <label className="control-label" htmlFor={props.name}>{props.label}</label>
    <input className="form-control" id={props.name} readOnly={props.mode === 'readOnly'} {...props} />
  </span>);

PostCodePresentational.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  mode: PropTypes.string.isRequired,
};

PostCodePresentational.defaultProps = {
  mode: 'edit',
  label: 'Postcode',
};

export default PostCodePresentational;
