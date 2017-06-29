import { mockTimeSource } from '@cycle/time/rxjs';
import Rx from 'rxjs';

function main(sources) {
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
    const actual$   = main(input$).ACTION;
    const expected$    = Time.diagram('-p--------p---|', { p: { type: 'PONG'}});

    Time.assertEqual(actual$, expected$);
    Time.run(done);
  });
});
