import React, { Component } from 'react'
import style from './css/recent.css'
import admin from "./images/pan.jpg"
import sjx from "./images/sjx.png"
const { engine } = require('@lk/LK-C')
const Application = engine.Application
const lkApp = Application.getCurrentApp()

class GroupAvatar extends Component {
  constructor(props) {
    super(props)
    this.user = lkApp.getCurrentUser()
    const { imgMapObj} = this.props
    this.state = {
      imgMapObj
    }
  }
  render() {
    const { imgMapObj} = this.props
    const avatarAry = []
    for (let i = 0; i < imgMapObj.length; i++) {
      if (imgMapObj.length === 3) {
        avatarAry.push(<img key={i} style={{marginLeft:imgMapObj[i]===imgMapObj[0]? '10px':'0px'}} src={imgMapObj[i]} className={style.imghtml_L3}/>)
      } else if (imgMapObj.length === 2){
        avatarAry.push(<img key={i} src={imgMapObj[i]} className={style.imghtml_L2}/>)
      }else {
        avatarAry.push(<img key={i} src={imgMapObj[i]} className={style.imghtml_L1}/>)
      }
    }

    return (
      <div className={ style.imghtml}>
      {avatarAry}
      </div>
    )
  }
}

export default GroupAvatar
