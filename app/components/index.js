
import React, { Component } from 'react'
import Recent from "./Recent";
import Chat from './Chat'
import admin from './images/pan.jpg'
document.body.className = "left";
class Index extends React.Component {
  render() {
    return (
      <div className="content">
        <div className='main'>
          <Recent/>
          <Chat/>
        </div>
        <div className='navigator'>
          <div className="message_img">
            <div className='message_L0'>
            </div>
            <img src={admin} id ='userimg' className="message_L1"/>&nbsp;
          </div>
          <div className='message_body'>
            <div className='message_body_L0'/>
            <li id="recent" className="material-icons message_body_L1">chat_bubble_outline</li>
          </div>
          <div style={{width:'50px'}}/>
          <div className='message_body'>
            <div className='message_body_L2'/>
            <li id="recent" className="material-icons message_body_L1">toc</li>
          </div>
          <div style={{width:'50px'}}/>
          <div className='message_body'>
            <div className='message_body_L2'/>
            <li id="recent" className="material-icons message_body_L1">person_outline</li>
          </div>
          <div style={{flex:1}}/>
        </div>
      </div>
    )
  }
}

export default Index
