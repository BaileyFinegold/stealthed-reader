const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  hover: (inside)=> ipcRenderer.send('hover', inside),
  openFileDialog: ()=> ipcRenderer.invoke('dialog:openFile'),
  readFile: (path)=> ipcRenderer.invoke('read-file', path),
  storeGet: (key, defValue)=> ipcRenderer.invoke('store-get', key, defValue),
  storeSet: (key, value)=> ipcRenderer.invoke('store-set', key, value)
});
