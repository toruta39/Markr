import { combineReducers } from 'redux';

import meta from './meta';
import preview from './preview';
import annotations from './annotations';
import sourceData from './sourceData';
import sourceNodeFilter from './sourceNodeFilter';

const reducer = combineReducers({
  meta,
  preview,
  annotations,
  sourceData,
  sourceNodeFilter
});

export default reducer;
