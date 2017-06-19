import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import createComponent from 'shared/utils/component-factory';
import page1Reducer from './page1.reducer';

const page1 = () =>
  (<div>
    <Helmet title="Page 1" />
    <h1>Page 1</h1>
    <Link to="/">Home</Link>
  </div>);

export default store => createComponent(page1, store, 'page1', page1Reducer);
