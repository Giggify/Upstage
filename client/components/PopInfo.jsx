import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class PopInfo extends React.Component {
  constructor(props){
    super(props)
    this.state={
      expanded:true,
      concertUrl:this.props.event.event.concertUrl,
      artistUrl:this.props.event.event.artistUrl[0],
      venueUrl:this.props.event.event.venueUrl
    }
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded:expanded})
  }

  handleToggle = (event, toggle) => {
    this.setState({expanded:toggle})
  }
  handleExpand=()=>{
    this.setState({expanded:true})
  }
  handleReduce=()=>{
    this.setState({expanded:false})
  }
  linkToConcert=()=>{
    location.href=`${this.state.concertUrl}`
  }
  linkToArtist=()=>{
    location.href=`${this.state.artistUrl}`
  }
  linkToVenue=()=>{
    location.href=`${this.state.venueUrl}`
  }

  render(){
    const {gig,time,artists,artistUrl,venue,venueUrl,concertUrl}=this.props.event.event
    return(
      <MuiThemeProvider>
      <Card expanded={this.state.expanded} onExpandChange={
          this.handleExpandChange}>
          <CardHeader
            title={`${gig}  Time:${time}`}
            actAsExpander={true}
            showExpandableButton={true}
          />
        <CardMedia
          expandable={true} >
        </CardMedia>
        <CardText expandable ={true}>
          Artists Playing: {artists.map(artist=>artist)}
          <br />
          <FlatButton label="Concert" secondary={true} onTouchTap={this.linkToConcert} />
          <FlatButton label="Artist" secondary={true} onTouchTap={this.linkToArtist} />
          <FlatButton label="Venue" secondary={true} onTouchTap={this.linkToVenue} />
        </CardText>
        <CardActions>
          <FlatButton label='Close' onTouchTap={this.handleReduce} />
        </CardActions>
      </Card>
    </MuiThemeProvider>
    )
  }
}

export default PopInfo
