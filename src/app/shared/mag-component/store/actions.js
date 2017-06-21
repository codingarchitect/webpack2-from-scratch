export const REGISTER_COMPONENT = 'REGISTER_COMPONENT';
export const DEACTIVATE_COMPONENT = 'DEACTIVATE_COMPONENT';
export const REGISTER_AS_CHILD_COMPONENT = 'REGISTER_AS_CHILD_COMPONENT';
export const DEACTIVATE_CHILD_COMPONENT = 'DEACTIVATE_CHILD_COMPONENT';
export const OVERRIDE_CONFIGURATION = 'OVERRIDE_CONFIGURATION';

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
export function overrideConfig(payload) {
  return {
    type: OVERRIDE_CONFIGURATION,
    payload,
  };
}
