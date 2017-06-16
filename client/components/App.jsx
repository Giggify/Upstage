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
          <a href="/auth">Log in</a>
          <Route exact path='/search' component={Homepage} />
          <Route exact path='/events/:id' component={EventsList} />
        </div>
      </Router>
    )
  }
}
