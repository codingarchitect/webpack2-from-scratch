import React from 'react';
import PropTypes from 'prop-types';

const CountryPresentational = props =>
  (<span className="form-group">
    <label className="control-label" htmlFor={props.name}>Postcode:</label>
    <select className="form-control" {...props} readOnly={props.mode === 'readOnly'} >
      {props.countries.map(country => <option value={country.CountryCode}>{country.Name}</option>) }
    </select>
  </span>);

CountryPresentational.propTypes = {
  name: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  countries: PropTypes.arrayOf(PropTypes.shape({
    CountryCode: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
  })).isRequired,
};

CountryPresentational.defaultProps = {
  mode: 'edit',
};

export default CountryPresentational;
