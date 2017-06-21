import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';

function PanelLayoutComponentRenderer(props, context) {
  const components = Object.values(context.store.getState().components);
  if (props.componentState && props.componentId) {
    const thisComponentState = props.componentState[props.componentId];
    const renderedComponents = components
      .filter(component =>
        thisComponentState.childComponentIds.find(childId => childId === component.id))
      .map((component) => {
        const ComponentElem = component.renderer;
        return (
          <Card key={component.id}>
            <CardHeader title={component.displayName} actAsExpander showExpandableButton />
            <CardText expandable>
              <ComponentElem />
            </CardText>
          </Card>
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

PanelLayoutComponentRenderer.contextTypes = {
  store: PropTypes.object,
};

PanelLayoutComponentRenderer.propTypes = {
  componentState: PropTypes.object.isRequired, // eslint-disable-line
  componentId: PropTypes.string.isRequired,
};

export default PanelLayoutComponentRenderer;
