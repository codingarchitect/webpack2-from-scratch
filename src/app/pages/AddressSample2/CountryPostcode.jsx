import React from 'react';
import { connect } from 'react-redux';

import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Form, Control, Errors, actions } from 'react-redux-form';

import messages from './messages';
import PostcodePresentational from './Postcode.presentational';

const validatePostcode = (country, postcode, dispatch, forModel) => {
  if (country !== 'UK') return true;
  const ukPostcodeFormat = /^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/;
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

const CountryPostCode = ({ forModel, dispatch, intl, mode }) => {
  const { formatMessage } = intl;
  return (<Form
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
    <span className="form-group">
      <label className="control-label" htmlFor="address.postcode">Postcode:</label>
      <Control.select className="form-control" model=".country" id="address.country" readOnly={mode === 'readOnly'} >
        <option value="IN">India</option>
        <option value="UK">United Kingdom</option>
        <option value="US">United States</option>
      </Control.select>
    </span>
    <Control.text model=".postcode" debounce={300} mode={mode} component={PostcodePresentational} />

    <Errors
      model={`${forModel}`}
      messages={{
        invalidPostcodeFormat: formatMessage(messages.invalidPostcodeFormat),
      }}
      wrapper="span"
    />
  </Form>);
};

CountryPostCode.propTypes = {
  forModel: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired, // eslint-disable-line
  mode: PropTypes.string.isRequired,
};

CountryPostCode.defaultProps = {
  mode: 'edit',
};

export default connect(null)(injectIntl(CountryPostCode));
