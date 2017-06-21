import { injectReducer } from '../store/reducer';
import dynamicLoader from './component-loader';
import { registerComponent } from './store/actions';

export default function createPageComponent(pageCreationParams) {
  const store = pageCreationParams.store;
  const contexts = pageCreationParams.contexts;
  const metadata = pageCreationParams.pageComponent;
  store.dispatch(registerComponent(metadata));
  injectReducer(store, pageCreationParams.pageReducer);
  dynamicLoader.loadComponents(store, contexts.component);
  dynamicLoader.loadComponentLinks(store, contexts.link);
  return metadata.renderer;
}
