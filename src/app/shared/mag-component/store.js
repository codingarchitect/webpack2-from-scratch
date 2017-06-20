// ------------------------------------
// Constants
// ------------------------------------
export const REGISTER_COMPONENT = 'REGISTER_COMPONENT';
export const DEACTIVATE_COMPONENT = 'DEACTIVATE_COMPONENT';
export const REGISTER_AS_CHILD_COMPONENT = 'REGISTER_AS_CHILD_COMPONENT';
export const DEACTIVATE_CHILD_COMPONENT = 'DEACTIVATE_CHILD_COMPONENT';

// ------------------------------------
// Action Creators
// ------------------------------------
export function registerComponent(metadata) {
  return {
    type: REGISTER_COMPONENT,
    payload: metadata,
  };
}
export function deactivateComponent(id) {
  return {
    type: DEACTIVATE_COMPONENT,
    payload: id,
  };
}
export function registerAsChildComponent(parentId, childId) {
  return {
    type: REGISTER_AS_CHILD_COMPONENT,
    payload: { parentId, childId },
  };
}
export function deactivateChildComponent(parentId, childId) {
  return {
    type: DEACTIVATE_CHILD_COMPONENT,
    payload: { parentId, childId },
  };
}
export const actionCreators = {
  registerComponent,
  deactivateComponent,
  registerAsChildComponent,
  deactivateChildComponent,
};

// ------------------------------------
// Reducer
// ------------------------------------
function componentExists(state, id) {
  const componentId = Object.keys(state).find(key => key === id);
  return !!componentId;
}

const childComponentIds = (state, action) => {
  const childComponentId = state.find(componentId => componentId === action.payload.childId);
  if (childComponentId) return state;
  switch (action.type) {
    case REGISTER_AS_CHILD_COMPONENT:
      return [...state, action.payload.childId];
    case DEACTIVATE_CHILD_COMPONENT:
      return state.filter(componentId => componentId !== action.payload.childId);
    default:
      return state;
  }
};

const component = (state, action) => {
  switch (action.type) {
    case REGISTER_COMPONENT:
      return {
        ...action.payload,
        active: true,
        childComponentIds: action.payload.childComponentIds || [],
      };
    case DEACTIVATE_COMPONENT:
      return {
        ...action.payload,
        active: false,
      };
    case REGISTER_AS_CHILD_COMPONENT:
    case DEACTIVATE_CHILD_COMPONENT:
      return {
        ...state,
        childComponentIds: childComponentIds(state.childComponentIds, action),
      };
    default:
      return state;
  }
};

export default function componentReducer(state = {}, action) {
  if (!action.payload) return state;
  const id = action.payload.id || action.payload.parentId;
  if (typeof id === 'undefined') {
    return state;
  }
  const componentAlreadyExists = componentExists(state, id);
  if (componentAlreadyExists && action.type === REGISTER_COMPONENT) return state;
  if (!componentAlreadyExists && action.type !== REGISTER_COMPONENT) return state;
  return {
    ...state,
    [id]: component(state[id], action),
  };
}
