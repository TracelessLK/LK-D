const electron = require('electron')
const contextMenu = require('electron-context-menu')

// Module to control application life.
const { app } = electron
// Module to create native browser window.
const { BrowserWindow } = electron
const ipc = require('electron').ipcMain
const fse = require('fs-extra')

const path = require('path')
const url = require('url')
const fs = require('fs')
const { nativeImage } = require('electron')

const { net } = electron
const { dialog } = electron
const originalFs = require('original-fs')

const { globalShortcut } = electron
const pageDir = ''
const packageJSON = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf8'))

const isProduction = __dirname.includes('Resources/app/')
const config = require('./config/index')
const { getGoldenHeight } = require('./util/Independent')

const { minWidth, minHeight, checkUpdateTimeout } = config

contextMenu({
  labels: {
    cut: '剪切',
    copy: '复制',
    paste: '粘贴',
    save: '保存',
    copyLink: '复制链接',
    copyImageAddress: '复制图片地址',
    inspect: 'inspect'
  },
  showInspectElement: !isProduction
})

function isDev () {
  const getFromEnv = parseInt(process.env.ELECTRON_IS_DEV) === 1
  const isEnvSet = 'ELECTRON_IS_DEV' in process.env
  return isEnvSet ? getFromEnv : process.defaultApp || /node_modules[\\/]electron[\\/]/.test(process.execPath)
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  const initialWidth = 1000
  mainWindow = new BrowserWindow({
    width: initialWidth,
    height: getGoldenHeight(initialWidth),
    minWidth,
    minHeight
  })
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, pageDir + '/index/loading.html'),
    protocol: 'file:',
    slashes: true
  }))
  global.mainWindow = mainWindow
  global.appVersion = packageJSON.version

  globalShortcut.register('Control+Alt+I', () => {
    mainWindow.webContents.openDevTools()
  })

  // and load the index.html of the app.
  checkUpdate((hasNew) => {
    if (hasNew) {
      mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, pageDir + '/index/update.html'),
        protocol: 'file:',
        slashes: true
      }))
    } else {
      mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, pageDir + '/index/index.html'),
        protocol: 'file:',
        slashes: true
      }))
    }
  })
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  mainWindow.on('focus', () => {
    mainWindow.webContents.send('mainWindow-focus')
  })
  mainWindow.on('blur', () => {
    mainWindow.webContents.send('mainWindow-blur')
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)
app.on('ready', () => {
  // 注册一个 'CommandOrControl+X' 的全局快捷键
  globalShortcut.register('Control+Alt+A', () => {
    if (!captureBrowser) {
      openCaptureBrowser()
    }
  })
  if (!isProduction) {
    // require('devtron').install()
  }
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
ipc.on('asynchronous-message', () => {
  mainWindow.showInactive()
  // event.sender.send('asynchronous-reply', '666')
})
ipc.on('openFileDialog', (event) => {
  const result = dialog.showOpenDialog({ properties: ['openFile'] })
  if (result && result.length > 0) {
    fs.readFile(result[0], (err, buf) => {
      if (err) {
        console.error(err)
      }
      if (buf) {
        const { data } = buf.toJSON()
        const tmp = result[0].split(/[\\|\/]/ig)

        event.sender.send('openFileDialog-response', { data, name: tmp[tmp.length - 1] })
      }
    })
  }
})

let imageBrowser
ipc.on('openImageBrowser', (event, arg) => {
  global.imageHtml = arg.html
  if (!imageBrowser) {
    imageBrowser = new BrowserWindow()

    imageBrowser.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      imageBrowser = null
    })
  }
  imageBrowser.loadURL(url.format({
    pathname: path.join(__dirname, pageDir + '/recent/showImage.html'),
    protocol: 'file:',
    slashes: true
  }))
  imageBrowser.setSize(arg.width + 100, arg.height + 100)
  imageBrowser.center()
  imageBrowser.setAlwaysOnTop(false)
  imageBrowser.show()
})

let captureBrowser

function openCaptureBrowser () {
  if (!captureBrowser) {
    captureBrowser = new BrowserWindow({
      frame: false,
      modal: true,
      transparent: true,
      show: false,
      width: 0,
      height: 0,
      alwaysOnTop: true
    })
    captureBrowser.on('closed', () => {
      captureBrowser = null
    })
  }
  captureBrowser.loadURL(url.format({
    pathname: path.join(__dirname, pageDir + '/recent/showCapture.html'),
    protocol: 'file:',
    slashes: true
  }))
  // captureBrowser.setFullScreen(true)
}

ipc.on('openCaptureBrowser', () => {
  openCaptureBrowser()
})

ipc.on('showCaptureBrowser', () => {
  captureBrowser.setFullScreen(true)
  captureBrowser.show()
})
ipc.on('closeCaptureBrowser', (event, arg) => {
  if (captureBrowser) {
    captureBrowser.minimize()
    captureBrowser.close()
    captureBrowser = null
    if (arg) {
      mainWindow.webContents.send('capture-complete')
    }
  }
})
if (app.dock) {
  let imagePath
  if (process.env.NODE_ENV === 'development') {
    imagePath = path.join(__dirname, '/images/test.png')
  } else {
    imagePath = path.join(__dirname, '/images/traceless.png')
  }
  const image = nativeImage.createFromPath(imagePath)
  app.dock.setIcon(image)
}

ipc.on('messageReceive', (event, arg) => {
  if (app.dock) {
    if (arg.total) {
      app.dock.setBadge(arg.total + '')
    }
  }
})
ipc.on('messageRead', (event, arg) => {
  if (app.dock) {
    if (arg.total) {
      app.dock.setBadge(arg.total + '')
    } else {
      app.dock.setBadge('')
    }
  }
})
let latestVersion
let files = []

function compareVersion (v1, v2) {
  const v1s = v1.split('.')
  const v2s = v2.split('.')
  for (let i = 0; i < 3; i++) {
    const n1 = parseInt(v1s[i])
    const n2 = parseInt(v2s[i])
    if (n1 > n2) {
      return 1
    } if (n1 === n2) {

    } else {
      return -1
    }
  }
  return 0
}

function checkUpdate (callback) {
  const request = net.request(config.checkUpdateUrl)
  let isResolved = false
  setTimeout(() => {
    if (!isResolved) {
      isResolved = true
      callback(false)
    }
  }, checkUpdateTimeout)

  request.on('response', (response) => {
    let text = ''
    if (response.statusCode === 200) {
      response.on('data', (chunk) => {
        text += chunk
      })
      response.on('end', () => {
        if (!isResolved) {
          isResolved = true
          const des = JSON.parse(text)
          latestVersion = des.version
          if (compareVersion(latestVersion, packageJSON.version) === 1) {
            callback(true)
            const { changeList } = des
            files = ['package.json']
            for (let i = 0; i < changeList.length; i++) {
              const change = changeList[i]
              // var vChange = parseInt(change.version.replace(/\./ig,""))
              if (compareVersion(change.version, packageJSON.version) === 1) {
                const _cfs = change.files
                _cfs.forEach((f) => {
                  if (files.indexOf(f) === -1) {
                    files.push(f)
                  }
                })
              }
            }
          } else {
            callback(false)
          }
        }
      })
    } else if (!isResolved) {
      isResolved = true
      callback(false)
      console.info('check update response.statusCode:' + response.statusCode)
    }
  })
  request.on('error', (err) => {
    if (!isResolved) {
      isResolved = true
      callback(false)
    }
    console.info(err.toString())
  })
  request.end()
}

ipc.on('remoteVersion-request', (event) => {
  checkUpdate(() => {
    event.sender.send('remoteVersion-response', latestVersion || packageJSON.version)
  })
})

ipc.on('upgrade-request', (event, arg) => {
  checkUpdate((hasNew) => {
    if (hasNew) {
      mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, pageDir + '/index/update.html'),
        protocol: 'file:',
        slashes: true
      }))
    } else if (arg.toIndexIFNot !== false) {
      mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, pageDir + '/index/index.html'),
        protocol: 'file:',
        slashes: true
      }))
    }
  })
})
const upgradeMessages = new Map()

