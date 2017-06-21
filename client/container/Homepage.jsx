import React from 'react'
import {connect} from 'react-redux'
import{getMuiTheme, MuiThemeProvider} from 'material-ui/styles/'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import {orange500,green700} from 'material-ui/styles/colors';

import SearchBar from '../components/SearchBar'
import DatePicker from '../components/DatePicker'

import RaisedButton from 'material-ui/RaisedButton';

const muiTheme = getMuiTheme(
  (darkBaseTheme)
);

class Homepage extends React.Component{
  constructor(props){
    super(props)
    this.state={
      noLocation:false
    }
  }

  handleClick=()=>{
    if (this.props.metro.locationID === undefined) {
    this.setState=({
      noLocation:true
    })
    alert("Please choose a location")
  } else {
    this.setState={
      noLocation:false
    }
    let id=this.props.metro.locationID
    let {city,state,country}=this.props.metro
    let metro
    state === ' ' ? metro=`${city}-${country}` : metro=`${city}-${state}-${country}`
    location.href=`#events/${id}/${metro}`
  }

  }
  render(){
  return(
    <div className='home-page'>
      <SearchBar />
      <div className='select-dates'>
        <span>Optional</span>
        <div id='home-page-date'>
        <DatePicker />
        </div>
      </div>
      <div id='go-button'>
        <MuiThemeProvider muiTheme={muiTheme}>
          <RaisedButton
            label="GO"
            backgroundColor={green700}
            style={{width:'10em'}}
            onClick={()=>{this.handleClick()}}
          />
        </MuiThemeProvider>
      </div>
    </div>
  )}
}

const mapState2Props = (state)=>{
  return {
    metro:state.users
  }
}

export default connect(mapState2Props)(Homepage)
