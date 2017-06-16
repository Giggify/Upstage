import React from 'react'
import {connect} from 'react-redux'

import {fetchEvents} from '../actions/events'


class EventsList extends React.Component {
  componentWillMount(){
    this.props.dispatch(fetchEvents(this.props.match.params.id))
  }

  render() {
    return <div> Hello </div>
  }
}

const mapState2Props = (state) => {
  console.log(state.events)
  return state
}

export default connect(mapState2Props)(EventsList)
