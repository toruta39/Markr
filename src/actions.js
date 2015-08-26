const nRequire = require; // for requiring packages from node env
const psd = nRequire('psd');
const ipc = nRequire('ipc');
const fs = nRequire('fs');

import uuid from 'uuid';

/*
 * action types
 */

export const OPEN_FILE = 'OPEN_FILE';
export const SET_FILE_PSD_INSTANCE = 'SET_FILE_PSD_INSTANCE';
export const SET_FILE_HIERARCHY = 'SET_FILE_HIERARCHY';
export const SET_FILE_PREVIEW = 'SET_FILE_PREVIEW';
export const SELECT_NODE = 'SELECT_NODE';
export const EXPORT_NODE_AS_IMAGE = 'EXPORT_NODE_AS_IMAGE';
export const EXPORT_NODE_AS_IMAGE_SUCCESS = 'EXPORT_NODE_AS_IMAGE_SUCCESS';
export const EXPORT_NODE_AS_IMAGE_ERROR = 'EXPORT_NODE_AS_IMAGE_ERROR';
export const RESET_HIERARCHY = 'RESET_HIERARCHY';
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
    const id = uuid.v1();
    const imgPath = `./.tmp/${id}.png`;

    psd.open(file.path).then(function(psd) {
      dispatch(setFilePsdInstance(psd));
      dispatch(setFileHierarchy(psd.tree().export()));
      return psd.image.saveAsPng(imgPath);
    }).then(function() {
      dispatch(setFilePreview(imgPath));
    }).catch(function(err) {
      console.error('psd error', err);
    });

    dispatch({ type: OPEN_FILE, id });
  }
}

export function setFilePsdInstance(psd) {
  return { type: SET_FILE_PSD_INSTANCE, psd };
}

export function setFileHierarchy(tree) {
  return { type: SET_FILE_HIERARCHY, tree };
}

export function setFilePreview(imgPath) {
  return { type: SET_FILE_PREVIEW, imgPath };
}

export function selectNode(index) {
  return { type: SELECT_NODE, index };
}

export function exportNodeAsImage(index) {
  return (dispatch, getState) => {
    const state = getState();
    let psdNode = state.file.psdInstance.tree().descendants()[index];

    let path = ipc.sendSync('application:select-directory', 'ping');

    psdNode.layer.image.saveAsPng(`${path}/${psdNode.name}.png`)
    .then(() => dispatch({ type: EXPORT_NODE_AS_IMAGE_SUCCESS }))
    .catch(() => dispatch({ type: EXPORT_NODE_AS_IMAGE_ERROR }));

    dispatch({ type: EXPORT_NODE_AS_IMAGE, index });
  }
}

export function resetHierarchy(hierarchy) {
  return { type: RESET_HIERARCHY, hierarchy };
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}
