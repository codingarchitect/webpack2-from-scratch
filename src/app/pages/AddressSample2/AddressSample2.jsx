import React from 'react';

import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import addressSample2Reducer from './address-sample2.reducer';
import Address from './Address';

const addressSample2 = () =>
  (<div>
    <Helmet title="Address Sample (Using react-redux-form)" />
    <h1>Address Sample (react-redux-form)</h1>
    <Link to="/">Home</Link>
    <Address forModel="addressSample2.deliveryAddress" />
    <Address forModel="addressSample2.invoiceAddress" mode="readOnly" />
    <Address forModel="addressSample2.billingAddress" />
    <Address forModel="addressSample2.deliveryAddress" mode="singleLine" />
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
