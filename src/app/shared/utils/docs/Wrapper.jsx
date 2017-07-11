import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';

import createStore from '../../store/create-store';
import { injectReducer } from '../../store/reducer';
import componentReducer from '../../mag-component/store/reducer';
import reactIntl from '../../../../utils/intl';
import ioc from './ioc-container';

const store = createStore();
injectReducer(store, { key: 'components', reducer: componentReducer });
ioc.registerValue('store', store);

export default class Wrapper extends Component { // eslint-disable-line
  render() {
    return (
      <IntlProvider locale={reactIntl.language} messages={reactIntl.messages}>
        <Provider store={store}>
          {this.props.children}
        </Provider>
      </IntlProvider>
    );
  }
}

Wrapper.propTypes = {
  children: PropTypes.any.isRequired, // eslint-disable-line  
};
