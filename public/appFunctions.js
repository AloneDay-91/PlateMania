const { ipcRenderer } = require('electron');
const ipc = ipcRenderer

minimizeBtn.addEventListener('click', () => {
    ipc.send('minimizeApp')
})

maxResBtn.addEventListener('click', () => {
    ipc.send('maxResBtn')
})

closeBtn.addEventListener('click', () => {
    ipc.send('closeApp')
})