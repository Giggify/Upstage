import React from 'react'
import {connect} from 'react-redux'
import {GridList} from 'material-ui/GridList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Subheader from 'material-ui/Subheader';
import CheckBox from 'material-ui/svg-icons/toggle/check-box';
import DatePicker from './DatePicker'
import Drawer from './Drawer'

import {fetchEvents} from '../actions/events'
import {createPlaylist, addTrackToPlaylist} from '../api'
import SelectedArtistsBox from './SelectedArtistsBox'
import ArtistTile from './ArtistTile'
import Playlist from '../container/Playlist'
import {filterEventsbyDates} from '../utils'

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
    let {events,minDate,maxDate} = props
    super(props)
    this.state = {
      selectedArtists: [], // push to this when they select an artist
      selectedTracks: [],
      playlistID: '',
      show: false,
      loadingPlaylist: true,
      minDate:minDate,
      maxDate:maxDate,
      showInfo:false
    }
  }
  componentWillMount(){
    this.props.dispatch(fetchEvents(this.props.match.params.id))
  }
  componentWillReceiveProps({minDate,maxDate,events}) {
    //check if new dates have been received, and return a new list of events
    let filteredEvents=filterEventsbyDates(minDate,maxDate,events)
    this.setState(
      filteredEvents === undefined ?
      {events:events} : {events:filteredEvents}
    )
  }

  handlePlaylistCreation() {
    this.setState({loadingPlaylist: true})
    createPlaylist()
      .then((result) => {
        console.log(result);
      this.setState({playlistID: result.id})
      let tracklist = this.state.selectedTracks
      let apiTracklist = tracklist.map((track) =>
      `spotify:track:${track}`)
      addTrackToPlaylist(apiTracklist,this.state.playlistID)
      .then((userid)=> {
      this.setState({show: !this.state.show, loadingPlaylist: false, user: userid});
      })
    })
  }

  handleClick(e, artist, tracksArray) {
    e.preventDefault()
    let selArtists= this.state.selectedArtists
      if(selArtists.indexOf(artist) == -1) {
        this.mapArrayToState(tracksArray)
        this.setState({selectedArtists: [...selArtists,artist]})
      }
      else {
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
    if (this.state.selectedArtists.indexOf(artist) == -1) return "noborder"
    else return "orangeborder"

  }

  handleDeleteFromBox(artistIndex){
    let artistsInBox=[...this.state.selectedArtists]
    artistsInBox.splice(artistIndex,1)
    this.setState({selectedArtists: artistsInBox})
  }

  expandInfo(event){
    this.setState({eventInBox:event})
    this.state.showInfo ? this.setState({
    showInfo:false
    }) : this.setState({
    showInfo:true
    })
  }

    render() {
      console.log(this.state.selectedTracks);
      let artists = this.props.artists || []
      let events = this.state.events || []
    return (
      <div className='Events-list-page'>
        <h1 className="currentlocation">Current Location: {this.props.match.params.name}</h1>
        <Playlist handlePlaylist={this.handlePlaylistCreation.bind(this)} show={this.state.show} user={this.state.user} loading={this.state.loadingPlaylist} playlist={this.state.playlistID}/>
        <DatePicker />
        <SelectedArtistsBox handlePlaylist={this.handlePlaylistCreation.bind(this)} artists={this.state.selectedArtists} deleteArtist={this.handleDeleteFromBox.bind(this)}/>
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
              <ArtistTile event={event} key={i} i={i} checkArtist={this.checkArtistSelected.bind(this)}  handleClick={this.handleClick.bind(this)}
              expandInfo={this.expandInfo.bind(this)}/>// the i={i} is cause react doesn't like you grabbing key from props :(
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
    events: state.events.events,
    minDate: state.users.minDate,
    maxDate: state.users.maxDate

  }
}

export default connect(mapState2Props)(EventsList)
