import React from 'react'
import {connect} from 'react-redux'

class EventsList extends React.Component{
  render(){
    return <div> Hello </div>
  }
}

const mapState2Props = (state) => {
  console.log(state)
  return state
}

export default connect(mapState2Props)(EventsList)
