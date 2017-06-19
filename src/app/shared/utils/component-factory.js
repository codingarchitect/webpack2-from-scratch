import { injectReducer } from 'shared/store/reducer';

export default function createComponent(reactComponent, store, reducerKey, reducer) {
  injectReducer(store, { key: reducerKey, reducer });
  return reactComponent;
}
