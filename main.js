const { app, BrowserWindow } = require('electron')
const express = require('express')
const {engine} = require('express-handlebars')
const path = require('path')

const application = express()
const port = 3000

application.engine('handlebars', engine());
application.set('view engine', 'handlebars');

application.use(express.static(path.join(__dirname, 'views')))
application.use(express.static(path.join(__dirname, 'src')))
application.use(express.static(path.join(__dirname, 'public')))

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
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

// PARTIE EXPRESSJS

application.get('/', (req, res) => {
    res.render('home', {
        title: 'Accueil | PlateMania'
    });
});

application.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).render('Erreur, regarder le terminal !');
});

application.listen(port, () => {
    console.log('Le serveur est lancé ! sur le port' + port)
});