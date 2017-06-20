import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import createComponent from 'shared/mag-component/component-factory';
import page1Reducer from './page1.reducer';

const page1 = () =>
  (<div>
    <Helmet title="Page 1" />
    <h1>Page 1</h1>
    <Link to="/">Home</Link>
  </div>);

// The regular expression cost me a lot of time
// The following was working in in webpack 1 /\component.js$/
// This has to be changed to /component.js/ in webpack 2
// If we get this wrong one of the two is bound to happen
// Either Nothing gets required or
// Unable to find module '.' error is thrown
// Also parametersing this seems to be a problem, webpack statically analyses require paths
// so have to put require.context in the caller,
// Cannot move this to loadComponents / loadComponentLinks easily
// reactComponent, store, reducerKey, reducer
const pageCreationParams = {
  pageComponent: page1,
  pageReducer: {
    key: 'page1',
    reducer: page1Reducer,
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
