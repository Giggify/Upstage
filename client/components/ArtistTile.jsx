import React from 'react'
import {connect} from 'react-redux'

import {GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Info from 'material-ui/svg-icons/action/info';
import PlaylistAdd from 'material-ui/svg-icons/av/playlist-add';

import {getArtist, getTopTracks} from '../api'
import {toggleArtist, saveTopTracks} from '../actions/playlist'

class ArtistTile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      artist: {
        images: [{url: '/images/unknownartist.png'}]
      },
      tracksArray: []
    }
  }
  componentWillMount(){
    let artistName = this.props.event.artists[0]
    getArtist(artistName)
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
                console.log("artistname",artistName)
                this.setState({tracksArray: tracksArray})
                this.props.dispatch(saveTopTracks(artistName,tracksArray))
              })
        }
      })
  }

  checkArtist(artist) {
    if (this.props.selectedArtists.indexOf(artist) == -1) return "noborder"
    else return "orangeborder"
  }

  handleArtistClick(artist) {
    this.checkArtist(artist)
    toggleArtist(artist,this.props.topTracks, this.props.selectedArtists, this.props.selectedTracks, this.props.dispatch)
  }

  handleInfoClick=(event)=>{
    window.open(event.concertUrl)
  }

  render(){
    let event = this.props.event || []
    let border = this.checkArtist(event.artists[0])
    return (
      <GridTile
        className={border}
        key={this.props.i}
        title={event.artists[0]}
        subtitle={<span><b>{event.date}</b></span>}
        actionIcon={<IconButton><Info color="white" onClick={(e)=>this.handleInfoClick(event)}/></IconButton>}
      >
        <img src={this.state.artist.images[0].url} onClick={(e)=>this.handleArtistClick(event.artists[0])} />
      </GridTile>
    )
  }
}

const mapState2Props = (state) => {
  return {
    selectedTracks: state.playlist.tracks,
    selectedArtists: state.playlist.artists,
    topTracks: state.playlist.topTracks
  }
}

export default connect(mapState2Props)(ArtistTile)
