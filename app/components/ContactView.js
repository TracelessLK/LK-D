
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
class ContactView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected:'recent'
    }
  }
  componentDidMount() {
    this.asyncRender()
  }

  async asyncRender (name) {
    const user = lkApp.getCurrentUser()
    const orgAry = await OrgManager.asyGetChildren(null, user.id)
    const memberAry = await ContactManager.asyGetAllMembers(user.id)
    const directories = memberAry.map((item) => {
       return <div className={style.mail_L2} id={item.id} key={item.id} onClick={()=>{this.start(item)}}>
                <img src={item.pic || admin } className={style.mail_img}/>&nbsp;&nbsp;
                <span className={style.mail_span}>{item.name}</span>
              </div>
    })
    this.setState({directories})
    this.start(memberAry[0])
  }
  start (data){
    this.props.history.push({pathname:'/',query:data})
  }
  render() {
    return (
      <div className={style.content}>
        <div className={style.recent_message}>
          <div className={style.title} style={{backgroundColor: 'rgb(251,251,251)'}}>
           通讯录
          </div>
          <div id="recent" className={style.recent_L0}>
            {this.state.directories}
          </div>
        </div>
        <div className={style.chatHand}>
          {/*<ContactItem/>*/}
          <Route path='/' exact component={ContactItem}/>
        </div>
      </div>
    )
  }
}

export default withRouter(ContactView);
