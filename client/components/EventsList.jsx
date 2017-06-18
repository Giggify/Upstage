import React from 'react'
import {connect} from 'react-redux'
import {GridList} from 'material-ui/GridList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Subheader from 'material-ui/Subheader';
import CheckBox from 'material-ui/svg-icons/toggle/check-box';
import DatePicker from './DatePicker'

import {fetchEvents} from '../actions/events'
import SelectedArtistsBox from './SelectedArtistsBox'
import ArtistTile from './ArtistTile'
import Playlist from '../container/Playlist'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 700,
    height: 450,
  },
};

class EventsList extends React.Component {
  constructor(props) {
    let {events,users,artists,minDate,maxDate,dispatch} = props
    super(props)
    this.state = {
      tracksArray: [],
      selectedArtists: [], // push to this when they select an artist
      artistIDs: [], // this will be the end target of the filter, showing only events
      //within the date range.
      selectedTracks: [],
      events,
      users,
      artists,
      minDate,
      maxDate,
      dispatch
    }
  }
  componentWillMount(){
    this.props.dispatch(fetchEvents(this.props.match.params.id))
    if (this.state.minDate || this.state.maxDate) {
      console.log('yeah yeah')
      let unfilteredEvents=this.state.events
      let minUnix=Date.parse(this.state.minDate)
      let maxUnix=Date.parse(this.state.maxDate)
      const fitsDates=(event)=>{
        let eventDateUnix=new Date(event.date).getTime()
        return (
          minUnix <= eventDateUnix <= maxUnix
        )
      }
      let filteredEvents=unfilteredEvents.filter(fitsDates)
      this.setState({
        events:filteredEvents
      })
    }
  }

  componentWillReceiveProps({events,users,artists,minDate,maxDate,selectedTracks}) {
    this.setState({
      events,
      users,
      artists,
      minDate,
      maxDate
    })
    if (minDate || maxDate) {
      let unfilteredEvents=this.state.events
      let minUnix=Date.parse(minDate)
      let maxUnix=Date.parse(maxDate)
      const fitsDates=(event)=>{
        let eventDateUnix=new Date(event.date).getTime()
        if (minUnix && !maxUnix) {
          return minUnix <= eventDateUnix
        }
        if (maxUnix && !minUnix) {
          return eventDateUnix<= maxUnix
        }
        if (minUnix && maxUnix){
          return minUnix <= eventDateUnix && eventDateUnix<= maxUnix
        }
      }
      let filteredEvents=unfilteredEvents.filter(fitsDates)
      console.log('apple',filteredEvents)
      this.setState({
        events:filteredEvents
      })
    }
  }

  handleClick(e, artist, tracksArray) {
    e.preventDefault()
    let selTracks = this.state.selectedTracks
    let selArtists= this.state.selectedArtists
    if(selArtists.indexOf(artist) == -1) {
      this.mapArrayToState(tracksArray)
      this.setState({selectedArtists: [...selArtists,artist]})
    }else {
      this.removeTrackIfExists(tracksArray, [...this.state.selectedTracks])
      this.setState({selectedArtists: [...selArtists].filter((name)=> name != artist)})
    }
  }

    mapArrayToState(tracksArray) {
      let selTracks = [...this.state.selectedTracks]
      tracksArray.forEach((track) => selTracks.push(track))
      this.setState({selectedTracks: selTracks})
    }

    removeTrackIfExists(tracksArray, stateTracksArray) {
      return stateTracksArray.filter((track) => {
        return tracksArray.indexOf(track) == -1
      })
    }

  checkArtistSelected(artist){
    if (this.state.selectedArtists.indexOf(artist) == -1) return "white"
    else return "orange"
  }

  handleDeleteFromBox(artistIndex){
    let artistsInBox=[...this.state.selectedArtists]
    artistsInBox.splice(artistIndex,1)
    this.setState({selectedArtists: artistsInBox})
  }

    render() {
      console.log(this.state.maxDate)
      let artists = this.props.artists || []
      let events = this.props.events || []
    return (
      <div className='Events-list-page'>
        <h1>Current Location: {this.props.match.params.name}</h1>
        <Playlist />
        <DatePicker />
        <SelectedArtistsBox artists={this.state.selectedArtists} deleteArtist={this.handleDeleteFromBox.bind(this)}/>
        <div style={styles.root}>
         <MuiThemeProvider>
          <GridList
            cellHeight={180}
            style={styles.gridList}
            cols={3}
            padding={25}
          >
            <Subheader></Subheader>
            {events.map((event, i) => (
              <ArtistTile event={event} key={i} i={i} checkArtist={this.checkArtistSelected.bind(this)} handleClick={this.handleClick.bind(this)}/> // the i={i} is cause react doesn't like you grabbing key from props :(
            ))}
          </GridList>
        </MuiThemeProvider>
        </div>
      </div>

    );
    }
  }

const mapState2Props = (state) => {
  return {
    users:state.users,
    events: state.events.events,
    artists: state.events.artists,
    selectedArtists: state.selectedArtists,
    minDate: state.users.minDate,
    maxDate: state.users.maxDate

  }
}

export default connect(mapState2Props)(EventsList)
