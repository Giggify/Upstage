import React from 'react'
import {connect} from 'react-redux'

import {GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Info from 'material-ui/svg-icons/action/info';
import PlaylistAdd from 'material-ui/svg-icons/av/playlist-add';

import {getArtist, getTopTracks} from '../api'

class ArtistTile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tracksArray: [],
      artist: {
        images: [{url: '/images/unknownartist.png'}]
      },
      tracks: []
    }
  }
  componentWillMount(){
    getArtist(this.props.event.artists[0])
      .then((artist) => {
        if (artist) this.setState({artist})
      })
  }
  componentWillReceiveProps(nextProps) {
    getArtist(nextProps.event.artists[0])
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

  handleInfoClick=(event)=>{
    window.open(event.concertUrl)
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
        <img src={this.state.artist.images[0].url || "/images/unknownartist.png"} onClick={(e)=>this.props.handleClick(e,event.artists[0],this.state.tracksArray)} />
      </GridTile>
    )
  }
}

export default ArtistTile
