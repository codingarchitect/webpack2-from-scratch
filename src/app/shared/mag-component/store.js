// ------------------------------------
// Constants
// ------------------------------------
export const REGISTER_COMPONENT = 'REGISTER_COMPONENT'
export const DEACTIVATE_COMPONENT = 'DEACTIVATE_COMPONENT'
export const REGISTER_AS_CHILD_COMPONENT = 'REGISTER_AS_CHILD_COMPONENT'
export const DEACTIVATE_CHILD_COMPONENT = 'DEACTIVATE_CHILD_COMPONENT'

// ------------------------------------
// Action Creators
// ------------------------------------
export function registerComponent(metadata) {
  return {
    type: REGISTER_COMPONENT,
    payload: metadata
  }
}
export function deactivateComponent(id) {
  return {
    type: DEACTIVATE_COMPONENT,
    payload: id
  }
}
export function registerAsChildComponent(parentId, childId) {
  return {
    type: REGISTER_AS_CHILD_COMPONENT,
    payload: { parentId, childId }
  }
}
export function deactivateChildComponent(parentId, childId) {
  return {
    type: DEACTIVATE_CHILD_COMPONENT,
    payload: { parentId, childId }
  }
}
export const actionCreators = {
  registerComponent,
  deactivateComponent,
  registerAsChildComponent,
  deactivateChildComponent
}

// ------------------------------------
// Reducer
// ------------------------------------
function componentExists(state, id) {
  const componentId = Object.keys(state).find(key => key === id)
  return componentId ? true : false
}

const childComponentIds = (state, action) => {
  switch (action.type) {
    case REGISTER_AS_CHILD_COMPONENT:
      return [ ...state, action.payload.childId ]
    case DEACTIVATE_CHILD_COMPONENT:
      return state.filter(componentId => componentId !== action.payload.childId)
    default:
      return state
  }
}

const component = (state, action) => {
  switch (action.type) {
    case REGISTER_COMPONENT:
      return {
        ...action.payload,        
        active: true,
        childComponentIds: action.payload.childComponentIds || []
      }
    case DEACTIVATE_COMPONENT:
      return {
        ...action.payload, 
        active: false
      }
    case REGISTER_AS_CHILD_COMPONENT:
    case DEACTIVATE_CHILD_COMPONENT:
      return {
        ...state,
        childComponentIds: childComponentIds(state.childComponentIds, action)
      }
    default:
      return state
  }
}

export default function componentReducer(state = {}, action) {
  if (!action.payload) return state;
  const id = action.payload.id || action.payload.parentId
  if (typeof id === 'undefined') {    
    return state
  }
  const componentAlreadyExists = componentExists(state, id)
  if (componentAlreadyExists && action.type === REGISTER_COMPONENT) return state  
  if (!componentAlreadyExists && action.type !== REGISTER_COMPONENT) return state
  return {
    ...state,
    [id]: component(state[id], action)
  }
}

// Component metadata registration helpers
function requireAllComponents(r) { 
  var components = [];
  r.keys().forEach((key) => {
    const componentModule = r(key);
    const componentMetadata = componentModule.componentMetadata;
    if (componentMetadata) {
      components.push(componentMetadata);
    }
    else {
      console.error(`A component must export a constant componentMetadata.`)
    }
  });
  return components;
}

export function registerAllComponents(store, path) {
  debugger;
  const components = requireAllComponents(require.context(path, true, /\component.js$/));
  components.forEach((component) => {
    store.dispatch(registerComponent(component));
  })
}

function requireAllComponentLinks(r) { 
  var componentLinks = [];
  r.keys().forEach((key) => {
    const componentLinkModule = r(key);
    const componentLinkMetadata = componentLinkModule.componentLinkMetadata;
    if (componentLinkMetadata) {
      componentLinks.push(componentLinkMetadata);
    }
    else {
      console.error(`A component link must export a constant componentLinkMetadata.`);
    }
  });
  return componentLinks;
}

export function registerAllComponentLinks(store, path) {
  const componentLinks = requireAllComponentLinks(require.context(path, true, /\component-link.js$/));
  componentLinks.forEach((componentLink) => {
    store.dispatch(registerAsChildComponent(
      componentLink.parentId, 
      componentLink.childId))
  });
}