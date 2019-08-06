import React, { Component } from 'react'
import style from './css/recent.css'
import admin from "./images/1024x1024.png"
import sjx from "./images/sjx.png"
import GroupAvatar from "./GroupAvatar"
const { engine } = require('@lk/LK-C')
const Application = engine.Application
const lkApp = Application.getCurrentApp()

class RecentList extends Component {
  constructor(props) {
    super(props)
    this.user = lkApp.getCurrentUser()
    const { MessageCeiling, activeTime, avatar, chatName, focus, id, isGroup, memberCount, msgContent, newMsgNum, ownerUserId, reserve1, senderUid, state} = this.props.data
    this.MessageCeiling = MessageCeiling
    this.activeTime = this.chatTime(activeTime)
    this.avatar = avatar
    this.chatName = chatName
    this.focus = focus
    this.id = id
    this.isGroup = isGroup
    this.memberCount = memberCount
    this.msgContent = msgContent
    this.newMsgNum = newMsgNum
    this.ownerUserId = ownerUserId
    this.reserve1 = reserve1
    this.senderUid = senderUid
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
    }else {
      imgMapObj.push(admin)
    }
    this.imgMapObj = imgMapObj
    this.state = {
      imgMapObj
    }
  }

  chatTime = (activeTime)=> {
    let timeStr = '';
    const now = new Date();
    if (activeTime) {
      const date = new Date();
      date.setTime(activeTime);
      if (now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth() && now.getDate() === date.getDate()) {
        timeStr += "今天 ";
        timeStr += date.getHours() + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
      } else if (now.getFullYear() === date.getFullYear()) {
        if (date.getDate() === now.getDate() - 1) {
          timeStr += "昨天 ";
        } else {
          timeStr += date.getFullYear() + '/' + (date.getMonth() + 1) + "/" + date.getDate() + "";
        }
      }
    }
    return timeStr
  }
  componentDidMount() {
    this.chatStart()
  }
  chatStart = ()=> {

  }
  render() {
    return (
      <div className={style.recent_L1}>
        <div className={style.recent_L2}/>
        {/*<img src={this.imgMapObj} className={style.recent_L3}/>&nbsp;&nbsp;*/}
        {this.imgMapObj.length > 1 ?<GroupAvatar imgMapObj = {this.imgMapObj} /> : <img src={this.imgMapObj} className={style.recent_L3}/> }&nbsp;&nbsp;
        <div className={style.react_L4}>
          <div className={style.react_L5}>
            <span title="收到消息会弹出窗口">{focus === 1 ? '⭐' : ''}</span>
            {this.chatName}
          </div>
          <div className={style.react_L6}>{this.activeTime}</div>
          <div className={style.react_L7}>{this.msgContent}</div>
        </div>
        {this.MessageCeiling ? <img src={sjx} className={style.react_L8}/> : ''}
      </div>
    )
  }
}

export default RecentList
