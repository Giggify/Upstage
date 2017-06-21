import React from 'react'
import {Chip, Avatar} from 'material-ui'
import {connect} from 'react-redux'
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {toggleArtist, createPlaylist, addTracksToPlaylist, deleteArtist} from '../actions/playlist'

import {getTopTracks} from '../api'


class SelectedArtistsBox extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      artistNames: [],
      selectedArtists: props.artists
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


  handleRequestDelete (name) {
    this.props.dispatch(deleteArtist(name))
  }

  // handleRequestDelete = (key) => {
  //   this.chipData = this.props.realArtists
  //   const chipToDelete = this.chipData.map((chip)=>chip.key).indexOf(key)
  //   this.chipData.splice(chipToDelete,1)
  //   this.setState({chipData: this.chipData})
  //   this.handleArtistClick(key)
  // }

  //  handleCreation = () => { //REFACTORED!!!!!!
  //    console.log(this.state);
  //      this.create()
  //  }


   //
  //  filterTopTracks(artist) {
  //    let topTracksList = [...props.topTracks]
  //    return topTracksList.filter((track) => track[artist] == artist)
  //  }

   createPlaylist() {
    //  console.log(this.state.selectedArti);
     this.props.dispatch(createPlaylist(this.assemblePlaylist(this.state.selectedArtists)))
   }

   assemblePlaylist(artists) {
     let playlist = []
     artists.forEach(artist => playlist = playlist.concat(artist.tracks))
     return playlist
   }

   trimArtistName (artistName) {
     if(artistName.length > 16) {
       return (artistName.slice(0, 12) + '...')
     }
     return artistName
   }

   handleClose () {
     return this.setState({open: false})
   }

  renderChip(artist){
    return(
      <Chip
        key={artist.key}
        onRequestDelete={()=> this.handleRequestDelete(artist.name)}
        backgroundColor="#FF6900"
        style={this.styles.chip}>
        {this.trimArtistName(artist.name)}
      </Chip>
    )
  }
  //
  // componentWillReceiveProps(nextprops){
  //   let artists = nextprops.artists.map((artist,index)=>{
  //     return(
  //       {key: index, label: artist}
  //     )
  //   })
  //   this.setState({
  //     chipData:artists,
  //     open: true
  //   })
  // }

  componentWillReceiveProps(nextProps) {
    let artistNames = nextProps.artists.map((artist, key) => {
      return {key, name: artist.name}
    })
    this.setState({selectedArtists: nextProps.artists, artistNames, open:true})
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
          {this.state.artistNames.map(this.renderChip, this)}
       </div>
       <RaisedButton
         label="Create"
         onClick={(e) => this.createPlaylist()}
        />
      </Drawer>
      </div>
    </MuiThemeProvider>
    )
  }

}

const mapState2Props = (state) => {
  return {
    artists: state.artists
  }
}

export default connect(mapState2Props)(SelectedArtistsBox)
