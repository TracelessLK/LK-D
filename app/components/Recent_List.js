import React, {Component} from 'react'
import style from './css/recent.css'
import admin from "./images/pan.jpg"
import sjx from "./images/sjx.png"

class RecentList extends Component {
  constructor(props){
    super(props)
    this.state={
      name:'panyu',
      date:'2019/6/26',
      img:'',
      message:'我:1'
    }
    //this.helo = this.helo.bind(this)
  }
  helo(){
    return 123
  }
  render() {
    let {name, date, message,img} = this.state
    return (
      <div className={style.recent_L1}>
        <div className={style.recent_L2}/>
        <img src={admin} className={style.recent_L3}/>&nbsp;&nbsp;
        <div className={style.react_L4}>
          <div className={style.react_L5}>
            <span title="收到消息会弹出窗口">⭐</span>
            {name}
          </div>
          <div className={style.react_L6}>{date}</div>
          <div className={style.react_L7}>{this.helo()}</div>
        </div>
        <img src={sjx} className={style.react_L8}/>
      </div>
    )
  }
}

export default RecentList
