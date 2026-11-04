const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('rpDesktop', {
  save: (opts) => ipcRenderer.invoke('rp:save', opts),
  open: () => ipcRenderer.invoke('rp:open'),
  pdf: (opts) => ipcRenderer.invoke('rp:pdf', opts)
});
