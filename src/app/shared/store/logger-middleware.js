const logger = store => next => (action) => {
  console.log('dispatching', action); // eslint-disable-line
  const result = next(action);
  console.log('next state', store.getState()); // eslint-disable-line
  return result;
};

export default logger;
