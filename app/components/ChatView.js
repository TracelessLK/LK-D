import React, {Component} from 'react'
import style from './css/chat.css'
import admin from "./images/pan.jpg"
import loader from "./images/ajax-loader.gif"
import store from '../store'
import {getchatSelect} from '../store/actionCreator'
import chatYL from "./images/chat-y-l.png"
import chatWR from "./images/chat-w-r.png"
const { engine } = require('@lk/LK-C')
const chatManager = engine.ChatManager
const Application = engine.Application
const lkApp = Application.getCurrentApp()
class ChatView extends Component {
 constructor(props) {
   super(props)
   this.state = store.getState()
   store.subscribe(()=>this.setState(store.getState()))
 }
 componentDidMount(){
  this.getChatContent()
 }
 getChatContent = async()=> {
   console.log(123)
   // const user = lkApp.getCurrentUser()
   // const id = this.props.location.query.id
   // const msgAry = await chatManager.getAllMsg({
   //   userId: user.id,
   //   chatId: id,
   // })
   // console.log({msgAry})
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
            <span id="loader" className={style.chat_message_L2_0}>没有更多信息</span>
            <div style={{width: '100%', flex: '1 1 0%', overflowX: 'hidden', overflowY: 'auto', paddingTop: '10px', visibility:'visible'}} id="records" >
              <div style={{marginTop:10,fontSize:11,textAlign:'center',width:'100%',color: '#a0a0a0'}} >4月26日 10:08</div>
              <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'flex-start',width: '100%',marginTop: '10px',marginBottom: '10px'}}>
                  <img src={admin} style={{cursor: 'pointer',marginLeft:'10px',marginRight:'5px',width:'40px',height:'40px',borderRadius: '4px'}}/>
                  <div style={{color:'rgb(128,128,128)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap',width:'80px',height:'18px',marginLeft: '15px',marginTop: '0px',float:'left'}}>test</div>
                  <div style = {{width:'11px',height:'18px',backgroundImage: `url(${chatYL})`,marginTop: '31px',marginLeft:'-95px'}}/>
                  <div style={{marginTop: '20px',maxWidth:'300px',minHeight:'40px',borderRadius: '5px',overflowWrap: 'break-word',overflow: 'hidden',padding: '12px 10px',backgroundColor: '#f9e160'}}>😪</div>
              </div>
              <div style={{display: 'flex',backgroundColor: 'rgb(243,243,243)',flexDirection: 'row',justifyContent: 'flex-end',alignItems: 'flex-start',width: '100%',marginTop: '10px',marginBottom: '10px'}}>
                <img id="msgStateImg" src={loader} style={{marginTop: '1%',display: 'none',width:'20px',height:'20px'}} />
                  <div style={{border:'0px solid red'}}>
                    <div style={{maxWidth:'300px',minHeight:'40px',borderRadius: '5px',overflowWrap: 'break-word',overflow: 'hidden',padding: '12px 10px',backgroundColor: '#ffffff'}}>已停用</div>
                    <div id="msgState" style={{color: 'rgb(155,155,155)',fontWeight: 'bold',border:'red 0px solid',width: '70px',height: '20px',cursor: 'pointer'}}>全部已读</div>
                  </div>
                    <div style={{width:'11px',height:'18px',backgroundImage: `url(${chatWR})`,marginTop:'11px'}}/>
                    <img src={admin} style={{marginLeft:'5px',marginRight:'10px',width:'40px',height:'40px',borderRadius: '0px'}} />
              </div>
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

            <div style={{width: '100%',height:'150px',display: 'flex'}}>
              <div className={style.chat_message_L4_0} contentEditable="true"/>
            </div>
          </div>
          <div id="msgStateDetailBox"style={{display:'none',height:'100%',width:'150px',borderLeft: '1px solid #d0d0d0',padding: '10px'}}>

          </div>
        </div>

      </div>
    )
  }
}

export default ChatView
