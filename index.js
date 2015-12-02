'use strict';
const app = require('electron').app;
const BrowserWindow = require('electron').BrowserWindow;
const ipcMain = require('electron').ipcMain;
const dialog = require('electron').dialog;

// report crashes to the Electron project
require('crash-reporter').start();

function createMainWindow () {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    resizable: true,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden'
  });

  win.loadURL(`file://${__dirname}/index.html`);
  win.on('closed', onClosed);

  return win;
}

function onClosed() {
  // deref the window
  // for multiple windows store them in an array
  mainWindow = null;
}

// prevent window being GC'd
let mainWindow;

app.on('window-all-closed', function () {
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
  ipcMain.on('application:select-directory', function(event, arg) {
    console.log(arg); // DEBUG
    event.returnValue = dialog.showOpenDialog({ properties: [ 'createDirectory', 'openDirectory' ]});
  });

  mainWindow = createMainWindow();
});
