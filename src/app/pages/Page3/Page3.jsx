import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import createComponent from 'shared/mag-component/component-factory';
import extensibleComponent from 'shared/mag-component/extensible-component';
import page3Reducer from './page3.reducer';

const componentId = 'oms-web-app/page3';

const page3 = () =>
  (<div>
    <Helmet title="Page 3" />
    <h1>Page 3</h1>
    <Link to="/">Home</Link>
  </div>);

const Page3Container = extensibleComponent(page3, componentId, 'Tab');

export const componentMetadata = {
  id: componentId,
  name: 'Page3',
  displayName: 'Page 3',
  sequence: 3,
  active: true,
  childComponentIds: [],
  renderer: Page3Container,
};

const pageCreationParams = {
  pageComponent: componentMetadata,
  pageReducer: {
    key: 'page3',
    reducer: page3Reducer,
  },
  contexts: {
    component: require.context('./Components/', true, /component.js/),
    link: require.context('./Component-Links/', true, /link.js/),
  },
};
export default (store) => {
  pageCreationParams.store = store;
  return createComponent(pageCreationParams);
};
