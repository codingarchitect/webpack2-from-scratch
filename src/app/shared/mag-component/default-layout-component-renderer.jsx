import React from 'react';
import PropTypes from 'prop-types';

function DefaultLayoutComponentRenderer(props, context) {
  const components = Object.values(context.store.getState().components);
  if (props.componentState && props.componentId) {
    const thisComponentState = props.componentState[props.componentId];
    const renderedComponents = components
      .filter(component =>
        thisComponentState.childComponentNames.find(childId => childId === component.id))
      .map((component) => {
        const ComponentElem = component.renderer;
        return (
          <div className="component-item" key={component.id}>
            <ComponentElem />
          </div>
        );
      });
    return (
      <div className="component-items">
        { renderedComponents }
      </div>
    );
  }
  return (
    <div>
        Component Error {props.componentId}
    </div>
  );
}

DefaultLayoutComponentRenderer.contextTypes = {
  store: PropTypes.object,
};

DefaultLayoutComponentRenderer.propTypes = {
  componentState: PropTypes.object.isRequired, // eslint-disable-line
  componentId: PropTypes.string.isRequired,
};

export default DefaultLayoutComponentRenderer;
