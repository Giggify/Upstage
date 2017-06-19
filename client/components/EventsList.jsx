import React from 'react'
import {connect} from 'react-redux'
import {GridList} from 'material-ui/GridList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Subheader from 'material-ui/Subheader';
import CheckBox from 'material-ui/svg-icons/toggle/check-box';
import DatePicker from './DatePicker'

import {fetchEvents} from '../actions/events'
import {createPlaylist, addTrackToPlaylist} from '../api'
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

let filteredEvents

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
      playlistID: '',
      user: '',
      show: false,
      loadingPlaylist: true,
      minDate:this.props.minDate,
      maxDate:this.props.maxDate
    }
  }
  componentWillMount(){
    this.props.dispatch(fetchEvents(this.props.match.params.id))
  }

  componentWillReceiveProps({minDate,maxDate,events}) {
    if (minDate || maxDate) {
      let unfilteredEvents=events
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
      filteredEvents=unfilteredEvents.filter(fitsDates)
    }
    if(filteredEvents===undefined){
      this.setState({
        events:events,
        what:'doh'
      })
    } else {
      this.setState({
        events:filteredEvents,
        what:'123'
      })
    }
  }

  handlePlaylistCreation() {
    this.setState({loadingPlaylist: true})
    createPlaylist()
      .then((result) => {
      this.setState({playlistID: result.id})
      let tracklist = this.state.selectedTracks
      let apiTracklist = tracklist.map((track) =>
      `spotify:track:${track}`)
      addTrackToPlaylist(apiTracklist,this.state.playlistID)
      .then((result2)=> {
        console.log(result2);
      this.setState({show: !this.state.show, loadingPlaylist: false, user:result2});
      })
    })
  }

  handleClick(e, artist, tracksArray) {
    e.preventDefault()
    let selTracks = this.state.selectedTracks
    let selArtists= this.state.selectedArtists
    if(selArtists.indexOf(artist) == -1) {
      this.mapArrayToState(tracksArray)
      this.setState({selectedArtists: [...selArtists,artist]})
    }
    else {
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
      let artists = this.props.artists || []
      let events = this.state.events || []
      console.log(this.state.selectedTracks);
    return (
      <div className='Events-list-page'>
        <h1>Current Location: {this.props.match.params.name}</h1>
        <Playlist handlePlaylist={this.handlePlaylistCreation.bind(this)} show={this.state.show} user={this.state.user} loading={this.state.loadingPlaylist} playlist={this.state.playlistID}/>
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
