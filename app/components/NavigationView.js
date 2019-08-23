import React, { Component } from 'react'
import RecentView from "./RecentView"
import ChatView from './ChatView'
import headPortrait from './images/1024x1024.png'
import { Link, Route, Redirect } from 'react-router-dom'
import ContactView from "./ContactView"

const { engine } = require('@lk/LK-C')
const Application = engine.Application
const lkApp = Application.getCurrentApp()
import store from '../store'
import { getchatSelect, getselectNavigator } from '../store/actionCreator'

class NavigationView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: '#f9e160'
    }
    this.user = lkApp.getCurrentUser()
    this.selectName = ''
  }

  componentDidMount() {
    this.selectNavigator('recent')
  }

  selectNavigator(name) {
    if (this.selectName) {
      this.refs[this.selectName].style.color = '#d0d0d0'
    }
    this.selectName = name
    this.refs[name].style.color = '#f9e160'
    if (name === 'recent') {
      this.setState({
        selected: <RecentView/>
      })
    } else if (name === 'contact') {
      this.setState({
        selected: <ContactView/>
      })
    } else if (name === 'mine') {
      this.setState({
        selected: <RecentView/>
      })
    }
  }

  render() {
    return (
      <div className="content">
        <div className='main'>
          {this.state.selected}
          {/*<Route path='/RecentView'  component={RecentView}/>*/}
          {/*<Route path='/ContactView/:id'  component={ContactView}/>*/}
          {/*<RecentView/>*/}
          {/*<ChatView/>*/}
        </div>
        <div className='navigator'>
          <div className="message_img">
            <div className='message_L0'>
            </div>
            <img src={this.user.pic ? this.user.pic : headPortrait} id='userimg' className="message_L1"/>&nbsp;
          </div>
          <div className='message_body'>
            <div className='message_body_L0'/>
            {/*<Link style={{textDecoration:'none',color:'rgb(208,208,208)'}} to='/RecentView'>chat_bubble_outline</Link>*/}
            <i ref="recent" className="material-icons message_body_L1"
               onClick={this.selectNavigator.bind(this, 'recent')}>chat_bubble_outline</i>
          </div>
          <div style={{ width: '50px' }}/>
          <div className='message_body'>
            <div className='message_body_L2'/>
            {/*<Link style={{textDecoration:'none',color:'rgb(208,208,208)'}} to={'/ContactView/'+123}>toc</Link>*/}
            <i ref="contact" className="material-icons message_body_L1"
               onClick={this.selectNavigator.bind(this, 'contact')}>toc</i>
          </div>
          <div style={{ width: '50px' }}/>
          <div className='message_body'>
            <div className='message_body_L2'/>
            {/*<Link style={{textDecoration:'none',color:'rgb(208,208,208)'}} to='/RecentView'>person_outline</Link>*/}
            <i ref="mine" className="material-icons message_body_L1"
               onClick={this.selectNavigator.bind(this, 'mine')}>person_outline</i>
          </div>
          <div style={{ flex: 1 }}/>
        </div>
      </div>
    )
  }
}

export default NavigationView
