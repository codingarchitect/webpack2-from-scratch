import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import page1Reducer from './page1.reducer';

const page1 = () =>
  (<div>
    <Helmet title="Page 1" />
    <h1>Page 1</h1>
    <Link to="/">Home</Link>
  </div>);

export const componentMetadata = {
  id: 'oms-web-app/page1',
  name: 'Page1',
  displayName: 'Page 1',
  sequence: 1,
  active: true,
  childComponentIds: [],
  renderer: page1,
};

const pageCreationParams = {
  pageComponent: componentMetadata,
  pageReducer: {
    key: 'page1',
    reducer: page1Reducer,
  },
  layout: 'Tab',
  contexts: {
    component: require.context('./Components/', true, /component.js/),
    link: require.context('./Component-Links/', true, /link.js/),
  },
};
export default pageCreationParams;
