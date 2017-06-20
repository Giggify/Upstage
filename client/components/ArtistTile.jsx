import React from 'react'
import {connect} from 'react-redux'

import {GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Info from 'material-ui/svg-icons/action/info';
import PlaylistAdd from 'material-ui/svg-icons/av/playlist-add';

import {getArtist, getTopTracks} from '../api'
import {saveSelectedArtists, saveSelectedTracks} from '../actions/playlist'

class ArtistTile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tracksArray: [],
      artist: {
        images: [{url: '/images/unknownartist.png'}]
      },
      tracks: [], //Zac wonders what is this doing?

    }
  }
  componentWillMount(){
    getArtist(this.props.event.artists[0])
      .then((artist) => {
        if (artist) this.setState({artist})
      })
      .then(() => {
        let tracksArray = []
        if(this.state.artist!=undefined){
          getTopTracks(this.state.artist.id)
              .then((tracks) => {
                if(tracks.status!=400){
                  tracks.map((track) => {
                    tracksArray.push(track.id)
                  })
                }
              })
              .then(() => {
                this.setState({tracksArray})
              })
        }
      })
  }

  handleClick(e, artist, tracksArray) {
    e.preventDefault()
    let selArtists= this.props.selectedArtists // we can probably chuch this.props.selected artists straight into the indexof?
      if(selArtists.indexOf(artist) == -1) {
        this.mapArrayToState(tracksArray)
          .then(() => {
            let updatedArtists = [...selArtists,artist]
            this.props.dispatch(saveSelectedArtists(updatedArtists))
          })
        }
      else {
          let updatedTracks = this.removeTrackIfExists(tracksArray, [...this.props.selectedTracks]),
          let updatedArtists = [...selArtists].filter((name)=> name != artist)
          this.props.dispatch(saveSelectedArtists(updatedArtists))
            .then(() => {
              this.props.dispatch(saveSelectedTracks(updatedTracks))
            })
        })
      }
    }

  handleInfoClick=(event)=>{
    window.open(event.concertUrl)
  }

  mapArrayToState(tracksArray) {
    let selTracks = [...this.props.selectedTracks]
    tracksArray.forEach((track) => selTracks.push(track))
    this.props.dispatch(saveSelectedTracks(selTracks))
  }

  removeTrackIfExists(tracksArray, stateTracksArray) {
    return stateTracksArray.filter((track) => {
      return tracksArray.indexOf(track) == -1
    })
  }

  render(){
    let event = this.props.event || []
    let border = this.props.checkArtist(event.artists[0])
    return (
      <GridTile
        className={border}
        key={this.props.i}
        title={event.artists[0]}
        subtitle={<span><b>{event.date}</b></span>}
        actionIcon={<IconButton><Info color="white" onClick={(e)=>this.handleInfoClick(event)}/></IconButton>}
      >
        <img src={this.state.artist.images[0].url} onClick={(e)=>this.handleClick(e,event.artists[0],this.state.tracksArray)} />
      </GridTile>
    )
  }
}

const mapState2Props = (state) => {
  return {
    selectedTracks: state.playlist.tracks,
    selectedArtists: state.playlist.artists
  }
}

export default connect(mapState2Props)(ArtistTile)
