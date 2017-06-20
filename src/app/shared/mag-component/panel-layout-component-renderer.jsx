import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';

function TabLayoutComponentRenderer(props, context) {
  const components = Object.values(context.store.getState().components);
  if (props.componentState && props.componentId) {
    const thisComponentState = props.componentState[props.componentId];
    const renderedComponents = components
      .filter(component =>
        thisComponentState.childComponentIds.find(childId => childId === component.id))
      .map((component) => {
        const ComponentElem = component.renderer;
        return (
          <Tab label={component.displayName} actAsExpander showExpandableButton>
            <ComponentElem />
          </Tab>
        );
      });
    return (
      <Tabs>
        { renderedComponents }
      </Tabs>
    );
  }
  return (
    <div>
        Component Error {props.componentId}
    </div>
  );
}

TabLayoutComponentRenderer.contextTypes = {
  store: PropTypes.object,
};

TabLayoutComponentRenderer.propTypes = {
  componentState: PropTypes.object.isRequired, // eslint-disable-line
  componentId: PropTypes.string.isRequired,
};

export default TabLayoutComponentRenderer;
