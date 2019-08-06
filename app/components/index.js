
import React, { Component } from 'react'
import Recent from "./Recent";
import Register from './Register'
import Main from './Main'
const { engine } = require('@lk/LK-C')
const Application = engine.Application
const db = require('../../store/ElecSqlite');
const LKApplication = engine.Application;


document.body.className = "left";
class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
    this.userId = []
    //this.selectNavigator = this.selectNavigator.bind(this)
  }
  componentDidMount() {
    this.start()
  }
  start = async () => {
    await LKApplication.getCurrentApp()
      .start(db, LKApplication.PLATFORM_ELECTRON)
    engine.UserManager.asyGetAll()
      .then(async (users) => {
        if (users && users.length > 0) {
          const cur = users[0];
          this.userId = cur.id
          try {
            LKApplication.getCurrentApp()
              .setCurrentUser(cur);
          } catch (err) {
            console.log({ err })
          }
          this.setState({
            content: <Main/>
          })
        } else {
          this.setState({
            content: <Register/>
          })
        }
      })
      .catch((err) => {
        alert(err)
      })
  }


  render() {
    return (
      <div className="content">
        {this.state.content}
      </div>
    )
  }
}

export default Index
