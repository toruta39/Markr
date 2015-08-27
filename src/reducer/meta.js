import { OPEN_FILE, SET_FILE_HIERARCHY, SET_FILE_PSD_INSTANCE, SET_FILE_PREVIEW, SELECT_NODE } from '../actions';

const initialState = {
  id: null,
  isLoadingHierarchy: false,
  isLoadingFilePreview: false,
  psdInstance: null,
  previewImagePath: null,
  selectedNodeIndex: -1
};

export default function meta(state=initialState, action) {
  switch (action.type) {
    case OPEN_FILE:
      return {
        ...state,
        isLoadingHierarchy: true,
        isLoadingFilePreview: true,
        id: action.id
      };
    case SET_FILE_HIERARCHY:
      return {
        ...state,
        isLoadingHierarchy: false
      };
    case SET_FILE_PSD_INSTANCE:
      return {
        ...state,
        psdInstance: action.psd
      };
    case SET_FILE_PREVIEW:
      return {
        ...state,
        isLoadingFilePreview: false,
        previewImagePath: action.imgPath
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
