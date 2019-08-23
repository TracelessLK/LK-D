import React, { Component } from 'react'
import style from './css/recent.css'
import wifi from './images/Wifi-Error.png'
import RecentItem from './RecentItem'
import defaultAvatar from "./images/1024x1024.png"
import ChatView from './ChatView'
import { Link, Route, Redirect } from 'react-router-dom'
const { engine } = require('@lk/LK-C')
const Application = engine.Application
const lkApp = Application.getCurrentApp()
const chatManager = engine.ChatManager


document.body.className = 'left'
export default class RecentView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ary: '',
      chatList: [],
    }
    this.eventAry = ['recentChange']
    this.select = ''
  }

  componentDidMount = () => {
    for (const event of this.eventAry) {
      chatManager.on(event, this.recentMessage)
    }
    this.recentMessage()
  }
  componentWillUnmount() {
    for (const event of this.eventAry) {
      chatManager.un(event, this.recentMessage)
    }
  }
  recentMessage = async () => {
    const user = lkApp.getCurrentUser()
    const chatAry = await chatManager.getAllChat(user.id)
    const chatTop = chatAry[0].id
    let chatList = chatAry.map((item, index) => {
      const { MessageCeiling, activeTime, avatar, chatName, focus, id, isGroup, memberCount, msgContent, newMsgNum, ownerUserId, reserve1, senderUid, state } = item
      const imgMapObj = []
      if (avatar) {
        if (isGroup) {
          for (let eleStr of avatar.split('@sep@')) {
            const ary = eleStr.split('@id@')
            const pic = ary[0]
            imgMapObj.push(pic)
          }
        } else {
          imgMapObj.push(avatar)
        }
      } else {
        imgMapObj.push(defaultAvatar)
      }
      const option = {
        MessageCeiling,
        activeTime: this.chatTime(activeTime),
        avatar: imgMapObj,
        chatName,
        focus,
        id,
        isGroup,
        memberCount,
        msgContent,
        newMsgNum,
        ownerUserId,
        reserve1,
        senderUid,
        state,
        chatTop,
        index

      }
      return <RecentItem key={index} {...option} parentChatSelect={this.parentChatSelect}/>
    })
    this.setState({
      chatList
    })
  }
  parentChatSelect = (data) => {
    console.log(data)

  }
  chatTime = (activeTime) => {
    let timeStr = ''
    const now = new Date()
    if (activeTime) {
      const date = new Date()
      date.setTime(activeTime)
      if (now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth() && now.getDate() === date.getDate()) {
        timeStr += "今天 "
        timeStr += date.getHours() + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
      } else if (now.getFullYear() === date.getFullYear()) {
        if (date.getDate() === now.getDate() - 1) {
          timeStr += "昨天 "
        } else {
          timeStr += date.getFullYear() + '/' + (date.getMonth() + 1) + "/" + date.getDate() + ""
        }
      }
    }
    return timeStr
  }



  render() {
    const { chatList } = this.state
    // jsx, javascript xml
    return (
      <div className={style.content}>
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
        <div className={style.chatHand}>
          <ChatView />
          {/*<Route path='/' exact component={ChatView}/>*/}
        </div>
      </div>
    )
  }
}


