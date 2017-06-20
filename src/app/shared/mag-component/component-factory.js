import { injectReducer } from '../store/reducer';
import dynamicLoader from './component-loader';
import { registerComponent } from './store';

export default function createComponent(componentCreationParams) {
  const store = componentCreationParams.store;
  const contexts = componentCreationParams.contexts;
  const metadata = componentCreationParams.pageComponent;
  store.dispatch(registerComponent(metadata));
  injectReducer(store, componentCreationParams.pageReducer);
  dynamicLoader.loadComponents(store, contexts.component);
  dynamicLoader.loadComponentLinks(store, contexts.link);
  return metadata.renderer;
}
