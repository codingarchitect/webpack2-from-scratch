import React from 'react';
import extensibleComponent from 'shared/mag-component/extensible-component';

const page3Component2 = () => <h2>Page 3 Component 2</h2>;

const page3Component2Container = extensibleComponent(page3Component2, 'oms-web-app/page3/component2', 'Panel');

export default page3Component2Container;
