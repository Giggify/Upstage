import React from 'react'
import {connect} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AutoComplete} from 'material-ui'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

import {fetchLocations} from '../actions/locations'

import SearchResults from './SearchResults'

class SearchBar extends React.Component{
  state={
    searchText:'',
  }

  handleUpdateInput = (searchText) => {
    this.setState({
      searchText: searchText,
    });
    this.props.dispatch(fetchLocations(searchText))
  };

  handleNewRequest = () => {
    this.setState({
      searchText: '',
    });
  };

  handleSelect = (id) => {
    console.log(id)
  }

  render(){

    let searchResults=[];
    if (this.props.searchResults) {
        searchResults=this.props.searchResults
      }

    console.log(searchResults)

    return (
    <MuiThemeProvider>
      <div className='search-bar'>
        <AutoComplete
          hintText="Search for a city..."
          searchText={this.state.searchText}
          onUpdateInput={this.handleUpdateInput}
          dataSource={[]}
          filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
          openOnFocus={true}
        />
        <div className='search-results'>
          {searchResults!=[] &&
            <div>
              {searchResults.map((result,index)=>{return(
                <div id="search-result-item" key={index} onClick={()=>this.handleSelect(result.id)}>
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
