import React from 'react'
import {connect} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {TextField} from 'material-ui'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();
import { Debounce } from 'react-throttle';

import {fetchLocations} from '../actions/locations'
import {fetchEvents} from '../actions/events'

class SearchBar extends React.Component{
  state={
    value:'',
  }

  handleUpdateInput = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleClick = () => {
    this.props.dispatch(fetchLocations(this.state.value))
  }
  handleSelect = (result) => {
    this.setState({
      value:`${result.name}`,
      locationID:result.id
    })
  }

  render(){

    let searchResults=[];
    if (this.props.searchResults) {
        searchResults=this.props.searchResults
      }
    return (
    <MuiThemeProvider>
      <div className='search-bar'>
        <TextField
          id='text-field-controlled'
          hintText="city name"
          floatingLabelText="Search for a city..."
          value={this.state.value}
          onChange={this.handleUpdateInput}
        />
      <button id='search-button' onClick={()=>this.handleClick()}> search </button>
        <div className='search-results'>
          {searchResults!=[] &&
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
