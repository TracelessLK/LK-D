
import React, { Component } from 'react'
import admin from './images/1024x1024.png'
import { Link } from "react-router-dom"
import routes from "../constants/routes"
import style from'./css/recent.css'
import wifi from "./images/Wifi-Error.png"
const {engine} = require('@lk/LK-C')
import ChatView from './ChatView'
const Application = engine.Application
const lkApp = Application.getCurrentApp()
const ContactManager = engine.ContactManager
const OrgManager = engine.OrgManager
class ContactItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected:'recent'
    }
  }
  componentDidMount() {

  }
  render() {
    const {id , pic , name} = this.props.location.query
    return (
          <div style={{width:'100%',backgroundColor: '#f0f0f0',height:'100%',display:'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}>
            <div style={{position: 'absolute',right:'90px',top:'80px'}}>
              <img style={{width:'70px',height:'70px',borderRadius:'5px'}} src={pic || admin} id="pic"/>
            </div>
            <div style={{position: 'absolute',left:'40%',top:'100px', fontSize: '20px',fontWeight:'bold',width: '230px',height: '70px'}} id="name">{name}</div>
            <div style={{position: 'absolute',left:'40%',top:'180px',right:'90px'}}>
              <hr style={{height:'1px',border:'none',borderTop:'1px solid #d0d0d0'}}/>
            </div>
            <div style={{width:'96px',height:'96px',whiteSpace:'nowrap',  textAlign: 'center',lineHeight: '36px',marginTop: '40px'}}>
              <div style={{position: 'absolute',left:'40%',top:'200px',width: '230px',height: '70px'}}>
                <span style={{color: '#a0a0a0',fontWeight: 'bold'}}>标识：</span>
                <span>{id}</span>
              </div>
            </div>
            <div id="members" style={{marginTop: '170px',marginLeft: '-235px'}}/>
            <div style={{width:'300px',height:'40px',borderRadius: '5px',textAlign: 'center',border: '1px solid #d0d0d0',lineHeight: '40px',marginTop: '20px',cursor: 'pointer',backgroundColor: '#f0f0f0'}} >
              <span>发消息</span>
            </div>
            <div style={{height:'50%'}}/>
          </div>
    )
  }
}

export default ContactItem
