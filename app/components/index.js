
import React, { Component } from 'react'
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import RecentView from "./RecentView";
import RegisterView from './RegisterView'
import NavigationView from './NavigationView'
const { engine } = require('@lk/LK-C')
const db = require('../../store/ElecSqlite');
const LKApplication = engine.Application;
import ContactView from './ContactView'



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
    await LKApplication.getCurrentApp().start(db, LKApplication.PLATFORM_ELECTRON)
    engine.UserManager.asyGetAll().then(async (users) => {
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
            content: <NavigationView/>
          })
        } else {
          this.setState({
            content: <RegisterView/>
          })
        }
      })
      .catch((err) => {
        alert(err)
      })
  }


  render() {
    return (
      <Router>
        <div className="content">
          {this.state.content}
        </div>
      </Router>

    )
  }
}

export default Index
