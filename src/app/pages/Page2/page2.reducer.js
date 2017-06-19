const initialState = {
  page2: {},
};

function page2Reducer(state = initialState) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  return state;
}

export default page2Reducer;
