import React from 'react'

import {getUserInfo} from '../api'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      image: ''
    }
  }
  componentWillMount() {
    var cookie = document.cookie
    if (cookie.length < 1) {
      window.location.assign('http://localhost:3000/#/login')
    }
    else {
      getUserInfo(cookie || null)
      .then((result) => {
        this.setState({user: result.id, image: result.image})
      })
    }
  }
  render() {
    return (
      <div className='header'>
        <img className="headerlogo" src="./images/TITLE.png" width="15%" height="3%"/>
        <div className="spotifydetails">
          <img className='spotifyimage' src={this.state.image}/>
          <a className='spotifyusername' href="/auth/logout">{this.state.user} </a>
          <a href="/auth/logout"><img src="./images/logout.png" className='spotifylogout'/></a>
        </div>
      </div>
    )
  }
}

export default Header
