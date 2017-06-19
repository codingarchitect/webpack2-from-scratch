import React from 'react';
import { Link } from 'react-router-dom';
import { injectReducer } from 'shared/store/reducer';
import page2Reducer from './page2.reducer';

const page2 = () =>
  (<div>
    <h1>Page 2</h1>
    <Link to="/">Home</Link>
  </div>);

const page2Factory = (store) => {
  injectReducer(store, { key: 'page2', reducer: page2Reducer });
  return page2;
};

export default page2Factory;
