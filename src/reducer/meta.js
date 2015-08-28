import { OPEN_FILE, SET_FILE_PSD_INSTANCE } from '../actions';

const initialState = {
  id: null,
  filename: null,
  psd: null
};

export default function meta(state=initialState, action) {
  switch (action.type) {
    case OPEN_FILE:
      return {
        ...state,
        filename: action.filename,
        id: action.id
      };
    case SET_FILE_PSD_INSTANCE:
      return {
        ...state,
        psd: action.psd
      };
    default:
      return state;
  }
}
