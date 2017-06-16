import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import Header from './Header'
import Homepage from '../container/Homepage'
import NavBar from './NavBar'
import EventsList from './EventsList'
import DatePicker from './DatePicker'

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
          <EventsList />
        </div>
      </Router>
    )
  }
}


{/* <a href="/auth">Log in</a>
<Homepage />
</div> */}
