import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

const home = () =>
  (<div>
    <Helmet title="Home" />
    <h1>Home</h1>
    <ul>
      <li>
        <Link to="page1">Page 1</Link>
      </li>
      <li>
        <Link to="page2">Page 2</Link>
      </li>
      <li>
        <Link to="page3">Page 3</Link>
      </li>
      <li>
        <Link to="address-sample">Address Sample</Link>
      </li>
      <li>
        <Link to="address-sample2">Address Sample (react-redux-form)</Link>
      </li>
    </ul>
  </div>);

export default home;
