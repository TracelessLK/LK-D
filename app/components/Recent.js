import React, {Component} from 'react'
import style from'./css/recent.css'
import wifi from './images/Wifi-Error.png'
import RecentList from './Recent_List'

document.body.className = 'left'
const name = 123
export default class Recent extends Component {
  render() {
    function start() {
      const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      return num.map((item, index) => {
        return <RecentList key={index} data={item}/>
      })
    }

    return (
      <div className={style.recent_message}>
        <div className={style.title} style={{backgroundColor: 'rgb(251,251,251)'}}>
          <div className={style.search}>
            <input className={style.kuan} id="searchID" placeholder="搜索" type="search"/>
          </div>
        </div>
        <div id="offlineWarning" className={style.Warning}>
          <img height="20" src={wifi} width="20" className={style.Warning_L1}/>
          <div className={style.Warning_L0}>
            &nbsp;&nbsp;网络连接已断开
          </div>
        </div>
        <div id="recent" className={style.recent_L0}>
          {start()}
        </div>
      </div>
    )
  }
}


