import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { injectReducer } from 'shared/store/reducer';
import page1Reducer from './page1.reducer';

const page1 = () =>
  (<div>
    <Helmet title="Page 1" />
    <h1>Page 1</h1>
    <Link to="/">Home</Link>
  </div>);

const page1Factory = (store) => {
  injectReducer(store, { key: 'page1', reducer: page1Reducer });
  return page1;
};

export default page1Factory;
