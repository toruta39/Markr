import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from '../reducer';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  createLogger()
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}
