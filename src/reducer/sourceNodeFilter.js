import { SET_SOURCE_NODE_FILTER, SourceNodeFilters } from '../actions';

export default function sourceNodeFilter(state=SourceNodeFilters.SHOW_ALL, action) {
  switch (action.type) {
    case SET_SOURCE_NODE_FILTER:
      return action.filter;
    default:
      return state;
  }
}
