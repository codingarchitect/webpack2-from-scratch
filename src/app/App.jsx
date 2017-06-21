import React from 'react';
import { Switch, Route } from 'react-router';
import Helmet from 'react-helmet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import asyncComponent from 'shared/utils/async-component';

export default function AppFactory(store) {
  const HomePage = asyncComponent(() => import(/* webpackChunkName: "Home" */ './pages/Home/Home')
    .then(module => module.default), { name: 'Home' });
  const Page1 = asyncComponent(() => import(/* webpackChunkName: "Page1" */ './pages/Page1/Page1')
    .then(module => module.default(store)), { name: 'Page1' });
  const Page2 = asyncComponent(() => import(/* webpackChunkName: "Page2" */ './pages/Page2/Page2')
    .then(module => module.default(store)), { name: 'Page2' });
  const Page3 = asyncComponent(() => import(/* webpackChunkName: "Page3" */ './pages/Page3/Page3')
    .then(module => module.default(store)), { name: 'Page3' });
  const render = () => (<div>
    <Helmet
      titleTemplate="Maginus OMS - %s"
      titleAttributes={{ itemprop: 'name', lang: 'en' }}
    />
    <MuiThemeProvider>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/page1" component={Page1} />
        <Route path="/page2" component={Page2} />
        <Route path="/page3" component={Page3} />
      </Switch>
    </MuiThemeProvider>
  </div>);
  return render;
}
