const initialState = {
  page1: {},
};

function page1Reducer(state = initialState) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  return state;
}

export default page1Reducer;
