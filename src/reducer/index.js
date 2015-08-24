import { combineReducers } from 'redux';

import nodes from './nodes';
import visibilityFilter from './visibilityFilter';

const reducer = combineReducers({
  nodes,
  visibilityFilter
});

export default reducer;
