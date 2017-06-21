import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayoutComponentRenderer from './layouts/default-layout-component-renderer';
import FormLayoutComponentRenderer from './layouts/form-layout-component-renderer';
import PanelLayoutComponentRenderer from './layouts/panel-layout-component-renderer';
import TabLayoutComponentRenderer from './layouts/tab-layout-component-renderer';

const mapStateToProps = (state) => {
  if (!state) return ({ componentState: {} });
  return ({
    componentState: state.components,
  });
};

const rendererFor = {
  Default: DefaultLayoutComponentRenderer,
  Form: FormLayoutComponentRenderer,
  Panel: PanelLayoutComponentRenderer,
  Tab: TabLayoutComponentRenderer,
};

function extensibleComponent(ComponentToExtend, componentId, layout, formControls) {
  class ExtensibleComponentPP extends Component { // eslint-disable-line
    render() {
      const LayoutPluginRenderer = rendererFor[layout];
      const newProps = {
        componentId,
        formControls,
      };
      return (
        <div>
          <ComponentToExtend {...this.props} />
          <LayoutPluginRenderer {...this.props} {...newProps} />
        </div>
      );
    }
  }
  return connect(
    mapStateToProps,
  )(ExtensibleComponentPP);
}

export default extensibleComponent;
