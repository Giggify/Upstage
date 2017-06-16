import React from 'react'
import {connect} from 'react-redux'

class EventsList extends React.= (props)=>{
  return <div> Hello </div>
}

const mapState2Props = (state) => {
  console.log(state.users)
  return {
    user:state.users
  }
}

export default connect(mapState2Props)(EventsList)
