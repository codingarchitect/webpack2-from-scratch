import * as Actions from './actions';

function componentExists(state, id) {
  const componentId = Object.keys(state).find(key => key === id);
  return !!componentId;
}

const childComponentIds = (state, action) => {
  const childComponentId = state.find(componentId => componentId === action.payload.childId);
  if (childComponentId) return state;
  switch (action.type) {
    case Actions.REGISTER_AS_CHILD_COMPONENT:
      return [...state, action.payload.childId];
    case Actions.DEACTIVATE_CHILD_COMPONENT:
      return state.filter(componentId => componentId !== action.payload.childId);
    default:
      return state;
  }
};

const component = (state, action) => {
  switch (action.type) {
    case Actions.REGISTER_COMPONENT:
      return {
        ...action.payload,
        active: true,
        childComponentIds: action.payload.childComponentIds || [],
      };
    case Actions.DEACTIVATE_COMPONENT:
      return {
        ...action.payload,
        active: false,
      };
    case Actions.REGISTER_AS_CHILD_COMPONENT:
    case Actions.DEACTIVATE_CHILD_COMPONENT:
      return {
        ...state,
        childComponentIds: childComponentIds(state.childComponentIds, action),
      };
    default:
      return state;
  }
};

function overrideConfiguration(state, action) {
  if (action.type !== Actions.OVERRIDE_CONFIGURATION) return state;
  return { ...state, ...action.payload };
}

function handleComponentRegistrationFlows(state, action, id) {
  const componentAlreadyExists = componentExists(state, id);
  if (componentAlreadyExists && action.type === Actions.REGISTER_COMPONENT) return state;
  if (!componentAlreadyExists && action.type !== Actions.REGISTER_COMPONENT) return state;
  return {
    ...state,
    [id]: component(state[id], action),
  };
}

export default function componentReducer(state = {}, action) {
  if (!action.payload) return state;
  if (action.type === Actions.OVERRIDE_CONFIGURATION) return overrideConfiguration(state, action);
  const id = action.payload.id || action.payload.parentId;
  if (typeof id === 'undefined') {
    return state;
  }
  return handleComponentRegistrationFlows(state, action, id);
}
