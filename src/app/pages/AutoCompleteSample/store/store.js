import { combineCycles } from 'redux-cycles';
import Rx from 'rxjs';
import 'rxjs/add/operator/switch';

import * as actions from './actions';
import * as ActionTypes from './action-types';

export function searchUsers(sources) {
  const searchQuery$ = sources.ACTION
    .filter(action => action.type === ActionTypes.SEARCHED_USERS)
    .map(action => action.payload.query)
    .filter(q => !!q)    
    .map(q =>
      sources.Time.periodic(800)
        .take(1)
        .map(() => q)        
        .takeUntil(
          sources.ACTION.filter(action =>
            action.type === ActionTypes.CLEARED_SEARCH_RESULTS)
        )
    )
    .switch();

  const searchQueryRequest$ = searchQuery$
    .map(q => ({
      url: `https://api.github.com/search/users?q=${q}`,
      category: 'query'
    }))

  const searchQueryResponse$ = sources.HTTP
    .select('query') 
    .switch()
    .map(res => res.body.items)
    .map(actions.receiveUsers)

  return {
    ACTION: searchQueryResponse$,
    HTTP: searchQueryRequest$
  }
}

function clearSearchResults(sources) {
  const clear$ = sources.ACTION
    .filter(action => action.type === ActionTypes.SEARCHED_USERS)
    .filter(action => !!!action.payload.query)
    .map(actions.clearSearchResults);

  return {
    ACTION: clear$
  }
}

export default combineCycles(searchUsers, clearSearchResults);