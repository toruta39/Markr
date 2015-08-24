import { SET_VISIBILITY_FILTER, VisiblityFilters } from '../actions';

export default function visiblityFilter(state=VisiblityFilters.SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return status;
  }
}
