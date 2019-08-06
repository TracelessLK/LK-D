import React, { Component } from 'react'
import os from 'os'
import { Link } from 'react-router-dom'
import qr from 'qr-image'
import routes from '../constants/routes'
import style from './css/register.css'
const ws = require('ws')
const UUID = require('uuid/v4')
const { engine } = require('@lk/LK-C')
const RSAKey = require('react-native-rsa')
const LKApplication = engine.Application;
const db = require('../../store/ElecSqlite');

export default class Register extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      msg: '扫码授权',
      min: 2000,
      max: 9999,
      svg: '',
      ary: [1, 2],
      value: {
        code: "LK",
        action: "authorize",
      }
    }
    this.port = 0
  }

  componentDidMount() {
    this.port = this.randomPort()
    const server = new ws.Server({ port: this.port });
    server.on('connection', (ws, req) => {
      ws.on('message', (message) => {
        this.setState({msg:'授权中...'})
        //document.getElementById("msg").innerText = "授权中...";
        const msg = JSON.parse(message);
        const cid = UUID();
        // console.log({msg})
        const {
          deviceId, id, serverPort, serverIP, name
        } = msg
        const lkapp = engine.Application.getCurrentApp()

        const bits = 1024
        const exponent = '10001'
        const rsa = new RSAKey()
        rsa.generate(bits, exponent)
        const publicKey = rsa.getPublicString()
        const privateKey = rsa.getPrivateString()
        const user = {
          id,
          name,
          serverPort,
          serverIP,
          deviceId: cid,
          publicKey,
          privateKey
        }
        lkapp.asyAuthorize(user, deviceId, '').then(() => {
          const data = {};
          data.state = 1;
          data.msg = "授权成功";
          ws.send(JSON.stringify(data));
          this.setState({msg:'授权成功'})
          //document.getElementById("msg").innerText = "授权成功";
          setTimeout(() => {
            server.close();
            window.top.location.reload();
            this.forceUpdate();
          }, 2000)
        }).catch((err) => {
          console.log({ err })
          const { error } = err

          const data = {};
          if (error) {
            data.msg = error.toString();
          } else {
            data.msg = "服务器错误，请联系管理员:" + err;
          }
          data.state = 0;
          ws.send(JSON.stringify(data));
          this.setState({msg:data.msg})
          //document.getElementById("msg").innerText = data.msg;
        })
      })
      ws.on('close', (msg) => {
      })
    });
    server.on('error', (err) => {
      console.info("ws server error:" + err);
    });
    const data = {}
    data.code = "LK"
    data.action = "authorize"
    data.addresses = this.getIPAdress()
    data.port = this.port
    const obj = qr.svgObject(JSON.stringify(data), {
      type: 'svg',
      size: 5
    })
    this.setState({
      svg: obj.path
    })
  }

  randomPort() {
    return Math.floor(Math.random() * (this.state.max - this.state.min + 1) + this.state.min)
  }

   newServer() {
    try {
      this.port = this.randomPort();
      const port = this.port
      const ws = new ws.Server({ port });
      return ws;
    } catch (e) {
      console.info(e);
      return this.newServer();
    }
  }

  getIPAdress() {
    const ips = []
    const interfaces = os.networkInterfaces()
    for (const devName in interfaces) {
      const iface = interfaces[devName]
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i]
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          ips.push(alias.address)
        }
      }
    }
    return ips
  }

  render() {
    const { msg } = this.state
    return (
      <div className={style.container}>
        <div style={{ flex: 1 }}/>
        <svg xmlns="http://www.w3.org/2000/svg" width="195" height="195" viewBox="0 0 39 39">
          <path d={this.state.svg}></path>
        </svg>
        {/*<div dangerouslySetInnerHTML={{__html: this.state.svg}}></div>*/}
        <div className={style.regis}>{msg}</div>
      </div>
    )
  }
}
