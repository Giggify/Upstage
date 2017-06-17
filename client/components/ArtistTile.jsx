import React from 'react'
import {connect} from 'react-redux'

import {GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import CheckBox from 'material-ui/svg-icons/toggle/check-box';

import {getArtistId} from '../api'
import {fetchEvents} from '../actions/events'

class ArtistTile extends React.Component {
  constructor(props) {
    let {artists} = props
    super(props)
    this.state = {
      artists,
      artistID: ''
    }
  }
  componentDidMount() {
    var artistID = getArtistId(this.props.event.artists[0])
    this.setState({artistID})
  }

  render(){
    let event = this.props.event || []
    let color = this.props.checkArtist(event.artists[0])
return (
  <GridTile
    key={this.props.i}
    title={event.gig}
    subtitle={<span>Headline Act: <b>{event.artists[0]}</b></span>}
    actionIcon={<IconButton><CheckBox color={color} onClick={(e)=>this.props.handleClick(e,event.artists[0],this.state.artistID)}/></IconButton>}
    >
      <img src={'https://vignette2.wikia.nocookie.net/mafiagame/images/2/23/Unknown_Person.png'} />
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
