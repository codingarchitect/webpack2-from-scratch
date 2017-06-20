import React, { Component } from 'react'
import { connect } from 'react-redux'
import DefaultLayoutComponentRenderer from './default-layout-component-renderer';
import FormLayoutComponentRenderer from './form-layout-component-renderer';

const mapStateToProps = (state) => {
  if (!state) return ({ pluginState: {} })
  return ({
    pluginState: state.components
  })
};

const rendererFor = {
    Default: DefaultLayoutComponentRenderer,
    Form: FormLayoutComponentRenderer
}

const extensibleComponent = function (ComponentToExtend, componentId, layout, formControls) {
  class ExtensibleComponentPP extends Component {
    render() {
      const LayoutPluginRenderer = rendererFor(layout);
      const newProps = {
        componentId: componentId,
        formControls
      }      
      return (        
        <div>
          <ComponentToExtend {...this.props} />
          <LayoutPluginRenderer {...this.props} {...newProps} />
        </div>
      )
    }
  }
  return connect(
    mapStateToProps
  )(ExtensibleComponentPP);
}

export default extensibleComponent;