
const path = require("path");
const fs = require('fs');
const sqlite3 = require("../asars/sqlite3.asar");

const { dbFilePath } = require('../config')

//const dbName = engine.getApplication().getCurrentApp().getName() || "default";

const db = new sqlite3.cached.Database(dbFilePath)

const ensureDirs = function (rootPath, dir) {
  const dirs = dir.split('/');
  let p = rootPath;
  for (let i = 0; i < dirs.length; i++) {
    p += "/" + dirs[i];
    if (!fs.existsSync(p)) {
      fs.mkdirSync(p);
    }
  }
}

db.saveFile = function (filePath, fileName, data, param) {
  return new Promise((resolve, reject) => {
    const dir = path.join(__dirname, filePath);
    const createFile = function () {
      const url = dir + "/" + fileName;
      fs.writeFile(url, data, 'base64', (err) => {
        if (!err) {
          resolve({ url, param })
        } else {
          reject(err)
        }
      })
    }
    ensureDirs(__dirname, filePath);
    createFile();
  });
}

function deleteFolder(p) {
  let files = [];
  if (fs.existsSync(p)) {
    files = fs.readdirSync(p);
    files.forEach((file) => {
      const curPath = path.join(p, file);
      if (fs.statSync(curPath).isDirectory()) {
        deleteFolder(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    try {
      fs.rmdirSync(p);
    } catch (e) {

    }
  }
}

db.removeAllAttachment = function () {
  const userId = engine.getApplication().getCurrentApp().getCurrentUser().id;
  deleteFolder(path.join(__dirname, userId));
}

db.readFile = function (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'base64', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    });
  })
}

module.exports = db;
