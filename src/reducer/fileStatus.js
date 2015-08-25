import { OPEN_FILE, SET_FILE_HIERARCHY, SET_FILE_PREVIEW } from '../actions';

const initialState = {
  isLoadingHierarchy: false,
  isLoadingFilePreview: false
};

export default function fileStatus(state=initialState, action) {
  switch (action.type) {
    case OPEN_FILE:
      return {
        ...state,
        isLoadingHierarchy: true,
        isLoadingFilePreview: true
      }
    case SET_FILE_HIERARCHY:
      return {
        ...state,
        isLoadingHierarchy: false
      };
    case SET_FILE_PREVIEW:
      return {
        ...state,
        isLoadingFilePreview: false
      };
    default:
      return state;
  }
}
