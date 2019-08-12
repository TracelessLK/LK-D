
import React, { Component } from 'react'
import RecentView from "./RecentView";
import ChatView from './ChatView'
import headPortrait from './images/1024x1024.png'
import { Link } from 'react-router-dom';
const { engine } = require('@lk/LK-C')
const Application = engine.Application
const lkApp = Application.getCurrentApp()
document.body.className = "left";
class NavigationView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected:'recent'
    }
    this.user = lkApp.getCurrentUser()
  }
  selectNavigator (name) {
    if (this.state.selected) {

    }
  }
  render() {
    return (
      <div className="content">
        <div className='main'>
          <RecentView/>
          <ChatView/>
        </div>
        <div className='navigator'>
          <div className="message_img">
            <div className='message_L0'>
            </div>
            <img src={this.user.pic ? this.user.pic : headPortrait} id ='userimg'  className="message_L1"/>&nbsp;
          </div>
          <div className='message_body'>
            <div className='message_body_L0'/>
            <i id="recent" className="material-icons message_body_L1" onClick={(name)=> this.selectNavigator('recent')}>chat_bubble_outline</i>
          </div>
          <div style={{width:'50px'}}/>
          <div className='message_body'>
            <div className='message_body_L2'/>
            <i id="recent" className="material-icons message_body_L1">toc</i>
          </div>
          <div style={{width:'50px'}}/>
          <div className='message_body'>
            <div className='message_body_L2'/>
            <i id="recent" className="material-icons message_body_L1"onClick={(name)=> this.selectNavigator('mine')}> <Link to='/counter' replace>person_outline</Link></i>
          </div>
          <div style={{flex:1}}/>
        </div>
      </div>
    )
  }
}

export default NavigationView
