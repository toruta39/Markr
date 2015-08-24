/*
 * action types
 */

export const ADD_NODE = 'ADD_NODE';
export const SELECT_NODE = 'SELECT_NODE';
export const RESET_NODES = 'RESET_NODES';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_TEXT_NODE: 'SHOW_TEXT_NODE'
};

/*
 * action creators
 */

export function addNode(name) {
  return { type: ADD_NODE, name };
}

export function selectNode(index) {
  return { type: SELECT_NODE, index };
}

export function resetNodes(nodes) {
  return { type: RESET_NODES, nodes };
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}
