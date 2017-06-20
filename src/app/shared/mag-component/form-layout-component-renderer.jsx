import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { registerComponent, registerAsChildComponent } from './store';

function registerComponents(
  dispatch, componentId, componentsInThisTemplate, componentLinks, renderer) {
  if (!renderer.componentsRegistered) {
    renderer.componentsRegistered = {}; // eslint-disable-line
  }
  if (!renderer.componentsRegistered[componentId]) {
    componentsInThisTemplate
      .forEach(component => dispatch(registerComponent(component)));
    componentLinks
      .forEach(link => dispatch(registerAsChildComponent(link.parentId, link.childId)));
    renderer.componentsRegistered[componentId] = true; // eslint-disable-line
  }
}

function createComponentMetadata(formControls, dispatch, componentId, renderer) {
  const componentsInThisTemplate = [];
  const componentLinks = [];
  Object.keys(formControls).map((key, index) => { // eslint-disable-line
    const childComponentId = `${componentId}/${key}`;
    componentsInThisTemplate.push({
      id: childComponentId,
      name: key,
      displayName: key,
      sequence: index,
      active: true,
      childComponentIds: [],
      renderer: formControls[key],
    });
    componentLinks.push({
      parentId: componentId,
      childId: childComponentId,
      sequence: index,
    });
  });
  registerComponents(dispatch, componentId, componentsInThisTemplate, componentLinks, renderer);
  return componentsInThisTemplate;
}

function getChildComponents(components, props) {
  const parentComponent = props.componentState[props.componentId];
  return components.filter(
    component => parentComponent.childComponentIds.find(childId => childId === component.id),
  );
}

function FormLayoutComponentRenderer(props, context) {
  const components = Object.values(context.store.getState().components);
  if (props.componentState && props.componentId) {
    const componentsInThisTemplate = createComponentMetadata(
      props.formControls,
      props.dispatch,
      props.componentId,
      FormLayoutComponentRenderer);
    let childComponents = getChildComponents(components, props);
    if (!childComponents) childComponents = [];
    const renderedComponents = componentsInThisTemplate
      // .concat(childComponents)
      .map((component) => {
        const ComponentElem = component.renderer;
        return (
          <ComponentElem key={component.id} />
        );
      });
    return (
      <Form inline>
        {renderedComponents}
      </Form>
    );
  }
  return (
    <div>
        Component {props.componentId}
    </div>
  );
}

FormLayoutComponentRenderer.contextTypes = {
  store: PropTypes.object,
};


FormLayoutComponentRenderer.propTypes = {
  componentState: PropTypes.object.isRequired, // eslint-disable-line
  formControls: PropTypes.object.isRequired, // eslint-disable-line
  dispatch: PropTypes.any.isRequired, // eslint-disable-line
  componentId: PropTypes.string.isRequired,
};

export default FormLayoutComponentRenderer;
