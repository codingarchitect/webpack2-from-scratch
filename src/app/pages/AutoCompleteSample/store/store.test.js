import {mockTimeSource} from '@cycle/time';

describe('@cycle/time delay', () => {
  it('is super quick because of virtual time', (done) => {
    const Time = mockTimeSource();

    const input$    = Time.diagram('-1--------2---|');
    const actual$   = input$.compose(Time.delay(200));
    const expected$ = Time.diagram('-----------1--------2---|');

    Time.assertEqual(actual$, expected$);

    Time.run(done);
  });
});
