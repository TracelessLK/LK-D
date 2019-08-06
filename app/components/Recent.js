import React, { Component } from 'react'
import style from './css/recent.css'
import wifi from './images/Wifi-Error.png'
import RecentList from './Recent_List'

const { engine } = require('@lk/LK-C')
const Application = engine.Application
const lkApp = Application.getCurrentApp()
const { ChatManager, ContactManager } = engine
const lkapp = engine.Application.getCurrentApp()
const LKApplication = engine.Application;
const db = require('../../store/ElecSqlite');

document.body.className = 'left'
export default class Recent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chatList:[]
    }
  }

  componentDidMount = () => {
    this.chatVibration()
  }
  chatVibration = async () => {
    const user = lkApp.getCurrentUser()
    const chatAry = await ChatManager.getAllChat(user.id)
    chatAry.map((item,index)=>{
      this.setState({chatList:[...this.state.chatList,<RecentList key={index} data={item}/>]})
    })
  }

  render() {
    const {chatList} = this.state
    return (
      <div>
        <div className={style.recent_message}>
          <div className={style.title} style={{ backgroundColor: 'rgb(251,251,251)' }}>
            <div className={style.search}>
              <input className={style.kuan} id="searchID" placeholder="搜索" type="search"/>
            </div>
          </div>
          <div id="offlineWarning" className={style.Warning}>
            <img height="20" src={wifi} width="20" className={style.Warning_L1}/>
            <div className={style.Warning_L0}>
              &nbsp;&nbsp;网络连接已断开
            </div>
          </div>
          <div id="recent" className={style.recent_L0}>
            {chatList}
          </div>
        </div>
      </div>
    )
  }
}


