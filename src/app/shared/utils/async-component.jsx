import React from 'react';
import createPageComponent from '../mag-component/component-factory';
import extensibleComponent from '../mag-component/extensible-component';

export default (loader, collection, store) => (
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);

      this.Component = null;
      this.state = { Component: AsyncComponent.Component };
    }

    componentWillMount() {
      if (!this.state.Component) {
        loader().then((moduleResult) => {
          const result = moduleResult.default ? moduleResult.default : moduleResult;
          if (result.pageComponent) {
            result.store = store;
            result.pageComponent.renderer =
              extensibleComponent(
                result.pageComponent.renderer,
                result.pageComponent.id,
                result.pageComponent.layout);
            createPageComponent(result);
          }
          const Component = result.pageComponent ? result.pageComponent.renderer : result;
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }

    render() {
      if (this.state.Component) {
        return (
          <this.state.Component {...this.props} {...collection} />
        );
      }

      return null;
    }
  }
);
