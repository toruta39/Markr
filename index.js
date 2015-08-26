'use strict';
const app = require('app');
const BrowserWindow = require('browser-window');
const ipc = require('ipc');
const dialog = require('dialog');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

function createMainWindow () {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    resizable: false
  });

  win.loadUrl(`file://${__dirname}/index.html`);
  win.on('closed', onClosed);

  return win;
}

function onClosed() {
  // deref the window
  // for multiple windows store them in an array
  mainWindow = null;
  rimraf('./.tmp', function(err) {
    if (err) console.error(err);
  });
}

// prevent window being GC'd
let mainWindow;

app.on('window-all-closed', function () {
  // TODO: clear temporary files

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate-with-no-open-windows', function () {
  if (!mainWindow) {
    mainWindow = createMainWindow();
  }
});

app.on('ready', function () {
  mkdirp('./.tmp', '0777', function(err) {
    if (err) console.error(err);
  });

  ipc.on('application:select-directory', function(event, arg) {
    console.log(arg);
    event.returnValue = dialog.showOpenDialog({ properties: [ 'createDirectory', 'openDirectory' ]});
  });

  mainWindow = createMainWindow();
});
