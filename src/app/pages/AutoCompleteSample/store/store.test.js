import { mockTimeSource } from '@cycle/time/rxjs';
import Rx from 'rxjs';
import 'rxjs/add/operator/switch';

import * as actions from './actions';
import main from './store';

function mapPingToPong(sources) {
  const pong$ = sources.ACTION
    .filter(action => action.type === 'PING')
    .map(() => { return { type: 'PONG'} });

  return {
    ACTION: pong$
  }
}

describe('redux-cycles', () => {
  it('ping should be mapped to pong', (done) => {
    const Time = mockTimeSource();
    
    const input$    = { ACTION: Time.diagram('-p--------p---|', { p: { type: 'PING'}})};
    const actual$   = mapPingToPong(input$).ACTION;
    const expected$    = Time.diagram('-p--------p---|', { p: { type: 'PONG'}});

    Time.assertEqual(actual$, expected$);
    Time.run(done);
  });
});

describe('Cycles', function() {
  describe('searchUsers', () => {
    it('should emit HTTP requests given many debounced ACTIONs, and should emit ACTION given HTTP response', (done) => {
      const Time = mockTimeSource({ interval: 200 });

      const actionSource = {
        a: actions.searchUsers('c'),
        b: actions.searchUsers('co'),
        c: actions.searchUsers('cod')
      };
      const httpSource = {
        select: () => Time.diagram('---r------|', { r: Rx.Observable.of({ body: { items: ['codingarchitect'] } })})
      }
      const httpSink = {
        a: {
          url: `https://api.github.com/search/users?q=cod`,
          category: 'query'
        }
      }
      const actionSink = {
        r: actions.receiveUsers(['codingarchitect']),
      }

      const inputActions$ = Time.diagram('-a-b-c----|', actionSource);
      const expectedRequests$ = Time.diagram('---------a|', httpSink);
      const expectedActions$ = Time.diagram('---r------|', actionSink);
      const input = { ACTION: inputActions$, HTTP: httpSource, Time };
      const actualOutput = main(input);
      const actualRequests$ = actualOutput.HTTP;
      const actualActions$ = actualOutput.ACTION;      
      
      Time.assertEqual(actualRequests$, expectedRequests$);
      Time.assertEqual(actualActions$, expectedActions$);
      Time.run(done);
    })
  })
  describe('clearSearchResults', () => {
    it('should emit clearSearchResults ACTION given a searchUsers action with empty payload', (done) => {
      const Time = mockTimeSource({ interval: 200 });

      const actionSource = {
        a: actions.searchUsers()
      };
      const httpSource = {
        select: () => Time.diagram('--|')
      }
      const actionSink = {
        r: actions.clearSearchResults(),
      }

      const inputActions$ = Time.diagram('-----a-----|', actionSource);
      const expectedActions$ = Time.diagram('-----r-----|', actionSink);
      const input = { ACTION: inputActions$, HTTP: httpSource, Time };
      const actualOutput = main(input);
      const actualActions$ = actualOutput.ACTION;      
      
      Time.assertEqual(actualActions$, expectedActions$);
      Time.run(done);
    })
  })
});
