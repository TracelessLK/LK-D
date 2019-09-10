
import React, { Component } from 'react'
import admin from './images/1024x1024.png'
import {Switch,Route,NavLink,Redirect,withRouter} from  'react-router-dom'
import routes from "../constants/routes"
import style from'./css/recent.css'
import wifi from "./images/Wifi-Error.png"
const {engine} = require('@lk/LK-C')
import ContactItem from './ContactItem'
const Application = engine.Application
const lkApp = Application.getCurrentApp()
const ContactManager = engine.ContactManager
const OrgManager = engine.OrgManager
class MyDetailsView extends React.Component {
  constructor (props) {
    super(props)
    this.user = lkApp.getCurrentUser()
    this.state = {
      selected:'recent'
    }
  }
  componentDidMount() {


  }

  render() {
    return (
      <div className={style.content}>
        <div style={{position: 'absolute',right:'20%',top:'80px'}}><img style={{width:'70px',height:'70px',borderRadius:'4px'}} src={this.user.pic || admin} id="pic"/>
        </div>
        <div style={{position: 'absolute',left:'20%',top:'100px',fontFamily: 'Times New Roman', fontSize: '20px',fontWeight:'bold',width: '230px',height: '70px'}} id="name">{this.user.name}</div>
        <div style={{position: 'absolute',left:'20%',top:'180px',right:'90px'}}>
          <hr style={{height:'1px',border:'none',borderTop:'1px solid #d0d0d0'}}/>
        </div>
        <div style={{position: 'absolute',left:'20%',top:'200px',width: '430px',height: '40px'}}>
          <span style={{color: '#a0a0a0',fontWeight: 'bold'}}>版&nbsp;&nbsp;&nbsp;&nbsp;本&nbsp;&nbsp;&nbsp;&nbsp;号: </span>
          <span id="version" style={{paddingLeft: '10px'}}>{this.user.deviceId}</span><br/><br/>
          <span style={{color: '#a0a0a0',fontWeight: 'bold'}}>内核版本号: </span>
          <span id="versionCore" style={{paddingLeft: '10px'}}>{this.user.deviceId}</span><br/><br/>
          <span style={{color: '#a0a0a0',fontWeight: 'bold'}}>标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;识: </span>
          <span id="id" style={{paddingLeft: '10px'}}>{this.user.id}</span><br/><br/>
          <span style={{color: '#a0a0a0',fontWeight: 'bold'}}>设&nbsp;备&nbsp;标&nbsp;&nbsp;识: </span>
          <span id="deviceId" style={{paddingLeft: '10px'}}>{this.user.deviceId}</span><br/><br/>
        </div>
          <button style={{width:'300px',height:'40px',borderRadius: '5px',textAlign: 'center',border: '1px solid #d0d0d0',lineHeight: '40px',marginTop: '20%',marginLeft: '20%',cursor: 'pointer',backgroundColor: '#f0f0f0'}}>
            清除聊天缓存
          </button>
          <button id="upgrade-btn" disabled={true} style={{width:'300px',height:'40px',borderRadius: '5px',textAlign: 'center',border: '1px solid #d0d0d0',lineHeight: '30px',marginTop: '35%',marginLeft: '20%',cursor: 'pointer',backgroundColor: '#f0f0f0'}} >
            升级到最新 <span style={{color:'red'}} id="upgrade-tip"></span>
          </button>
          <button style={{width:'300px',height:'40px',borderRadius: '5px',textAlign: 'center',border: '1px solid #d0d0d0',lineHeight: '40px',marginTop: '45%',cursor: 'pointer',marginLeft: '20%',backgroundColor: '#f0f0f0'}} >
            重&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置
          </button>
      </div>
    )
  }
}

export default MyDetailsView;
