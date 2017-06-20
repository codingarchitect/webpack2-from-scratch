import { registerComponent, registerAsChildComponent } from './store';

const requireAll = context => context.keys().map(context);

const loadComponents = (store, context) => {
  const componentModules = requireAll(context);
  const components = [];
  componentModules.forEach((componentModule) => {
    const componentMetadata = componentModule.componentMetadata;
    if (componentMetadata) {
      components.push(componentMetadata);
      debugger // eslint-disable-line
      store.dispatch(registerComponent(componentMetadata));
    } else {
      console.error('A component must export a constant componentMetadata.');
    }
  });
  return components;
};

const loadComponentLinks = (store, context) => {
  const componentLinks = [];
  const componentLinkModules = requireAll(context);
  componentLinkModules.forEach((componentLinkModule) => {
    const componentLinkMetadata = componentLinkModule.componentLinkMetadata;
    if (componentLinkMetadata) {
      componentLinks.push(componentLinkMetadata);
      store.dispatch(
        registerAsChildComponent(componentLinkMetadata.parentId, componentLinkMetadata.childId));
    } else {
      console.error('A componentLink must export a constant componentLinkMetadata.');
    }
  });
  return componentLinks;
};

export default { loadComponents, loadComponentLinks };
