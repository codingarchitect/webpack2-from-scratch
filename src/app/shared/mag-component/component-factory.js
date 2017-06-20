import { injectReducer } from '../store/reducer';
import dynamicLoader from './component-loader';

export default function createComponent(componentCreationParams) {
  const store = componentCreationParams.store;
  const contexts = componentCreationParams.contexts;
  injectReducer(store, componentCreationParams.pageReducer);
  dynamicLoader.loadComponents(store, contexts.component);
  dynamicLoader.loadComponentLinks(store, contexts.link);
  return componentCreationParams.pageComponent.renderer;
}
