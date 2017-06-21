import React from 'react'
import {connect} from 'react-redux'
import {TextField} from 'material-ui'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

import{getMuiTheme, MuiThemeProvider} from 'material-ui/styles/'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import {orange500,green700} from 'material-ui/styles/colors';
import PopularPlaces from './SearchBarPopularPlaces'

const styles = {
  customWidth: {
    width: 150,
  },
};

const muiTheme = getMuiTheme(
  (darkBaseTheme),
  {
  textField: {
   floatingLabelColor: orange500,
   hintColor:green700,
   disabledTextColor:green700,
   focusColor:green700
 },
});

class SearchBar extends React.Component{
  state={
    value:'',
    showResults:true
  }

  handleUpdateInput = (event) => {
    this.setState({
      value: event.target.value,
      showResults:true
    });
  };

  handleClick = () => {
    this.props.dispatch(fetchLocations(this.state.value))
  }
  handleSelect = (result) => {
    this.setState({
      value:`${result.name} ${result.state} ${result.country}`,
      showResults:false,
    })
    this.props.dispatch(saveLocationId(result.id))
    this.props.dispatch(saveLocationName(result))
  }

  render(){

    let searchResults=[];
    if (this.props.searchResults) {
        searchResults=this.props.searchResults
      }
    return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className='search-bar'>
        <PopularPlaces />
        <div className='search-city'>
        <div id='search-text-field'>
          <TextField
          id='text-field-controlled'
          hintText="city name"
          floatingLabelText="Search for a city..."
          value={this.state.value}
          onChange={this.handleUpdateInput}
          style={styles.customWidth}
          />
        </div>
        <img id='search-button' src='https://cdn2.iconfinder.com/data/icons/media-and-navigation-buttons-round/512/Button_15-128.png'
        onClick={()=>this.handleClick()} />
      </div>
        <div className='search-results'>
          {searchResults!=[] && this.state.showResults &&
            <div>
                {searchResults.map((result,index)=>{return(
                <div id="search-result-item" key={index} onClick={()=>this.handleSelect(result)}>
                  {result.name} {result.state} {result.country}
                </div>
                )})
              }
            </div>
          }
      </div>
    </div>
    </MuiThemeProvider>
    )
  }
}

const mapState2Props = (state)=>{
  return {
    searchResults:state.location.name
  }
}

export default connect(mapState2Props)(SearchBar)
