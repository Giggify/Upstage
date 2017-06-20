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
      chipData:[],
      open: false

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
    this.props.deleteArtist(key)
  }


   handleToggle = () => { //REFACTORED!!!!!!
       this.create()
       this.setState({open: !this.state.open});
   }

   handleArtistClick(artist) {
     this.checkArtist(artist)
     toggleArtist(artist,this.state.tracksArray, this.props.selectedArtists, this.props.selectedTracks, this.props.dispatch)
   }

   create() {
     const tracks = this.props.
     this.props.dispatch(createPlaylist())
       .then(() => {
         this.props.dispatch(addTracksToPlaylist(tracks,this.props.playlistID))
       })
   }

   trimArtistName = (artistName) => {
     if(artistName.length > 16) {
       return (artistName.slice(0, 12) + '...')
     }
     return artistName
   }
   handleClose = () => this.setState({open: false});

  renderChip(data){
    //call function to trim data.label

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
                   onClick={this.handleToggle}
        />
      </Drawer>
      </div>
    </MuiThemeProvider>
    )
  }
}

const mapState2Props = (state) => {
  return {
    selectedTracks: state.playlist.tracks,
    selectedArtists: state.playlist.artists
  }
}

export default connect(mapState2Props)(SelectedArtistBox)
