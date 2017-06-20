import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
// import { routerMiddleware } from 'react-router-redux';
import makeRootReducer from './reducer'; // eslint-disable-line import/no-named-as-default
import loggerMiddleware from './logger-middleware';

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  // THe routerMiddleware is buggy,
  // The line below cost me a 3-4 hours.
  // If the routerMiddleware is included then none of the reducers execute
  // const middleware = [loggerMiddleware, thunk, routerMiddleware];
  const middleware = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(loggerMiddleware);
  }
  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];

  let composeEnhancers = compose;

  if (process.env.NODE_ENV !== 'production') {
    const composeWithDevToolsExtension =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // eslint-disable-line no-underscore-dangle
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension;
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers,
    ),
  );
  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const reducers = require('./reducer').default; // eslint-disable-line global-require
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};
