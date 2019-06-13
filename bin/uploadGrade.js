const fs = require('fs')
const path = require('path')
const node_ssh = require('node-ssh')
const ssh = new node_ssh()

function upgrade() {
    const unversionedPath = path.resolve(__dirname, '../config/unversioned.js')
    // console.log(unversionedPath)
    if(fs.existsSync(unversionedPath)){
        // console.log("文件存在")
        const unversioned = require('../config/unversioned')
        const { host, username, password } = unversioned
        ssh.connect({
            host,
            username,
            port: 22,
            password
        })
        .then(function() {
            const localFilePath = path.resolve(__dirname, '../upgrade.json')
            // console.log(localFilePath)
            ssh.putFile(localFilePath, '/opt/testing/LK-S/static/other/upgrade.json').then(function() {
                console.log("The File thing is done")
            }, function(error) {
                console.log("Something's wrong")
                console.log(error)
            })
        })
    }else{
        console.log("文件不存在")
    }
}

module.exports = upgrade()
