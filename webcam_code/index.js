const { app, BrowserWindow, Menu } = require('electron')

require("electron-reload")(__dirname)

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })
  Menu.setApplicationMenu(null)
  //   win.webContents.openDevTools()
  win.maximize()
  win.loadFile('./main.html')
}

app.whenReady().then(() => {
  createWindow()
})
