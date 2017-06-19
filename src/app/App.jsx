import React from 'react';
import { Switch, Route } from 'react-router';
import asyncComponent from './shared/utils/async-component';

const HomePage = asyncComponent(() => import(/* webpackChunkName: "Home" */ './pages/Home/Home')
  .then(module => module.default), { name: 'Home' });
const Page1 = asyncComponent(() => import(/* webpackChunkName: "Page1" */ './pages/Page1/Page1')
  .then(module => module.default), { name: 'Page1' });
const Page2 = asyncComponent(() => import(/* webpackChunkName: "Page2" */ './pages/Page2/Page2')
  .then(module => module.default), { name: 'Page2' });

const app = () =>
  (<div>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/page1" component={Page1} />
      <Route path="/page2" component={Page2} />
    </Switch>
  </div>);

export default app;
