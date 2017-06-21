import React from 'react'

const Footer = () => {
  return (
    <div>
        <div className='Footer'>
            <p>Welcome to Upstage, an event finding application that uses the Songkick and Spotify API giving users the ability to find music gigs in a desired location, across a set of dates. Not only do we help you discover new music in your area, our application also gives you the ability to build a music library from these events with the click of a button. To get started simply log in to our web app using your Spotify account, select a location of your choosing, specify a set of dates and start discovering.</p>
        </div>
        <span>
          <img className="songkicklogo" src="./images/powered-by-songkick-white.png" />
          <img className="spotifylogo2" src="./images/Spotify_Logo_CMYK_Green.png" />
        </span>
    </div>
  )
}


export default Footer
