import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import Header from './Header'
import Homepage from '../container/Homepage'

import NavBar from './NavBar'

import EventsList from './EventsList'


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
          <Header />
          <Route exact={true} path='/' component={ NavBar }/>
          <Route exact path='/' component={Homepage} />
          <Route path='/events' component={EventsList} />
        </div>
      </Router>
    )
  }
}
