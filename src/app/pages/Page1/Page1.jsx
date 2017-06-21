import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import extensibleComponent from 'shared/mag-component/extensible-component';
import page1Reducer from './page1.reducer';

const componentId = 'oms-web-app/page1';

const page1 = () =>
  (<div>
    <Helmet title="Page 1" />
    <h1>Page 1</h1>
    <Link to="/">Home</Link>
  </div>);

const Page1Container = extensibleComponent(page1, componentId, 'Panel');

export const componentMetadata = {
  id: componentId,
  name: 'Page1',
  displayName: 'Page 1',
  sequence: 1,
  active: true,
  childComponentIds: [],
  renderer: Page1Container,
};

const pageCreationParams = {
  pageComponent: componentMetadata,
  pageReducer: {
    key: 'page1',
    reducer: page1Reducer,
  },
  contexts: {
    component: require.context('./Components/', true, /component.js/),
    link: require.context('./Component-Links/', true, /link.js/),
  },
};
export default pageCreationParams;
