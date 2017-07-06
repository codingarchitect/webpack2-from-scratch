import React from 'react';

import { Link } from 'react-router-dom';
import { Control, Errors, Fieldset, Form } from 'react-redux-form';
import Helmet from 'react-helmet';

import CountryPostCode from './CountryPostcode';
import addressSample2Reducer from './address-sample2.reducer';
import addressSchema from './address-schema';

const renderLines = () => {
  const properties = addressSchema.properties;
  const requiredLines = addressSchema.required;
  return (
    Object.keys(properties).map((line) => {
      const isRequired = requiredLines.includes(line);
      return (
        <span key={line}>
          <label htmlFor={`address.${line}`}>{properties[line].title}{isRequired && '*'}</label>
          <Control.text
            model={`.${line}`}
            id={`address.${line}`}
            validators={{
              required: lineVal => (isRequired ? lineVal && lineVal.length : true),
            }}
          />
          <Errors
            model={`.${line}`}
            wrapper="span"
            messages={{
              required: () => '*',
            }}
          />
        </span>
      );
    })
  );
};

const addressSample2 = () =>
  (<div>
    <Helmet title="Address Sample (Using react-redux-form)" />
    <h1>Address Sample (react-redux-form)</h1>
    <Link to="/">Home</Link>
    <Form model="addressSample2">
      <Fieldset model=".address">
        { renderLines() }
        <CountryPostCode forModel="addressSample2.address" />
      </Fieldset>
    </Form>
  </div>);

export const componentMetadata = {
  id: 'oms-web-app/address-sample2',
  name: 'AddressSample2',
  displayName: 'Adddress Sample Using react-redux-from',
  sequence: 1,
  active: true,
  childComponentIds: [],
  renderer: addressSample2,
  extensible: false,
  layout: 'Default',
};

const pageCreationParams = {
  pageComponent: componentMetadata,
  pageReducer: {
    key: 'addressSample2',
    reducer: addressSample2Reducer,
  },
  contexts: {
    component: require.context('./Components/', true, /component.js/),
    link: require.context('./Component-Links/', true, /link.js/),
  },
};
export default pageCreationParams;
