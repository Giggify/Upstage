import React from 'react'
import {Chip, Avatar} from 'material-ui'
import {connect} from 'react-redux'
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {toggleArtist, createPlaylist, addTracksToPlaylist} from '../actions/playlist'

class SelectedArtistsBox extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      chipData:[]
    }
    this.styles = {
      chip:{
        margin:4

      },
      wrapper: {
        display:'flex',
        flexWrap:'wrap',
        width: 50
      }
    }
  }

  handleRequestDelete = (key) => {
    this.chipData = this.props.selectedArtists
    const chipToDelete = this.chipData.map((chip)=>chip.key).indexOf(key)
    this.chipData.splice(chipToDelete,1)
    this.setState({chipData: this.chipData})
    this.handleArtistClick(key)
  }

   handleCreation = () => { //REFACTORED!!!!!!
       this.create()
   }

   handleArtistClick(artist) {
     console.log(filterTopTracks(artist));
     console.log("^ this is the array");
     this.checkArtist(artist)
     toggleArtist(artist, filterTopTracks(artist), this.props.selectedArtists, this.props.selectedTracks, this.props.dispatch)
   }

   filterTopTracks(artist) {
     let topTracksList = [...props.topTracks]
     return topTracksList.filter((track) => track[artist] == artist)
   }

   create() {
     const tracks = this.props.selectedTracks
     this.props.dispatch(createPlaylist(this.props.selectedTracks))
   }

   trimArtistName = (artistName) => {
     if(artistName.length > 16) {
       return (artistName.slice(0, 12) + '...')
     }
     return artistName
   }
   handleClose = () => this.setState({open: false});

  renderChip(data){
    return(
      <Chip
        key={data.key}
        onRequestDelete={()=> this.handleRequestDelete(data.key)}
        backgroundColor="#FF6900"
        style={this.styles.chip}>
        {this.trimArtistName(data.label)}
      </Chip>
    )
  }

  componentWillReceiveProps(nextprops){
    let artists = nextprops.artists.map((artist,index)=>{
      return(
        {key: index, label: artist}
      )
    })
    this.setState({
      chipData:artists,
      open: true
    })
  }

  render(){
    return(
      <MuiThemeProvider>
      <div className="drawer">
      <Drawer
        docked={true}
        width={150}
        open={this.state.open}
        onRequestChange={(open) => this.setState({open})}
        >
       <div style={this.styles.wrapper}>
          {this.state.chipData.map(this.renderChip, this)}
       </div>
       <RaisedButton
                   label="Create"
                   onClick={this.handleCreation}
        />
      </Drawer>
      </div>
    </MuiThemeProvider>
    )
  }
}

const mapState2Props = (state) => {
    // console.log(state.playlist)
  return {
    tracks: state.playlist.tracks,
    artists: state.playlist.artists,
    topTracks: state.playlist.topTracks
  }
}

export default connect(mapState2Props)(SelectedArtistsBox)
