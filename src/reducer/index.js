import { combineReducers } from 'redux';

import meta from './meta';
import preview from './preview';
import nodes from './nodes';
import visibilityFilter from './visibilityFilter';

const reducer = combineReducers({
  meta,
  preview,
  nodes,
  visibilityFilter
});

export default reducer;
