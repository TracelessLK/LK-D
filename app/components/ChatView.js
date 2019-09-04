import React, {Component} from 'react'
import style from './css/chat.css'
import admin from "./images/pan.jpg"
import loader from "./images/ajax-loader.gif"
import store from '../store'
import ChatBoxView from './ChatBoxView'
import {getchatSelect} from '../store/actionCreator'
import chatYL from "./images/chat-y-l.png"
import chatWR from "./images/chat-w-r.png"
import ChatItem from './ChatItem'
const { engine } = require('@lk/LK-C')
const chatManager = engine.ChatManager
const Application = engine.Application
const lkApp = Application.getCurrentApp()


class ChatView extends Component {
 constructor(props) {
   super(props)
   this.state = store.getState()
   store.subscribe(()=>{
     const {id} = store.getState()
     const param = {chatId:id}
     this.setState(store.getState())
     this.getChatContent({param})
   })
 }
 componentDidMount(){
   this.setState({
     display:'none'
   })
   chatManager.on('msgListChange', this.getChatContent)
 }
  componentWillUnmount() {
    this.setState = () => {}
    chatManager.un('msgListChange', this.getChatContent)
  }
   sendText = (text)=> {
     const channel = lkApp.getLKWSChannel()
     channel.sendText(this.state.id, text, '', this.state.isGroup)

  }

   sendImg = (data, width, height)=> {
     const channel = lkApp.getLKWSChannel()
    let d = {data: data, width: width, height: height}
    channel.sendImage(this.state.id, data, width, height, '', this.state.isGroup)
  }

