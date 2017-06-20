import React from 'react';
import { Switch, Route } from 'react-router';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import asyncComponent from 'shared/utils/async-component';
import componentReducer from 'shared/mag-component/store';
import { injectReducer } from 'shared/store/reducer';

const App = (props, context) => {
  const store = context.store;
  injectReducer(store, { key: 'components', reducer: componentReducer });
  const HomePage = asyncComponent(() => import(/* webpackChunkName: "Home" */ './pages/Home/Home')
    .then(module => module.default), { name: 'Home' });
  const Page1 = asyncComponent(() => import(/* webpackChunkName: "Page1" */ './pages/Page1/Page1')
    .then(module => module.default(store)), { name: 'Page1' });
  const Page2 = asyncComponent(() => import(/* webpackChunkName: "Page2" */ './pages/Page2/Page2')
    .then(module => module.default(store)), { name: 'Page2' });
  return (<div>
    <Helmet
      titleTemplate="Maginus OMS - %s"
      titleAttributes={{ itemprop: 'name', lang: 'en' }}
    />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/page1" component={Page1} />
      <Route path="/page2" component={Page2} />
    </Switch>
  </div>);
};

App.contextTypes = {
  store: PropTypes.object,
};

export default App;
