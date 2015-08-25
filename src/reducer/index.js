import { combineReducers } from 'redux';

import fileStatus from './fileStatus';
import nodes from './nodes';
import visibilityFilter from './visibilityFilter';

const reducer = combineReducers({
  fileStatus,
  nodes,
  visibilityFilter
});

export default reducer;
