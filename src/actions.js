const nRequire = require; // for requiring packages from node env

import uuid from 'uuid';

/*
 * action types
 */

export const OPEN_FILE = 'OPEN_FILE';
export const SET_FILE_HIERARCHY = 'SET_FILE_HIERARCHY';
export const SET_FILE_PREVIEW = 'SET_FILE_PREVIEW';
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

export function openFile(file) {
  return dispatch => {
    let id = uuid.v1();
    let imgPath = `./.tmp/${id}.png`;

    nRequire('psd').open(file.path).then(function(psd) {
      dispatch(setFileHierarchy(psd.tree().export()));
      return psd.image.saveAsPng(imgPath);
    }).then(function() {
      dispatch(setFilePreview(imgPath));
    }).catch(function(err) {
      console.error('psd error', err);
    });

    dispatch({ type: OPEN_FILE, file });
  }
}

export function setFileHierarchy(tree) {
  return { type: SET_FILE_HIERARCHY, tree };
}

export function setFilePreview(imgPath) {
  return { type: SET_FILE_PREVIEW, imgPath };
}

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
