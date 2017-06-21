import React from 'react'

const Header = () => {
  return (
    <div className='loginpage'>
      <div className="logo-main">
        <img src="./images/TITLE.png" width="55%"/>
      </div>
      <div className="login">
          <img className='spotifylogo' src='./images/Spotify_Icon_CMYK_Black.png'/>
          <a className='spotifylogin' href="/auth">Login</a>
      </div>
    </div>
  )
}

export default Header
