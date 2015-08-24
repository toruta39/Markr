/*
 * action types
 */

export const ADD_NODE = 'ADD_NODE';
export const SELECT_NODE = 'SELECT_NODE';
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

export function addNode(text) {
  return { type: ADD_NODE, text };
}

export function selectNode(index) {
  return { type: SELECT_NODE, index };
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}
