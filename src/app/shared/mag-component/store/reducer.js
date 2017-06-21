import * as Actions from './actions';

function componentExists(state, id) {
  const componentId = Object.keys(state).find(key => key === id);
  return !!componentId;
}

const childComponentIds = (state, action) => {
  const childComponentId = state.find(componentId => componentId === action.payload.childId);
  if (childComponentId && action.type === Actions.REGISTER_AS_CHILD_COMPONENT) return state;
  switch (action.type) {
    case Actions.REGISTER_AS_CHILD_COMPONENT:
      return [...state, action.payload.childId];
    case Actions.DEACTIVATE_CHILD_COMPONENT:
      return state.filter(componentId => componentId !== action.payload.childId);
    default:
      return state;
  }
};

function handleChildComponentSequenceRegistrationFlows(state, action, childComponentId) {
  let newState;
  switch (action.type) {
    case Actions.REGISTER_AS_CHILD_COMPONENT:
      debugger; // eslint-disable-line
      newState = { ...state };
      newState[childComponentId] = action.payload.sequece || Math.max(Object.values(state)) + 1;
      return newState;
    case Actions.DEACTIVATE_CHILD_COMPONENT:
      newState = { ...state };
      delete newState[childComponentId];
      return newState;
    default:
      return state;
  }
}

const childComponentIdSequences = (state, action) => {
  const childComponentId = state[action.payload.childId];
  if (childComponentId && action.type === Actions.REGISTER_AS_CHILD_COMPONENT) return state;
  if (!childComponentId && action.type === Actions.DEACTIVATE_CHILD_COMPONENT) return state;
  return handleChildComponentSequenceRegistrationFlows(state, action, action.payload.childId);
};

function registerComponentHandler(action) {
  return {
    ...action.payload,
    active: true,
    childComponentIds: action.payload.childComponentIds || [],
    childComponentIdSequences: action.payload.childComponentIdSequences || {},
  };
}

const component = (state, action) => {
  switch (action.type) {
    case Actions.REGISTER_COMPONENT:
      return registerComponentHandler(action);
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
        childComponentIdSequences:
          childComponentIdSequences(state.childComponentIdSequences, action),
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
