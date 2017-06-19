import React from 'react';
import { Switch, Route } from 'react-router';
import HomePage from './pages/Home/Home';
import Page1 from './pages/Page1/Page1';
import Page2 from './pages/Page2/Page2';

const app = () =>
  (<div>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/page1" component={Page1} />
      <Route path="/page2" component={Page2} />
    </Switch>
  </div>);

export default app;
