import React, { Component } from 'react'
import style from './css/chat.css'
import admin from "./images/1024x1024.png"
import chatYL from "./images/chat-y-l.png"
import loader from "./images/ajax-loader.gif"
import chatWR from "./images/chat-w-r.png"
const { engine } = require('@lk/LK-C')
const Application = engine.Application
const lkApp = Application.getCurrentApp()
const chatManager = engine.ChatManager
class ChatItem extends Component {
  constructor (props){
    super(props)
    this.msgMaxHeight = 250
    this.msgMaxWidth = 250
  }
  componentDidMount() {
    chatManager.on('msgStateChange', this.getMessageStatus)
  }
  componentWillUnmount() {
    chatManager.un('msgStateChange', this.getMessageStatus)
  }
  getMessage = (option) => {
    let result = null
    if (option.type === chatManager.MESSAGE_TYPE_TEXT) {
      let text = option.content
      text = text.replace(/\r\n/g, "<br>")
      text = text.replace(/\n/g, "<br>")
      result = text
    }else if (option.type === chatManager.MESSAGE_TYPE_IMAGE) {
      let img = JSON.parse(option.content)
      let w = img.width
      let h = img.height
      const ratio = h / w
      let height = h
      if (ratio > 1 && h > this.msgMaxHeight) {
        height = this.msgMaxHeight
      }

      if (ratio < 1 && w > this.msgMaxWidth) {
        height = this.msgMaxWidth * ratio
      }
      result = <img src={img.url} w={w} h={h} height={height}/>
    }else if (option.type === chatManager.MESSAGE_TYPE_FILE) {

    }else if (option.type === chatManager.MESSAGE_TYPE_AUDIO) {
      result = <div style={{display:'flex',justifyContent: 'center', alignItems: 'center'}}><i className='material-icons' style={{color: '#b0b0b0',fontSize: '30px',cursor: 'pointer'}}>mic</i><span>请在移动端收听语音</span></div>
    }
    return result
  }
  /**
   * MESSAGE_STATE_SENDING 消息\状态\发送 0
   * MESSAGE_STATE_SERVER_NOT_RECEIVE 消息\状态\服务器\未接收 1
   * MESSAGE_STATE_SERVER_RECEIVE 消息\状态\服务器\接收 2
   * MESSAGE_STATE_TARGET_RECEIVE 消息\状态\目标\接收 3
   * MESSAGE_STATE_TARGET_READ 消息\状态\目标\已读取 4
   * @param option
   */
  getMessageStatus = ({param})=> {
    const {state} = param
    console.log({param})
      if (state === 0) {
        return <img src={loader} width="18px"height="18px"style={{marginTop: '2px'}}/>
      }else if (state === 1){
        return <sapn style={{color: 'tomato'}}>重发</sapn>
      }else if (state === 2) {
        return '未读'
      }else if (state === 3) {
        return '√'
      }else if (state === 4) {
        return '已读'
      }
  }
  render() {
    const user = lkApp.getCurrentUser()
    const {lastitem,senderName,senderUid,pic,content} = this.props
    return (
      <div>
        <div style={{marginTop:10,fontSize:13,textAlign:'center',width:'100%',color: '#a0a0a0'}} >{lastitem}</div>
        {senderUid !== user.id ?
          <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'flex-start',width: '100%',marginTop: '10px',marginBottom: '10px'}}>
            <img src={pic||admin} style={{cursor: 'pointer',marginLeft:'10px',marginRight:'5px',width:'40px',height:'40px',borderRadius: '4px'}}/>
            <div style={{color:'rgb(128,128,128)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap',width:'80px',height:'18px',marginLeft: '15px',marginTop: '0px',float:'left'}}>{senderName}</div>
            <div style = {{width:'11px',height:'18px',backgroundImage: `url(${chatYL})`,marginTop: '31px',marginLeft:'-95px'}}/>
            <div style={{marginTop: '20px',maxWidth:'300px',minHeight:'40px',borderRadius: '5px',overflowWrap: 'break-word',overflow: 'hidden',padding: '12px 10px',backgroundColor: '#f9e160'}}>{this.getMessage(this.props)}</div>
          </div>
          :
          <div style={{display: 'flex',backgroundColor: 'rgb(243,243,243)',flexDirection: 'row',justifyContent: 'flex-end',alignItems: 'flex-start',width: '100%',marginTop: '10px',marginBottom: '10px'}}>
            {/*<img id="msgStateImg" src={loader} style={{marginTop: '2%',display: 'block',width:'20px',height:'20px'}} />*/}
            <div style={{border:'0px solid red'}}>
              <div style={{maxWidth:'300px',minHeight:'40px',borderRadius: '5px',overflowWrap: 'break-word',overflow: 'hidden',padding: '12px 10px',backgroundColor: '#ffffff'}}>{this.getMessage(this.props)}</div>
              <div ref="msgState" style={{color: 'rgb(155,155,155)',fontWeight: 'bold',border:'red 0px solid',width: '70px',height: '20px',cursor: 'pointer'}}>{this.getMessageStatus({param:this.props})}</div>
            </div>
           <div style={{width:'11px',height:'18px',backgroundImage: `url(${chatWR})`,marginTop:'11px'}}/>
            <img src={pic||admin} style={{marginLeft:'5px',marginRight:'10px',width:'40px',height:'40px',borderRadius: '0px'}} />
          </div>
        }
      </div>
    )
  }
}

export default ChatItem
