const { app, BrowserWindow, ipcMain, dialog, shell, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1320, height: 860, minWidth: 900, minHeight: 600,
    title: 'Rancang Perumahan',
    backgroundColor: '#f3f1ec',
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  win.loadFile(path.join(__dirname, 'src', 'index.html'));
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/.test(url)) shell.openExternal(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith('file:')) { e.preventDefault(); shell.openExternal(url); } });
}

const FILTERS = {
  json: [{ name: 'Proyek Rancang Perumahan', extensions: ['json'] }],
  csv: [{ name: 'CSV (pemisah titik koma)', extensions: ['csv'] }]
};

ipcMain.handle('rp:save', async (e, { name, data, kind }) => {
  const win = BrowserWindow.fromWebContents(e.sender);
  const r = await dialog.showSaveDialog(win, { defaultPath: name, filters: FILTERS[kind] || [] });
  if (r.canceled || !r.filePath) return false;
  fs.writeFileSync(r.filePath, Buffer.from(String(data), 'utf8'));
  return true;
});
ipcMain.handle('rp:saveImage', async (e, { name, data }) => {
  const win = BrowserWindow.fromWebContents(e.sender);
  const m = /^data:image\/png;base64,(.+)$/.exec(String(data || '')); if (!m) return false;
  const r = await dialog.showSaveDialog(win, { defaultPath: name, filters: [{ name: 'Gambar PNG', extensions: ['png'] }] });
  if (r.canceled || !r.filePath) return false;
  fs.writeFileSync(r.filePath, Buffer.from(m[1], 'base64'));
  return true;
});
ipcMain.handle('rp:open', async (e) => {
  const win = BrowserWindow.fromWebContents(e.sender);
  const r = await dialog.showOpenDialog(win, { properties: ['openFile'], filters: FILTERS.json });
  if (r.canceled || !r.filePaths[0]) return null;
  return fs.readFileSync(r.filePaths[0], 'utf8');
});
ipcMain.handle('rp:pdf', async (e, { name }) => {
  const win = BrowserWindow.fromWebContents(e.sender);
  const r = await dialog.showSaveDialog(win, { defaultPath: name, filters: [{ name: 'PDF', extensions: ['pdf'] }] });
  if (r.canceled || !r.filePath) return false;
  const data = await win.webContents.printToPDF({ printBackground: true, pageSize: 'A4', margins: { marginType: 'default' } });
  fs.writeFileSync(r.filePath, data);
  return true;
});

app.whenReady().then(() => {
  if (process.platform !== 'darwin') Menu.setApplicationMenu(null);
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
