import React from 'react'
import {connect} from 'react-redux'

import {GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Info from 'material-ui/svg-icons/action/info';
import PlaylistAdd from 'material-ui/svg-icons/av/playlist-add';

import {getArtist, getTopTracks} from '../api'
import {toggleArtist, saveTopTracks, addArtist, deleteArtist} from '../actions/playlist'

class ArtistTile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedArtists: props.selectedArtists,
      artist: {
        images: [{url: '/images/unknownartist.png'}]
      },
      tracksArray: []
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({selectedArtists: nextProps.selectedArtists})
  }
  componentWillMount(){
    let artistName = this.props.event.artists[0]
    getArtist(artistName)
      .then((artist) => {
          if (artist) this.setState({artist})

      })
  }

  filterTopTracks(artist) {
    let topTracksList = [...this.props.topTracks]
    return topTracksList.filter((track) => track[artist] == artist)
  }

  checkArtist(artist) {
    this.state.selectedArtists.find(selArtist => {
      if (selArtist.name == artist) return "orangeborder"
    })
    return 'noborder'
  }

  isArtistSelected(artist) {
    return this.state.selectedArtists.find(selArtist => {
      return selArtist.name == artist
    })
  }

  handleArtistClick(artist) {
    let boolean = this.isArtistSelected(artist)
    if (boolean) {
      this.deleteArtistAndTracks(artist)
    } else {
      this.selectArtistAndTracks(artist)
    }
  }

  selectArtistAndTracks(artist) {
    getTopTracks(this.state.artist.id)
      .then((tracks) => {
        if(tracks.status != 400) {
          return tracks.map((track) => {
            return track.id
          })
        }
      })
      .then(tracksArray => {
          if(tracksArray) {
              this.props.dispatch(addArtist(artist, tracksArray))

          }
      })
  }

  deleteArtistAndTracks(artist) {
    this.props.dispatch(deleteArtist(artist))
  }


  handleInfoClick=(event)=>{
    window.open(event.concertUrl)
  }

  render(){
    let event = this.props.event || []
    let border = this.props.checkArtist(event.artists[0])
    return (
      <GridTile
        className={this.isArtistSelected(event.artists[0]) ? 'orangeborder' : 'noborder'}
        key={this.props.i}
        title={event.artists[0]}
        subtitle={<span><b>{event.date}</b></span>}
        actionIcon={<IconButton><Info color="white" onClick={(e)=>this.handleInfoClick(event)}/></IconButton>}
      >
        <img src={this.state.artist.images[0] ? this.state.artist.images[0].url : '/images/unknownartist.png'} onClick={(e)=>this.handleArtistClick(event.artists[0])} />
      </GridTile>
    )
  }
}

const mapState2Props = (state) => {
  return {
    selectedArtists: state.artists,
    selectedTracks: state.playlist.tracks,
    topTracks: state.playlist.topTracks
  }
}

export default connect(mapState2Props)(ArtistTile)