  getChatContent = async({param})=> {
   const {chatId}  = param
   const user = lkApp.getCurrentUser()
   const msgAry = await chatManager.getAllMsg({
     userId: user.id,
     chatId: chatId,
   })
   let lastSpTime
   let now = new Date()
   const chatList = msgAry.map((item,index)=>{
     let lastitem = []
     if (lastSpTime && item.sendTime - lastSpTime > 10 * 60 * 1000 || !lastSpTime) {
       lastSpTime = item.sendTime
       if (lastSpTime) {
         let timeStr = ""
         let date = new Date()
         date.setTime(lastSpTime)
         if (now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth() && now.getDate() === date.getDate()) {
           timeStr += "今天 "
         } else if (now.getFullYear() === date.getFullYear()) {
           timeStr += (date.getMonth() + 1) + "月" + date.getDate() + "日 "
         }
         timeStr += date.getHours() + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
         lastitem.push(timeStr)
       }
     }
     return <ChatItem key={index} {...item} {...this.state}  lastitem={lastitem} msgStateDetailBox={this.msgStateDetailBox}/>
   })

   this.setState({
     ChatItem:chatList
   })
   const {scrollHeight} = this.refs.records
    console.log({scrollHeight})
   this.refs.records.scrollTop = scrollHeight
 }
  msgStateDetailBox = (all)=> {
    const user = lkApp.getCurrentUser()
     const  Box = all.map((item)=>{
       if (item.id !== user.id) {
         return <div style={{width:'100%',display: 'flex'}} key={item.contactId} ><div style={{width:'70%',overflow:'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap'}}>{item.name}</div><div style={{width:'30%'}}>{item.state ? '已读':'未读'}</div></div>
       }
     })
    this.setState({
      Box,
      display:'block'
    })
  }
 ismsgStateDetailBox = ()=>{
   this.setState({display:'none'})
 }
 render() {
   // const {chatName,id,memberCount} =this.props.location.query
     const {chatName,id,memberCount} =this.state
    return (
      <div style={{width: '100%',height: '100%',display: 'flex',flexDirection: 'column',justifyContent: 'flex-end',alignItems: 'center',fontSize:'10pt'}}>
        <div className={style.title_l0} style={{backgroundColor:'rgb(242,242,243)'}} >
          <span id="title">{chatName}</span>
          <span style={{color:'#c0c0c0',margin: '0 10px',fontWeight: 'bold',fontSize: '0.9em'}} id="count">{memberCount!==1?`(${memberCount})`:''}</span>
          <i className={['material-icons',style.left].join(' ')}>more_horiz</i>
        </div>
        <div id="GroupMembers" className={style.chat_message_L1}>
        </div>
        <div className={style.chat_message_L2}>
          <div style={{backgroundColor: 'rgb(243,243,243)',flex:1,display: 'flex',height:'100%',flexDirection: 'column',justifyContent: 'flex-end',alignItems: 'center'}}>
            <span id="loader" style={{display:'none'}} className={style.chat_message_L2_0}>没有更多信息</span>
            <div ref="records" style={{width: '100%',height:'100%',  overflowX: 'hidden', overflowY: 'auto', paddingTop: '10px', visibility:'visible'}} onClick={this.ismsgStateDetailBox} >
              {this.state.ChatItem}
            </div>
            <div id="rem" className={style.chat_message_L2_2}>
              {/*<div id="remind">*/}
                {/*<div id="2a5659fe-11c7-4ed6-b859-52bb7f9dc402"*/}
                     {/*onMouseOver="hover('2a5659fe-11c7-4ed6-b859-52bb7f9dc402')"*/}
                     {/*onMouseOut="leave('2a5659fe-11c7-4ed6-b859-52bb7f9dc402')"*/}
                     {/*style="border:0px red solid;flex:1;display: flex;width: 100%;margin-left: 0px;margin-top: 7px;align-items: center;">*/}
                  {/*<img src="../images/ai.png" style="width:30px;margin-left: 5px;height:30px;border-radius:5px;"*/}
                       {/*name="所有人">*/}
                    {/*<div id="remind"*/}
                         {/*style="border: 0px red solid; width: 100px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">所有人&nbsp;</div>*/}
                {/*</div>*/}
              {/*</div>*/}
            </div>
            <div id="face" className={style.face} style={{display: 'none'}}>
              {/*<div id="face-content" className="face-content">*/}
                {/*<span>😀</span><span>😁</span><span>😂</span><span>🤣</span><span>😃</span><span>😄</span><span>😅</span><span>😆</span><span>😉</span><span>😊</span><span>😋</span><span>😎</span><span>😍</span><span>😘</span><span>😗</span><span>😙</span><span>😚</span><span>🙂</span><span>🤗</span><span>🤔</span><span>😐</span><span>😑</span><span>😶</span><span>🙄</span><span>😏</span><span>😣</span><span>😥</span><span>😮</span><span>🤐</span><span>😯</span><span>😪</span><span>😫</span><span>😴</span><span>😌</span><span>😛</span><span>😜</span><span>😝</span><span>🤤</span><span>😒</span><span>😓</span><span>😔</span><span>😕</span><span>🙃</span><span>🤑</span><span>😲</span><span>🙁</span><span>😖</span><span>😞</span><span>😟</span><span>😤</span><span>😢</span><span>😭</span><span>😦</span><span>😧</span><span>😨</span><span>😩</span><span>😬</span><span>😰</span><span>😱</span><span>😳</span><span>😵</span><span>😡</span><span>😠</span><span>😷</span><span>🤒</span><span>🤕</span><span>🤢</span><span>🤧</span><span>😇</span><span>🤠</span><span>🤥</span><span>🤓</span><span>😈</span><span>👿</span><span>🤡</span><span>👹</span><span>👺</span><span>💀</span><span>☠</span><span>👻</span><span>👽</span><span>👾</span><span>🤖</span><span>💩</span><span>😺</span><span>😸</span><span>😹</span><span>😻</span><span>😼</span><span>😽</span>*/}
              {/*</div>*/}
              {/*<div style="width:100%;height:12px;position: absolute;bottom:2px;left:5px">*/}
                {/*<div style="background-image: url(../images/bottom-arrow.png);width:27px;height:12px"></div>*/}
              {/*</div>*/}
            </div>
            <div className={style.chat_message_L3}>
              <i className={['material-icons',style.chat_message_L3_0].join(' ')}>
                tag_faces
              </i>
            </div>

            <div style={{width: '100%',height:'250px',display: 'flex'}}>
              <ChatBoxView sendText={this.sendText} sendImg={this.sendImg}/>
            </div>
          </div>
          <div id="msgStateDetailBox"style={{display:`${this.state.display}`,height:'100%',width:'150px',borderLeft: '1px solid #d0d0d0',padding: '10px'}}>
            {this.state.Box}
          </div>
        </div>

      </div>
    )
  }
}

export default ChatView
