import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { Form, Control, Errors, actions } from 'react-redux-form';

const validatePostcode = (country, postcode, dispatch, forModel) => {
  if (country !== 'UK') return true;
  const ukPostcodeFormat = /^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/;
  // TODO: read this message using an I18n library
  if (!ukPostcodeFormat.test(postcode)) {
    return false;
  }
  const parts = postcode.toUpperCase().match(/^([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})$/);
  parts.shift();
  const normalizedPostcode = parts.join(' ');
  if (postcode !== normalizedPostcode) {
    dispatch(actions.change(`${forModel}.postcode`, normalizedPostcode));
  }
  return true;
};

const reduxFormErrors = {
  invalidPostcodeFormat: 'Invalid postcode format.',
};

const CountryPostCode = ({ forModel, dispatch }) => (
  <Form
    model={`${forModel}`}
    component="span"
    validators={{
      '': {
        invalidPostcodeFormat:
          ({ country, postcode }) =>
            validatePostcode(country, postcode, dispatch, forModel),
      },
    }}
  >
    <Control.select model=".country" id="address.country" >
      <option value="IN">India</option>
      <option value="UK">United Kingdom</option>
      <option value="US">United States</option>
    </Control.select>
    <label htmlFor="address.postcode">Postcode:</label>
    <Control.text model=".postcode" id="address.postcode" debounce={300} />
    <Errors
      model={`${forModel}`}
      messages={reduxFormErrors}
    />
  </Form>
);

CountryPostCode.propTypes = {
  forModel: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(null)(CountryPostCode);
