import React, { Component } from 'react'
import os from 'os'
import { Link } from 'react-router-dom'
import qr from 'qr-image'
import routes from '../constants/routes'
import style from './css/register.css'
import ws from 'ws'


export default class Register extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      msg: '扫码授权',
      port: 0,
      min: 2000,
      max: 9999,
      svg: '',
      ary: [1, 2],
      value: {
        code: "LK",
        action: "authorize",
      }
    }
  }

  componentDidMount() {
    const data = {}
    data.code = "LK"
    data.action = "authorize"
    data.addresses = this.getIPAdress()
    data.port = this.randomPort()
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
      this.setState({
        port: 1
      })
      const port = this.state.port
      return ws.Server({ port })
    } catch (e) {
      console.info(e)
      return this.newServer()
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
