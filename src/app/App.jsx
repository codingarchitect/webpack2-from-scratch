import React from 'react';
import { Switch, Route } from 'react-router';
import Helmet from 'react-helmet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import asyncComponent from 'shared/utils/async-component';

function getPageLoaders(store) {
  return {
    home: asyncComponent(() => import('./pages/Home/Home'), { name: 'Home' }),
    page1: asyncComponent(() => import('./pages/Page1/Page1'), { name: 'Page1' }, store),
    page2: asyncComponent(() => import('./pages/Page2/Page2'), { name: 'Page2' }, store),
    page3: asyncComponent(() => import('./pages/Page3/Page3'), { name: 'Page3' }, store),
    addressSample: asyncComponent(() => import('./pages/AddressSample/AddressSample'), { name: 'AddressSample' }, store),
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
        <Route path="/address-sample" component={pageLoaders.addressSample} />
      </Switch>
    </MuiThemeProvider>
  </div>);
  return render;
}
