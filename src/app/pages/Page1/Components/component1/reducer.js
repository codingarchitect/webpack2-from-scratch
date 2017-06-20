const initialState = {
  page1component1: {},
};

function page1Component1Reducer(state = initialState) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  return state;
}

export default page1Component1Reducer;
