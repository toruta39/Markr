const nRequire = require; // for requiring packages from node env
const psd = nRequire('psd');
const ipc = nRequire('ipc');
const fs = nRequire('fs');
const os = nRequire('os');
const path = nRequire('path');

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
export const RESET_NODES = 'RESET_NODES';

export const SET_SOURCE_NODE_FILTER = 'SET_SOURCE_NODE_FILTER';

/*
 * other constants
 */

export const SourceNodeFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_LAYER_NODE: 'SHOW_LAYER_NODE',
  SHOW_TEXT_NODE: 'SHOW_TEXT_NODE'
};

/*
 * action creators
 */

export function openFile(file) {
  return dispatch => {
    const TMPDIR = os.tmpdir();
    const id = uuid.v1();
    const imgPath = `${TMPDIR}/${id}.png`;

    psd.open(file.path).then(function(psd) {
      dispatch(setFilePsdInstance(psd));
      dispatch(setFileHierarchy(psd.tree().export()));
      return psd.image.saveAsPng(imgPath);
    }).then(function() {
      dispatch(setFilePreview(imgPath));
    }).catch(function(err) {
      console.error('psd error', err);
    });

    dispatch({
      type: OPEN_FILE,
      id,
      filename: path.basename(file.path, '.psd')
    });
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

export function resetNodes() {
  return { type: RESET_NODES };
}

export function setSourceNodeFilter(filter) {
  return { type: SET_SOURCE_NODE_FILTER, filter };
}
