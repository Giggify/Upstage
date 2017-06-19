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
    getUserInfo(document.cookie || null)

    //if no cookie, redirect to home.
    .then((result) => {
      this.setState({user: result.id, image: result.image})
    })
  }
  render() {
    return (
      <div className='header'>
        <h3 className="upstagesmall">UPSTAGE</h3>
        <div className="spotifydetails">
          <img className='spotifyimage' src={this.state.image}/>
          <a className='spotifyusername' href="/auth/logout">{this.state.user} 🡻</a>
        </div>
      </div>
    )
  }
}

export default Header
