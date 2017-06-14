import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import * as eventfinder from '../actions/eventfinder.js'

import Header from './Header'
import Homepage from '../container/Homepage'

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
          <Homepage />
        </div>
      </Router>
    )
  }
}
