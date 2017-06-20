import React from 'react'
import { Form } from 'react-bootstrap'
import { registerComponent, registerAsChildComponent } from './store';

const FormLayoutComponentRenderer = function (props, context) {
  const components = Object.values(context.store.getState().components); 
  if (props.componentState && props.componentId) {
    const componentsInThisTemplate = createComponentMetadata(
      props.formControls,
      props.dispatch, 
      registerComponent, 
      registerAsChildComponent, 
      props.componentId);
    var childComponents = getChildComponents(components, props);
    if (!childComponents) childComponents = [];    
    let renderedComponents = componentsInThisTemplate
      .concat(childComponents)
      .map((component, i) => {
        let ComponentElem = component.renderer;
        return (
          <ComponentElem key={i} />
        )
      })
    return (
      <Form inline>
        {renderedComponents}
      </Form>
    )
  } else {
    return (
      <div>
        Component {props.componentId}
      </div>
    )
  }
};

FormLayoutComponentRenderer.contextTypes = {
  store: React.PropTypes.object
};

function registerComponents(dispatch, registerComponent, registerAsChildComponent, componentId, componentsInThisTemplate, componentLinks) {
  if (!FormLayoutComponentRenderer.componentsRegistered) FormLayoutComponentRenderer.componentsRegistered = {};
  if (!FormLayoutComponentRenderer.componentsRegistered[componentId]) {
    componentsInThisTemplate.forEach((component) => dispatch(registerComponent(component)));
    componentLinks.forEach((link) => dispatch(registerAsChildComponent(link.parentId, link.childId)));
    FormLayoutComponentRenderer.componentsRegistered[componentId] = true;
  }
}

function createComponentMetadata(formControls, dispatch, registerComponent, registerAsChildComponent, componentId) {
  const componentsInThisTemplate = [];
  const componentLinks = [];
  Object.keys(formControls).map((key, index) => {
    const childComponentId = componentId + '/' + key;
    componentsInThisTemplate.push({      
        id: childComponentId,
        name: key,
        displayName: key,
        sequence: index,
        active: true,
        childComponentIds: [],
        renderer: formControls[key]
        });
    componentLinks.push({
      parentId: componentId,
      childId: childComponentId,
      sequence: index
    });
  })
  registerComponents(dispatch, registerComponent, registerAsChildComponent, componentId, componentsInThisTemplate, componentLinks);
  return componentsInThisTemplate;
}

function getChildComponents(components, props) {
  var parentComponent = props.componentState[props.componentId];
  return components.filter((component) => parentComponent.childComponentIds.find((childId) => childId === component.id));
}

export default FormLayoutComponentRenderer;