import React from 'react'
import {connect} from 'react-redux'

import {GridTile} from 'material-ui/GridList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import CheckBox from 'material-ui/svg-icons/toggle/check-box';

class ArtistTile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      artistdata: []
    }
  }


  render(){
    let event = this.props.event || []
    let color = props.checkArtist(event.artists[0])
return (
  <GridTile
    key={this.props.i}
    title={event.gig}
    subtitle={<span>Headline Act: <b>{event.artists[0]}</b></span>}
    actionIcon={<IconButton><CheckBox color={color} onClick={(e)=>this.props.handleClick(e,event.artists[0])}/></IconButton>}
    >
      <img src={'https://vignette2.wikia.nocookie.net/mafiagame/images/2/23/Unknown_Person.png'} />
    </GridTile>
)
  }
}

  // const mapState2Props = (state) => {
  //   return {
  //
  //   }
  // }
//connect(mapState2Props)
  export default ArtistTile
