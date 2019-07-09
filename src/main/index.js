const electron = require('electron')
const path = require('path')

const { app, BrowserWindow, globalShortcut } = electron
const CommonUtil = require('../util/Common')

const rootDir = path.resolve(__dirname, '../..')

function createWindow () {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  if (CommonUtil.isDev) {
    win.loadURL('http://localhost:3000')
    win.webContents.openDevTools({
      mode: 'bottom'
    })
    process.on('unhandledRejection', err => {
      throw err;
    })
    globalShortcut.register('CommandOrControl+D', () => {
      win.webContents.toggleDevTools()
    })
  } else {
    win.loadFile(path.resolve(rootDir, 'build/index.html'))
    process.on('unhandledRejection', err => {
      //todo: log error and report
    });
    process.on('uncaughtException', err=>{
      //todo: log error and report
    })
  }
}

app.on('ready', createWindow)
