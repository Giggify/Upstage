import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MapsPlace from 'material-ui/svg-icons/maps/place';
import {connect} from 'react-redux'

import{getMuiTheme, MuiThemeProvider} from 'material-ui/styles/'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import {saveLocationId, saveLocationName} from '../actions/users'

/**
 * The `maxHeight` property limits the height of the menu, above which it will be scrollable.
 */

 let savedPlaces=[
   {value:{id:31455,name:{country:"New Zealand", name: "Wellington", state:" "}},
   displayName:'Wellington, NZ'},
   {value:{id:31422,name:{country:"New Zealand", name: "Auckland", state:" "}},
   displayName:'Auckland, NZ'},
   {value:{id:31443,name:{country:"New Zealand", name: "Christchurch", state:" "}},
   displayName:'Christchurch, NZ'},
   {value:{id:26790,name:{country:"Australia", name: "Melbourne", state:"VIC"}},
   displayName:'Melbourne, AUS'},
   {value:{id:7644,name:{country:"US", name: "New York", state:"NY"}},
   displayName:'NYC, USA'},
   {value:{id:24426,name:{country:"UK", name: "London", state:" "}},
   displayName:'London, UK'}
 ]

class PopularPlaces extends React.Component{
  constructor(props){
    super(props)
    this.state={
      showCity:false
    }
  }

  handleChange=(event,value)=>{
    this.setState({showCity:`${value.name.name}`})
    this.props.dispatch(saveLocationId(value.id))
    this.props.dispatch(saveLocationName(value.name))
  }
  render(){
    return(
      <div id='popular-city'>
        <p>{this.state.showCity? `${this.state.showCity}` : `${"Choose a popular city"}`  }</p>
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <IconMenu
        iconButtonElement={<IconButton><MapsPlace /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        maxHeight={272}
        onChange={this.handleChange}
      >
      {savedPlaces.map((place,index)=>{
        return(
          <MenuItem key={index} value={place.value} primaryText={place.displayName} />
        )
      })}
      </IconMenu>
      </MuiThemeProvider>
      </div>
    )
  }
}

export default connect()(PopularPlaces)
