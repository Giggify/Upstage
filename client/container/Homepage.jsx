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

const Homepage = (props)=>{

  const handleClick=()=>{
    let id=props.metro.locationID
    let {city,state,country}=props.metro
    let metro
    state === ' ' ? metro=`${city}-${country}` : metro=`${city}-${state}-${country}`
    location.href=`#events/${id}/${metro}`
  }

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
            style={{width:'10em', color:'green700'}}
            onClick={()=>{handleClick()}}
          />
        </MuiThemeProvider>
      </div>
    </div>
  )
}

const mapState2Props = (state)=>{
  return {
    metro:state.users
  }
}

export default connect(mapState2Props)(Homepage)
