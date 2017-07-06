import React from 'react';

import { Link } from 'react-router-dom';
import { Control, Fieldset, Form } from 'react-redux-form';
import Helmet from 'react-helmet';

import addressSample2Reducer from './address-sample2.reducer';

const addressSample2 = () =>
  (<div>
    <Helmet title="Address Sample (Using react-redux-form)" />
    <h1>Address Sample (react-redux-form)</h1>
    <Link to="/">Home</Link>
    <Form model="addressSample2">
      <Fieldset model=".address">
        <label htmlFor="address.address1">Address1:</label>
        <Control.text model=".address1" id="address.address1" />
        <label htmlFor="address.address2">Address2:</label>
        <Control.text model=".address2" id="address.address2" />
        <label htmlFor="address.country">Country:</label>
        <Control.select model=".country" id="address.country" >
          <option value="IN">India</option>
          <option value="UK">United Kingdom</option>
          <option value="US">United States</option>
        </Control.select>
        <label htmlFor="address.postcode">Postcode:</label>
        <Control.text model=".postcode" id="address.postcode" debounce={300} />
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
