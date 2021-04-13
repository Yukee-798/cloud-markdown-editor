// import installExtension, {
//     REDUX_DEVTOOLS
// } from 'electron-devtools-installer'
// import isDev from 'electron-is-dev';
// import {
//     app,
//     BrowserWindow,
//     ipcMain
// } from 'electron';
// import Store from 'electron-store';


const {
    initIpcMain
} = require('./ipcMain');


const {
    default: installExtension,
    REDUX_DEVTOOLS
} = require('electron-devtools-installer');

const isDev = require('electron-is-dev')
const { app, BrowserWindow } = require('electron');
const Store = require('electron-store');
const store = new Store();

app.on('ready', () => {


    initIpcMain();

    installExtension(REDUX_DEVTOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));

    let mainWindow = new BrowserWindow({
        width: 1024,
        height: 700,

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
        minHeight: 700,
        minWidth: 914
    });



    const urlLocation = isDev ? 'http://localhost:3000' : 'dummyurl';
    mainWindow.loadURL(urlLocation);
})