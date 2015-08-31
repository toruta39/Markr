import './index.scss';

import 'babel/polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import getImageData from './util/getImageData';
import configureStore from './store/configureStore';

import App from './container/App';

let store = configureStore();

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  document.getElementById('app')
);
