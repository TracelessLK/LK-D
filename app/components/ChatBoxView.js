import React, { Component } from 'react'
import style from "./css/chat.css"
const {clipboard} = require('electron')

class ChatBoxView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  pasteImg = ()=> {
    const img = clipboard.readImage()
    if (!img.isEmpty()) {
      const html = `<img width=\"${img.getSize().width / 2}\" height=\"${img.getSize().height / 2}\" src=\"${img.toDataURL()}\">`
      document.execCommand("insertHTML", false, html)
    }
  }
  paste = async ()=> {
    if ((event.metaKey || event.ctrlKey) && event.keyCode === 67) {
      event.preventDefault()
      document.execCommand("copy")
    }else if ((event.metaKey || event.ctrlKey) && event.keyCode === 90) {
      document.execCommand("undo")
    }else if ((event.metaKey || event.ctrlKey) && event.keyCode === 86) {
      event.preventDefault()
      const text = clipboard.readText()
      if (text) {
        document.execCommand("insertText", false, text)
      }else {
        this.pasteImg()
      }
    }else if (event.keyCode === 13) {
      event.preventDefault()
      const imgReg = /(<img.*?>)/ig// img为分割
      const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i
      const widthReg = /width=[\'\"]?([^\'\"]*)[\'\"]?/i
      const heightReg = /height=[\'\"]?([^\'\"]*)[\'\"]?/i
      // const srcReg = /src=[\"\'](.*)[\"\']/ig
      // const widthReg = /width=[\"\'](.*)[\"\']/ig
      // const heightReg = /height=[\"\'](.*)[\"\']/ig
      const wrapTagStartReg = /<[div|br].*?>/ig// 折行标签开始部分替换成换行符
      // 匹配非折行标签
      const notWrapTagReg = /<(?![div|br]).*?>/ig
      const ss = this.refs['ChatBox'].innerHTML.split(imgReg)
      ss.forEach((p) => {
        // alert(p);
        if (p.startsWith("<img")) {
          const srcStr = p.match(srcReg)
          let data
          let width
          let height
          if (srcStr) {
             data = srcStr[1].split(',')[1]
          }
          const widthStr = p.match(widthReg)
          if (widthStr[1]) {
             width = parseInt(widthStr[1])
          }
          const heightStr = p.match(heightReg)
          if (heightStr[1]) {
             height = parseInt(heightStr[1])
          }
          if (data) {
            data = data.substring(data.indexOf(",") + 1)
            //window.parent.sendImg(data, width, height)
            this.props.sendImg(data, width, height)
          }
        } else {
          const s = p.replace(notWrapTagReg, "").replace(wrapTagStartReg, "\r\n").trim()
          if (s) {
           this.props.sendText(s)
          }
        }
      })
      this.refs['ChatBox'].innerHTML=''
    }
  }

  render() {
    return (
        <div ref='ChatBox' contentEditable="true" onKeyDown={this.paste} style={{width:'100%',height:'100%',outline:'none',overflow: 'scroll'}}/>
    )
  }
}

export default ChatBoxView
