const path = require('path');
const { app, BrowserWindow, Menu, ipcMain } = require('electron');

// Fix SUID sandbox helper error on Ubuntu 24.04+ / AppArmor restricted Linux systems
if (process.platform === 'linux') {
  app.commandLine.appendSwitch('no-sandbox');
}

const createWindow = () => {
  const win = new BrowserWindow({
    frame: false,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      // Required so preload can expose a small, safe API for window buttons.
      sandbox: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  Menu.setApplicationMenu(null);
  // win.webContents.openDevTools();
  win.maximize();
  win.loadFile(path.join(__dirname, 'main.html'));
};

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

ipcMain.handle('window:minimize', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win?.minimize();
});

ipcMain.handle('window:close', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win?.close();
});

ipcMain.handle('window:toggleMaximize', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win) return false;
  if (win.isMaximized()) win.unmaximize();
  else win.maximize();
  return win.isMaximized();
});

ipcMain.handle('window:isMaximized', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  return Boolean(win?.isMaximized());
});
