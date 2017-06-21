import React from 'react'
import {connect} from 'react-redux'
import {getUserInfo} from '../api'
import {saveUserDetails} from '../actions/users'

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
      getUserInfo(cookie)
      .then((result) => {
        this.props.dispatch(saveUserDetails(result.id,result.image)) //spotify calls it id but it is the username so we change it to user.
      })
    }
  }
  render() {
    return (
      <div className='header'>
        <img className="headerlogo" src="./images/TITLE.png" width="15%" height="3%"/>
        <div className="spotifydetails">
          <img className='spotifyimage' src={this.props.image}/>
          <a className='spotifyusername' href="/auth/logout">{this.props.user} </a>
          <a href="/auth/logout"><img src="./images/logout.png" className='spotifylogout'/></a>
        </div>
      </div>
    )
  }
}

const mapStateToProps  = (state)  => {
  return {
    image: state.users.image,
    user: state.users.user
  }
}
export default connect(mapStateToProps)(Header)
