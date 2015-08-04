'use strict';

var nRequire = require; // used for requiring packages of node env

const ReactDOM = require('react-dom');
const Hierarchy = require('./component/Hierarchy');

ReactDOM.render(<Hierarchy />, document.getElementById('hierarchy'));

const uuid = require('uuid').v1();

let holder = document.getElementById('holder');
let status = document.getElementById('status');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

holder.ondragover = function () {
  return false;
};

holder.ondragleave = holder.ondragend = function () {
  return false;
};

holder.ondrop = function (e) {
  e.preventDefault();
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
