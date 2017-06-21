import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import page3Reducer from './page3.reducer';

const page3 = () =>
  (<div>
    <Helmet title="Page 3" />
    <h1>Page 3</h1>
    <Link to="/">Home</Link>
  </div>);

export const componentMetadata = {
  id: 'oms-web-app/page3',
  name: 'Page3',
  displayName: 'Page 3',
  sequence: 3,
  active: true,
  childComponentIds: [],
  renderer: page3,
};

const pageCreationParams = {
  pageComponent: componentMetadata,
  pageReducer: {
    key: 'page3',
    reducer: page3Reducer,
  },
  layout: 'Tab',
  contexts: {
    component: require.context('./Components/', true, /component.js/),
    link: require.context('./Component-Links/', true, /link.js/),
  },
};

export default pageCreationParams;
