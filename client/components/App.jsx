import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import Header from './Header'
import LoginPage from './LoginPage'
import ErrorLogin from './ErrorLogin'
import Homepage from '../container/Homepage'
import NavBar from './NavBar'
import EventsList from './EventsList'
import Footer from './Footer'


import {getUserInfo} from '../api'
import Drawer from './Drawer'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

  render() {
    return (
      <Router>
        <div className="app-container">
          <Route exact path='/' component={LoginPage} />
          <Route exact path='/' component={Footer} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/login' component={ErrorLogin} />
          <Route exact path='/search' component={Header} />
          <Route exact path='/search' component={Homepage} />
          <Route exact path='/events/:id/:name' component={Header} />
          <Route exact path='/events/:id/:name' component={EventsList} />
        </div>
      </Router>
    )
  }
}
