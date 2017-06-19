import React from 'react'

const ErrorLogin = (props)=>{
  return(
    <div className='error-message'>
      <p>You were redirected here because you attempted to access a page that requires users to be logged into Spotify.</p>
      <p>Please login to gain access to this page</p>
    </div>
  )
}

export default ErrorLogin
