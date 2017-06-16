import React from 'react'
import {connect} from 'react-redux'

import SearchBar from '../components/SearchBar'
import DatePicker from '../components/DatePicker'

const Homepage = (props)=>{

  const handleClick=()=>{
    let id=props.searchResults[0].id
    location.href=`#events/${id}`
  }

  return(
    <div className='home-page'>
      <SearchBar />
      <DatePicker />
      <button onClick={()=>{handleClick()}}> Go </button>
    </div>
  )
}

const mapState2Props = (state)=>{
  return {
    searchResults:state.location.name
  }
}

export default connect(mapState2Props)(Homepage)
