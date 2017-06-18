import React from 'react'
import {connect} from 'react-redux'

import {GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import CheckBox from 'material-ui/svg-icons/toggle/check-box';

import {getArtist, getTopTracks} from '../api'
import {fetchEvents} from '../actions/events'

class ArtistTile extends React.Component {
  constructor(props) {
    let {artists} = props
    super(props)
    this.state = {
      artist:undefined,
      tracksArray: [],
      artistID: '',
      trackIDs: [],
    tracks: []
    }
  }
  componentDidMount() {
    getArtist(this.props.event.artists[0])
      .then((artist) => {
        this.setState({artist})
      })
      .then(() => {
        let tracksArray = []
        if(this.state.artist!=undefined){
          getTopTracks(this.state.artist.id)
              .then((tracks) => {
                tracks.map((track) => {
                  tracksArray.push(track.id)
                })
              })
              .then(() => {
                this.setState({tracksArray})
              })
        }
      })
  }

  render(){
    console.log(this.state.tracksArray)
    let event = this.props.event || []
    let color = this.props.checkArtist(event.artists[0])
    return (
      <GridTile
        key={this.props.i}
        title={event.artists[0]}
        subtitle={<span><b>{event.date}</b></span>}
        actionIcon={
          <IconButton>
            <CheckBox color={color} onClick={(e)=>this.props.handleClick(e,event.artists[0],this.state.tracksArray)}/>
          </IconButton>}
      >
        {this.state.artist===undefined ? <img src='/images/unknownartist.png' /> : <img src={this.state.artist.images[0].url} />
        }
      </GridTile>
    )
  }
}

  const mapState2Props = (state) => {
    return {
      artists: state.events.artists
    }
  }

  export default ArtistTile
