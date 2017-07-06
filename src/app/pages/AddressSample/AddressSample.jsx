import React from 'react';

import Helmet from 'react-helmet';
import Form from 'react-jsonschema-form';

import Lookup from './Lookup';
import schema from './address-schema';

console.log(schema);

// Define the custom field component to use for the root object
const uiSchema = {
  address: {
    postcode: {
      'ui:widget': 'lookup',
    },
  },
};

// Define the custom field components to register; here our "geo"
// custom field component
const widgets = { lookup: Lookup };

const log = type => console.log.bind(console, type);

var data = { // eslint-disable-line
  address: {
    country: 'UK',
    address2: 'Line2',
  },
};

const validate = (formData, errors) => {
  var address = formData.address; // eslint-disable-line
  const postcode = address.postcode;
  if (address.country === 'UK' && postcode) {
    const ukPostcodeFormat = /^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/;
    // TODO: read this message using an I18n library
    if (!ukPostcodeFormat.test(postcode)) {
      errors.address.postcode.addError('Invalid postcode format.');
    } else {
      const parts = postcode.toUpperCase().match(/^([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})$/);
      parts.shift();
      const normalizedPostcode = parts.join(' ');
      data.address.postcode = normalizedPostcode;
      data.address.address1 = normalizedPostcode;
    }
  }
  return errors;
};

const addressSample = () =>
  (<div>
    <Helmet title="Address Sample" />
    <Form
      noHtml5Validate
      schema={schema}
      formData={data}
      uiSchema={uiSchema}
      widgets={widgets}
      onChange={log('changed')}
      onSubmit={log('submitted')}
      onError={log('errors')}
      validate={validate}
    >
      <span />
    </Form>
  </div>);

export default addressSample;
