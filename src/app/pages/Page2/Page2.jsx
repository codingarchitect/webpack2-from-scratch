import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import createComponent from 'shared/mag-component/component-factory';
import extensibleComponent from 'shared/mag-component/extensible-component';
import page2Reducer from './page2.reducer';

const componentId = 'oms-web-app/Page2';

const page2 = () =>
  (<div>
    <Helmet title="Page 2" />
    <h1>Page 2</h1>
    <Link to="/">Home</Link>
  </div>);

const Page2Container = extensibleComponent(page2, componentId, 'Default');

export const componentMetadata = {
  id: componentId,
  name: 'Page2',
  displayName: 'Page 2',
  sequence: 2,
  active: true,
  childPluginIds: [],
  renderer: Page2Container,
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
export default (store) => {
  pageCreationParams.store = store;
  return createComponent(pageCreationParams);
};
