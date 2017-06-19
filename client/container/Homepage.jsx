import React from 'react'
import {connect} from 'react-redux'

import SearchBar from '../components/SearchBar'
import DatePicker from '../components/DatePicker'

const Homepage = (props)=>{

  const handleClick=()=>{
    let id=props.metro.locationID
    let {city,state,country}=props.metro
    let metro
    state === ' ' ? metro=`${city}-${country}` : metro=`${city}-${state}-${country}`
    location.href=`#events/${id}/${metro}`
  }

  return(
    <div className='home-page'>
      <SearchBar />
      <span>Optional</span>
      <DatePicker />
      <button onClick={()=>{handleClick()}}> Go </button>
    </div>
  )
}

const mapState2Props = (state)=>{
  return {
    metro:state.users
  }
}

export default connect(mapState2Props)(Homepage)
