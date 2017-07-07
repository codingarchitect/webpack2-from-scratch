import React from 'react';
import PropTypes from 'prop-types';

const LinePresentational = props =>
  (<span className="form-group">
    <label className="control-label" htmlFor={props.name}>
      {props.label}{props.required && '*'}
    </label>
    <input className="form-control" {...props} id={props.name} readOnly={props.mode === 'readOnly'} />
    { props.errorsComponent() }
  </span>);

LinePresentational.propTypes = {
  name: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorsComponent: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

LinePresentational.defaultProps = {
  mode: 'edit',
  required: false,
};

export default LinePresentational;
