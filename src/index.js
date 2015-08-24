'use strict';

const nRequire = require; // for requiring packages from node env

import 'babel/polyfill';
import uuid from 'uuid';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import getImageData from './util/getImageData';


import reducer from './reducer';
import App from './container/App';

let store = createStore(reducer, {
  nodes: [
    {
      name: 'first',
      selected: false
    },
    {
      name: 'second',
      selected: true
    }
  ],
  visibilityFilter: 'SHOW_ALL'
});

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  document.getElementById('app')
);

import { addNode, resetNodes } from './actions';

const id = uuid.v1();

let holder = document.getElementById('holder');
let status = document.getElementById('status');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

holder.ondragover = function (e) {
  e.preventDefault();
};

holder.ondragleave = holder.ondragend = function (e) {
  e.preventDefault();
};

holder.ondrop = function (e) {
  e.preventDefault();
  e.stopPropagation();

  let file = e.dataTransfer.files[0];
  console.log('File you dragged here is', file.path);

  status.innerText = 'Loading';
  nRequire('psd').open(file.path).then(function(psd) {
    console.log(psd.tree().export());

    status.innerText = 'Converting to PNG';
    return psd.image.saveAsPng(`./.tmp/${id}.png`);
  }).then(function() {
    status.innerText = '';
    return new Promise(function(resolve, reject) {
      let img = new Image();
      img.onload = function() {
        resolve(getImageData(this));
      };
      img.onerror = function(e) {
        reject(e);
      };
      img.src = `./.tmp/${id}.png`;
    });
  }).then(function(imageData) {
    ctx.putImageData(imageData, 0, 0);
  });

  return false;
};
