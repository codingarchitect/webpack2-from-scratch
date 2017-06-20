import React from 'react'

const DefaultLayoutComponentRenderer = function(props, context) {
  const components = Object.values(context.store.getState().components);   
  if (props.componentState && props.componentId) {
    const thisComponentState = props.componentState[props.componentId];
    let renderedComponents = components
      .filter((component, i) => thisComponentState.childComponentNames.find((childId) => childId === component.id))
      .map((component, i) => {
        let newProps = { 
          component,
          key: i
        }
        let ComponentElem = component.renderer; 
        return (
          <div className="component-item" key={i}>
            <ComponentElem />
          </div>
        )
      })
    return (
      <div className="component-items">
        { renderedComponents }
      </div>
    )
  }  else {
    return (
      <div>
        Component Error {props.componentId}
      </div>
    )
  }
};

DefaultLayoutComponentRenderer.contextTypes = {
  store: React.PropTypes.object
};

export default DefaultLayoutComponentRenderer;