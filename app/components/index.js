
import React, { Component } from 'react'
import Recent from "./Recent";
import Chat from './Chat'
import admin from './images/pan.jpg'
import Home from './Home'
import Counter from './Counter'


import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import Contact from "./Contact"

import routes from "../constants/routes"
document.body.className = "left";
class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected:'recent'
    }
    //this.selectNavigator = this.selectNavigator.bind(this)
  }
  selectNavigator (name) {
    if (this.state.selected) {

    }
  }
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
            <img src={admin} id ='userimg'  className="message_L1"/>&nbsp;
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
            <i id="recent" className="material-icons message_body_L1"onClick={(name)=> this.selectNavigator('mine')}>person_outline</i>
          </div>
          <div style={{flex:1}}/>
        </div>
      </div>
    )
  }
}

export default Index
