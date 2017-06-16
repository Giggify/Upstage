import React from 'react'
import {connect} from 'react-redux'

import {fetchEvents} from '../actions/events'

import EventGridList from './EventGridList'


class EventsList extends React.Component {
  constructor(props) {
    let {events,users,artists,dispatch} = props
    super(props)
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
  componentWillMount(){
    this.props.dispatch(fetchEvents(this.props.match.params.id))
  }
  componentWillReceiveProps({events,users,artists}) {
    this.setState({
      events,
      users,
      artists
    })
  }
    render() {
      let artists = this.props.artists || []
      let events = this.props.events || []
      console.log(artists)
      console.log(events)
    return <div>
      <EventGridList />
    </div>
    }
  }

const mapState2Props = (state) => {
  return {
    users:state.users,
    events: state.events.events,
    artists: state.events.artists,
    minDate: state.minDate || "2017-01-01",
    maxDate: state.maxDate || "2017-12-30"
  }
}

export default connect(mapState2Props)(EventsList)
