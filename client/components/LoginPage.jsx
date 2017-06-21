import React from 'react'

const Header = () => {
  return (
    <div className='loginpage'>
      <div className="logo-main">
        <img src="./images/TITLE.png" width="45%"/>
      </div>
      <div className="login">
          <img className='spotifylogo' src='https://image.flaticon.com/icons/png/512/7/7709.png'/>
          <a className='spotifylogin' href="/auth">Login</a>
      </div>
    </div>
  )
}

export default Header
