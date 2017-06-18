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
  }
  componentWillReceiveProps({events,users,artists,minDate,maxDate,selectedTracks}) {
    this.setState({
      events,
      users,
      artists,
      minDate,
      maxDate
    })
  }

  handleClick(e, artist, tracksArray) {
    e.preventDefault()
    let selTracks = this.state.selectedTracks
    let selArtists= this.state.selectedArtists
    if(selArtists.indexOf(artist) == -1) {
      this.mapArrayToState(tracksArray)
      this.setState({selectedArtists: [...selArtists,artist]})
    } else {
      this.setState({
        selectedTracks: this.removeTrackIfExists(tracksArray, [...this.state.selectedTracks]),
        selectedArtists: [...selArtists].filter((name)=> name != artist)
      })
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
      let artists = this.props.artists || []
      let events = this.props.events || []
    return (
      <div className='Events-list-page'>
        <h1>Current Location: {this.props.match.params.name}</h1>


        <h1 className="eventlistheader">Events Between {this.props.minDate} and {this.props.maxDate}</h1>
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
    minDate: state.users.minDate || "2017-01-01",
    maxDate: state.users.maxDate || "2017-12-30"

  }
}

export default connect(mapState2Props)(EventsList)
