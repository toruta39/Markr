'use strict';

var nRequire = require; // for requiring packages from node env

const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./component/App');

ReactDOM.render(<App />, document.getElementById('app'));

const uuid = require('uuid').v1();

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
    return psd.image.saveAsPng(`./.tmp/${uuid}.png`);
  }).then(function() {
    status.innerText = '';
    return new Promise(function(resolve, reject) {
      let img = new Image();
      img.onload = function() {
        resolve(require('./util/getImageData')(this));
      };
      img.onerror = function(e) {
        reject(e);
      };
      img.src = `./.tmp/${uuid}.png`;
    });
  }).then(function(imageData) {
    ctx.putImageData(imageData, 0, 0);
  });

  return false;
};
