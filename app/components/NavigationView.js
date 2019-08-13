
import React, { Component } from 'react'
import RecentView from "./RecentView";
import ChatView from './ChatView'
import headPortrait from './images/1024x1024.png'
import { Link, Route, Redirect } from 'react-router-dom'
import ContactView from "./ContactView"
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
          <Route path='/' exact component={RecentView}/>
          <Route path='/ContactView/:id'  component={ContactView}/>
          {/*<RecentView/>*/}
          {/*<ChatView/>*/}
        </div>
        <div className='navigator'>
          <div className="message_img">
            <div className='message_L0'>
            </div>
            <img src={this.user.pic ? this.user.pic : headPortrait} id ='userimg'  className="message_L1"/>&nbsp;
          </div>
          <div className='message_body'>
            <div className='message_body_L0'/>
            <i id="recent" className="material-icons message_body_L1"><Link to='/'>chat_bubble_outline</Link></i>
          </div>
          <div style={{width:'50px'}}/>
          <div className='message_body'>
            <div className='message_body_L2'/>
            <i id="recent" className="material-icons message_body_L1"><Link to={'/ContactView/'+123}>toc</Link></i>
          </div>
          <div style={{width:'50px'}}/>
          <div className='message_body'>
            <div className='message_body_L2'/>
            <i id="recent" className="material-icons message_body_L1"><Link to='/'>person_outline</Link></i>
          </div>
          <div style={{flex:1}}/>
        </div>
      </div>
    )
  }
}

export default NavigationView
