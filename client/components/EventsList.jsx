import React from 'react'
import {connect} from 'react-redux'
import {GridList, GridTile} from 'material-ui/GridList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import CheckBox from 'material-ui/svg-icons/toggle/check-box';

import {fetchEvents} from '../actions/events'
import {createPlaylist} from '../api'
import SelectedArtists from './SelectedArtists'

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
      selectedArtists: [], // push to this when they select an artist
      validEvents: [], // this will be the end target of the filter, showing only events
      //within the date range.
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
  componentWillReceiveProps({events,users,artists,minDate,maxDate}) {
    this.setState({
      events,
      users,
      artists,
      minDate,
      maxDate
    })
  }
  handleClick(e,artist) {
    e.preventDefault()
    let selArtists= this.state.selectedArtists
    let artistPresent = selArtists.indexOf(artist)
    artistPresent==-1 ? this.setState({selectedArtists: [...selArtists,artist]}) : this.setState({selectedArtists: [...selArtists].filter((name)=> name != artist)})

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
      console.log(this.state.selectedArtists)
      let artists = this.props.artists || []
      let events = this.props.events || []
    return (
      <div style={styles.root}>
        <h1 className="eventlistheader">Events Between {this.props.minDate} and {this.props.maxDate}</h1>
       <MuiThemeProvider>
        <GridList
          cellHeight={180}
          style={styles.gridList}
          cols={3}
          padding={25}
        >
          <Subheader></Subheader>
          {events.map((event, i) => (
            <GridTile
              key={i}
              title={event.gig}
              subtitle={<span>Headline Act: <b>{event.artists[0]}</b></span>}
              actionIcon={<IconButton><CheckBox color={this.checkArtistSelected(event.artists[0])} onClick={(e)=>this.handleClick(e,event.artists[0])}/></IconButton>}
            >
              <img src={'https://vignette2.wikia.nocookie.net/mafiagame/images/2/23/Unknown_Person.png'} />
            </GridTile>
          ))}
        </GridList>
      </MuiThemeProvider>
      <SelectedArtists artists={this.state.selectedArtists} deleteArtist={this.handleDeleteFromBox.bind(this)}/>
      <button className="createplaylistbtn">Create Playlist</button>
      </div>
    );
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

//onClick={createPlaylist(this.state.selectedArtists)}

export default connect(mapState2Props)(EventsList)
