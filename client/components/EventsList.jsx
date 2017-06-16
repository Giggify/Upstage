import React from 'react'
import {connect} from 'react-redux'

class EventsList extends React.Component {
  constructor({events,users,artists,dispatch}) {
    super({events,users,artists,dispatch})
    this.state = {
      selectedArtists: [], // push to this when they select an artist
      validEvents: [], // this will be the end target of the filter, showing only events
      //within the date range.
      events,
      users,
      artists,
      dispatch
    }
  }
  componentWillReceiveProps({events,users,artists}) {
    this.setState({
      events,
      users,
      artists
    })
  }
  render() {
    console.log(this.props)
    return <div>
      <p></p>
    </div>
  }
}

const mapState2Props = (state) => {
  return {
    users:state.users,
    events: state.events,
    artists: state.artists,
  }
}

export default connect(mapState2Props)(EventsList)
