import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import createComponent from 'shared/mag-component/component-factory';
import page2Reducer from './page2.reducer';

const page2 = () =>
  (<div>
    <Helmet title="Page 2" />
    <h1>Page 2</h1>
    <Link to="/">Home</Link>
  </div>);

const pageCreationParams = {
  pageComponent: page2,
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
