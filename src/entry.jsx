/* eslint react/no-render-return-value: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { IntlProvider } from 'react-intl';

import './assets/stylesheets/styles.less'; // This line cost me 2-3 hours of debugging. Without this the styles.css is not emitted by etract text web pack plugin
import AppFactory from './app/App';
import createStore from './app/shared/store/create-store';
import { injectReducer } from './app/shared/store/reducer';
import componentReducer from './app/shared/mag-component/store/reducer';
import reactIntl from './utils/intl';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.__INITIAL_STATE__; // eslint-disable-line no-underscore-dangle
const store = createStore(initialState);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(createBrowserHistory(), store);

// Setup components reducer
injectReducer(store, { key: 'components', reducer: componentReducer });
// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');
const App = AppFactory(store);
let render = () =>
  ReactDOM.render(
    (<IntlProvider locale={reactIntl.language} messages={reactIntl.messages}>
      <Provider store={store}>
        <BrowserRouter history={history}>
          <App />
        </BrowserRouter>
      </Provider>
    </IntlProvider>),
    MOUNT_NODE);

// This code is excluded from production bundle
if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = (error) => {
      const RedBox = require('redbox-react').default; // eslint-disable-line global-require
      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        console.error(error); // eslint-disable-line no-console
        renderError(error);
      }
    };

    // Setup hot module replacement
    module.hot.accept('./app/App', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      }),
    );
  }
}

// ========================================================
// Go!
// ========================================================
render();
