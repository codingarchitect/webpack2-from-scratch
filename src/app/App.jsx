import React from 'react';
import { Switch, Route } from 'react-router';
import Helmet from 'react-helmet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import asyncComponent from 'shared/utils/async-component';

function getPageLoaders(store) {
  return {
    home: asyncComponent(() => import('./pages/Home/Home').then(module => module.default), { name: 'Home' }),
    page1: asyncComponent(() => import('./pages/Page1/Page1').then(module => module.default(store)), { name: 'Page1' }),
    page2: asyncComponent(() => import('./pages/Page2/Page2').then(module => module.default(store)), { name: 'Page2' }),
    page3: asyncComponent(() => import('./pages/Page3/Page3').then(module => module.default(store)), { name: 'Page3' }),
  };
}

export default function AppFactory(store) {
  const pageLoaders = getPageLoaders(store);
  const render = () => (<div>
    <Helmet
      titleTemplate="Maginus OMS - %s"
      titleAttributes={{ itemprop: 'name', lang: 'en' }}
    />
    <MuiThemeProvider>
      <Switch>
        <Route exact path="/" component={pageLoaders.home} />
        <Route path="/page1" component={pageLoaders.page1} />
        <Route path="/page2" component={pageLoaders.page2} />
        <Route path="/page3" component={pageLoaders.page3} />
      </Switch>
    </MuiThemeProvider>
  </div>);
  return render;
}