ipc.on('start-download', () => {
  download(files)
})

ipc.on('restart', () => {
  app.relaunch()
  app.exit(0)
})

function getUpgradeMessages () {
  let html = ''
  upgradeMessages.forEach((v, k) => {
    html += k + '---------------------' + v + '<br>'
  })
  return html
}

function download (fileAry) {
  const baseURI = 'https://raw.githubusercontent.com/TracelessLK/LK-D/publish/'
  const index = baseURI.length

  let count = 0
  let count2 = 0

  function changeMsg (f, m) {
    upgradeMessages.set(f, m)
    global.upgradeMessage = getUpgradeMessages()
    mainWindow.webContents.executeJavaScript('update()')
  }
  //
  const tmpDir = path.join(__dirname, '_tmp')
  //
  deleteFolder(tmpDir)

  mainWindow.webContents.session.on('will-download', (event, item) => {
    // 设置文件存放位置
    const f = item.getURL().substring(index)
    item.setSavePath(path.join(tmpDir, f))
    item.on('updated', (event2, state) => {
      if (state === 'interrupted') {
        changeMsg(f, 'interrupted')
        if (item.canResume()) {
          item.resume()
        } else {
          changeMsg(f, "interrupted and can't resume")
        }
      } else if (state === 'progressing') {
        if (item.isPaused()) {
          changeMsg(f, 'paused')
        } else {
          changeMsg(f, Math.round((item.getReceivedBytes() / item.getTotalBytes()) * 100) + '%')
        }
      }
    })
    item.once('done', (event2, state) => {
      count++
      if (state === 'completed') {
        count2++
        changeMsg(f, '100%')
      } else {
        changeMsg(f, `Download failed: ${state}`)
      }
      if (count === fileAry.length) {
        if (count2 === count) {
          let targetDir = __dirname
          if (isDev()) {
            targetDir = path.join(__dirname, '_tmp2')

            if (!fs.existsSync(targetDir)) {
              fs.mkdirSync(targetDir)
            }
          }
          copyFiles(tmpDir, targetDir)
          deleteFolder(tmpDir)
        }
        mainWindow.webContents.executeJavaScript('complete()')
      }
    })
  })

  fileAry.forEach((f) => {
    changeMsg(f, 'downloading')
    mainWindow.webContents.downloadURL(baseURI + f)
  })
  if (fileAry.length === 0) {
    mainWindow.webContents.executeJavaScript('complete()')
  }
}

function deleteFolder (p) {
  fse.removeSync(p)
}

function copyFiles (srcDir, targetDir) {
  const fileAry = fs.readdirSync(srcDir)
  fileAry.forEach((file) => {
    const curPath = path.join(srcDir, file)
    const targetPath = path.join(targetDir, file)

    if (fs.statSync(curPath).isDirectory()) { // recurse
      if (curPath.endsWith('.asar')) {
        originalFs.writeFileSync(targetPath, originalFs.readFileSync(curPath))
      } else {
        if (!fs.existsSync(targetPath)) {
          fs.mkdirSync(targetPath)
        }
        copyFiles(curPath, targetPath)
      }
    } else {
      fs.renameSync(curPath, targetPath)
    }
  })
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
