import React from 'react';
import extensibleComponent from 'shared/mag-component/extensible-component';

const page2Component2 = () => <h2>Page 2 Component 2</h2>;

const page2Component2Container = extensibleComponent(page2Component2, 'oms-web-app/page2/component2', 'Panel');

export default page2Component2Container;
