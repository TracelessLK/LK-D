import React, {Component} from 'react'
import style from './css/chat.css'
import admin from "./images/pan.jpg"
class ChatView extends Component {

  render() {
    return (
      <div className={style.recent_chat}>
        <div className={style.chat_message}>
          <div className={[style.chat_message_L0,style.title_l0].join(' ')}>
            <span id="title">panyu</span>
            <span className={style.chat_message_L0_0} id='count'>(2)</span>
            <i className={['material-icons',style.left].join(' ')}>more_horiz</i>
          </div>
          <div id='GroupMembers' className={style.chat_message_L1}>
            <div className={style.chat_message_L1_0}>群成员 (1)</div>
            <div className={style.chat_message_L1_1}>
              <img  src={admin} className={style.chat_message_L1_2} />
              <div className={style.chat_message_L1_3}>
                &nbsp;panyu
              </div>
            </div>
          </div>
          <div className={style.chat_message_L2}>
            <span id="loader" className={style.chat_message_L2_0} >没有更多信息</span>
            <div className={style.chat_message_L2_1}></div>
            <div className={style.chat_message_L2_2}>
              <div id="remind">
                <div className={style.chat_message_L2_3}>
                  <img src={admin} className={style.chat_message_L2_4} name="所有人"/>
                  <div className={style.chat_message_L2_5}>所有人&nbsp;</div>
                </div>
              </div>
              {/*<div className='face'>*/}
              {/*<div className='face-content'></div>*/}
              {/*<div className='chat_message_L2_6'>*/}
              {/*<div className='chat_message_L2_7'></div>*/}
              {/*</div>*/}
              {/*</div>*/}
            </div>
          </div>
          <div className={style.chat_message_L3}>
            <i className={['material-icons',style.chat_message_L3_0].join(' ')}>
              tag_faces
            </i>
          </div>
          <div className={style.chat_message_L4}>
            <div className={style.chat_message_L4_0} contentEditable="true"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default ChatView
