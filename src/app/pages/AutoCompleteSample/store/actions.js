import * as ActionTypes from './action-types';

export function searchUsers(query) {
  return {
    type: ActionTypes.SEARCHED_USERS,
    payload: {
      query
    }
  };
}

export function receiveUsers(users) {
  return {
    type: ActionTypes.RECEIVED_USERS,
    payload: {
      users
    }
  };
}

export function clearSearchResults() {
  return {
    type: ActionTypes.CLEARED_SEARCH_RESULTS
  };
}
