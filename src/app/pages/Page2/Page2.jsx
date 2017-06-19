import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import createComponent from 'shared/utils/component-factory';
import page2Reducer from './page2.reducer';

const page2 = () =>
  (<div>
    <Helmet title="Page 2" />
    <h1>Page 2</h1>
    <Link to="/">Home</Link>
  </div>);

export default store => createComponent(page2, store, 'page2', page2Reducer);
