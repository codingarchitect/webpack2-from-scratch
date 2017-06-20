import { injectReducer } from '../store/reducer';
import dynamicLoader from './component-loader';

export default function createComponent(componentCreationParams) {
  injectReducer(componentCreationParams.store, componentCreationParams.pageReducer);
  dynamicLoader.loadComponents(null, componentCreationParams.contexts.component);
  dynamicLoader.loadComponentLinks(null, componentCreationParams.contexts.link);
  return componentCreationParams.pageComponent;
}
