import { combineReducers } from 'redux';

import file from './file';
import nodes from './nodes';
import visibilityFilter from './visibilityFilter';

const reducer = combineReducers({
  file,
  nodes,
  visibilityFilter
});

export default reducer;
