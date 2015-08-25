import { OPEN_FILE, SET_FILE_HIERARCHY, SET_FILE_PREVIEW, SELECT_NODE } from '../actions';

const initialState = {
  isLoadingHierarchy: false,
  isLoadingFilePreview: false,
  previewImgPath: null,
  selectedNodeIndex: -1
};

export default function file(state=initialState, action) {
  switch (action.type) {
    case OPEN_FILE:
      return {
        ...state,
        isLoadingHierarchy: true,
        isLoadingFilePreview: true
      };
    case SET_FILE_HIERARCHY:
      return {
        ...state,
        isLoadingHierarchy: false
      };
    case SET_FILE_PREVIEW:
      return {
        ...state,
        isLoadingFilePreview: false,
        previewImgPath: action.imgPath
      };
    case SELECT_NODE:
      return {
        ...state,
        selectedNodeIndex: action.index
      };
    default:
      return state;
  }
}
