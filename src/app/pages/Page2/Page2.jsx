import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import page2Reducer from './page2.reducer';

const page2 = () =>
  (<div>
    <Helmet title="Page 2" />
    <h1>Page 2</h1>
    <Link to="/">Home</Link>
  </div>);

export const componentMetadata = {
  id: 'oms-web-app/page2',
  name: 'Page2',
  displayName: 'Page 2',
  sequence: 2,
  active: true,
  childComponentIds: [],
  renderer: page2,
  extensible: true,
  layout: 'Tab',
};

const pageCreationParams = {
  pageComponent: componentMetadata,
  pageReducer: {
    key: 'page2',
    reducer: page2Reducer,
  },
  contexts: {
    component: require.context('./Components/', true, /component.js/),
    link: require.context('./Component-Links/', true, /link.js/),
  },
};

export default pageCreationParams;
