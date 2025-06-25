const { app, BrowserWindow, ipcMain, dialog, Tray, Menu, globalShortcut } = require('electron');
const path = require('path');
const Store = require('electron-store');
const localShortcut = require('electron-localshortcut');
const fs = require('fs');

const store = new Store();
let win, tray;

function createWindow () {
  win = new BrowserWindow({
    width: 500,
    height: 650,
    transparent: true,
    frame: false,
    resizable: true,
    alwaysOnTop: true,
    show: false,
    title: 'Microsoft Update',
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join('renderer', 'index.html'));

  // hover IPC
  ipcMain.on('hover', (_e, inside)=>{
    if (inside){
      win.setOpacity(1);
      win.setIgnoreMouseEvents(false);
    }else{
      win.setOpacity(0);
      win.setIgnoreMouseEvents(true, {forward: true});
    }
  });
}

app.whenReady().then(()=>{
  createWindow();

  tray = new Tray(path.join(__dirname, 'icon.png'));
  tray.setToolTip('Stealthed Reader');
  tray.on('double-click', ()=> win.show());
  const context = Menu.buildFromTemplate([
    { label: '打开文件', click: ()=> win.webContents.send('open-file') },
    { label: '偏好设置', click: ()=> win.webContents.send('open-settings') },
    { type: 'separator'},
    { label: '退出', click: ()=> app.quit() }
  ]);
  tray.setContextMenu(context);

  globalShortcut.register('Ctrl+Alt+Q', ()=>{
    if (win.isVisible()){ win.hide(); } else { win.show(); }
  });
});

// File open dialog handler
ipcMain.handle('dialog:openFile', async ()=>{
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name:'Text', extensions:['txt'] }]
  });
  if (canceled) return null;
  return filePaths[0];
});

// read file handler uses fileManager module
ipcMain.handle('read-file', async (_e, filePath)=>{
  const { readTxt } = require('./src/modules/fileManager');
  return await readTxt(filePath, store);
});

// store get/set
ipcMain.handle('store-get', (_e, key, defValue)=> store.get(key, defValue));
ipcMain.handle('store-set', (_e, key, value)=> store.set(key, value));

app.on('window-all-closed', ()=>{
  if (process.platform !== 'darwin') app.quit();
});
