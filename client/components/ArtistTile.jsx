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
      tracksArray: [],
      artists,
      artist: {
        images: [
          {
            url: '/images/unknownartist.png'
          }
        ]
      },
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
          getTopTracks(this.state.artist.id)
            .then((tracks) => {
              tracks.map((track) => {
                tracksArray.push(track.id)
              })
            })
            .then(() => {
              this.setState({tracksArray})
            })
      })

  }

  render() {
    let event = this.props.event || []
    let color = this.props.checkArtist(event.artists[0])

    return (
      <GridTile
        key={this.props.i}
        title={event.gig}
        subtitle={<span>Headline Act: <b>{event.artists[0]}</b></span>}
        actionIcon={
          <IconButton>
            <CheckBox color={color} onClick={(e)=>this.props.handleClick(e,event.artists[0],this.state.artistID,this.state.tracksArray)}/>
          </IconButton>}
      >
        <img src={this.state.artist.images[0].url} />
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
