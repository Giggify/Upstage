import React from 'react'

import SearchBar from '../components/SearchBar'
import DatePicker from '../components/DatePicker'

const handleClick=()=>{
  location.href="#events" 
}

const Homepage = (props)=>{
  return(
    <div className='home-page'>
      <SearchBar />
      <DatePicker />
      <button onClick={()=>{handleClick()}}> Go </button>
    </div>
  )
}

export default Homepage
