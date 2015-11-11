import './index.scss';

import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import App from './container/App';

let store = configureStore();

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  document.getElementById('container')
);
