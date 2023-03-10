const { app, BrowserWindow, Menu, MenuItem } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 2000,
    height: 1200,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      spellcheck: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Permet le retrait du devtools
const menu = new Menu()
menu.append(new MenuItem({}))
Menu.setApplicationMenu(menu);