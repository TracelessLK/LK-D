
import React, { Component } from 'react'
import RecentView from "./RecentView";
import Chat from './Chat'
import admin from './images/pan.jpg'
import { Link } from "react-router-dom"
import routes from "../constants/routes"
import style from'./css/recent.css'
import wifi from "./images/Wifi-Error.png"
document.body.className = "left";
class Contact extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected:'recent'
    }
    //this.selectNavigator = this.selectNavigator.bind(this)
  }
  selectNavigator (name) {
    if (this.state.selected) {

    }
  }
  s() {
    ` <div className={style.recent_message}>
        <div className={style.title} style={{backgroundColor: 'rgb(251,251,251)'}}>
          <div >
            通讯录
          </div>
          <div className={style.mail}>
            <div className={style.mail_L1}>
              <div className={style.mail_L2}>
                <img src={admin} className={style.mail_img}/>&nbsp;&nbsp;
                <span className={style.mail_span}>panyu</span>
              </div>
            </div>
          </div>
        </div>
      </div>`
  }
  render() {
    return (
      <div className={style.recent_message}>
        <div className={style.title} style={{backgroundColor: 'rgb(251,251,251)'}}>
         通讯录
        </div>
        <div id="offlineWarning" className={style.Warning}>
          <img height="20" src={wifi} width="20" className={style.Warning_L1}/>
          <div className={style.Warning_L0}>
            &nbsp;&nbsp;网络连接已断开
          </div>
        </div>
        <div id="recent" className={style.recent_L0}>
          <div className={style.mail_L2}>
            <img src={admin} className={style.mail_img}/>&nbsp;&nbsp;
            <span className={style.mail_span}>panyu</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Contact
