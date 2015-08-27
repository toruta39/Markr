import { OPEN_FILE, SET_FILE_PREVIEW } from '../actions';

const initialState = {
  loading: false,
  imgPath: null
};

export default function preview(state=initialState, action) {
  switch (action.type) {
    case OPEN_FILE:
      return {
        ...state,
        loading: true,
      };
    case SET_FILE_PREVIEW:
      return {
        ...state,
        loading: false,
        imgPath: action.imgPath
      };
    default:
      return state;
  }
}
