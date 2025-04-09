import { app, BrowserWindow } from 'electron';
import * as path from 'path';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // если нужен preload
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL('http://localhost:3000'); // Vite dev server
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// const isDev = !app.isPackaged;

// function createWindow() {
//   const mainWindow = new BrowserWindow({
//     width: 1000,
//     height: 800,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//     },
//   });

//   if (isDev) {
//     mainWindow.loadURL('http://localhost:5173'); // dev-server от Vite
//   } else {
//     mainWindow.loadFile(path.join(__dirname, '../dist/index.html')); // прод-режим
//   }
// }
