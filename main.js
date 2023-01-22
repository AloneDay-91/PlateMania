const { app, BrowserWindow, Menu, MenuItem, ipcMain } = require('electron')
const path = require('path')
const ipc = ipcMain

function createWindow () {
  const win = new BrowserWindow({
    width: 1650,
    height: 900,
    frame: false,
    transparent: false,
    show: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      spellcheck: true,
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
      enableRemoteModule: true,
    }
  })
  win.loadFile('index.html')

// MININMIZED WINDOW
  ipc.on('minimizeApp', () => {
    console.log('minimizeApp')
    win.minimize()
  })

  // MAXIMIZED RESTORE WINDOW
  ipc.on('maxResBtn', () => {
    if (win.isMaximized()) {
      win.unmaximize()
    } else {
      win.maximize()
    }
  })

  // CLOSE WINDOW
  ipc.on('closeApp', () => {
    console.log('closeApp')
    win.close()
  })
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