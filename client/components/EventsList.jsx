import React from 'react'
import {connect} from 'react-redux'

const EventsList = (props)=>{
  return <div> Hello </div>
}

const mapState2Props = (state) => {
  console.log(state)
  return state
}

export default connect(mapState2Props)(EventsList)
