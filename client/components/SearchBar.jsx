import React from 'react'
import {connect} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AutoComplete} from 'material-ui'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

import {fetchLocations} from '../actions/locations'

class SearchBar extends React.Component{
  state={
    searchText:'',
    dataSource:[]
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

  render(){

    let searchResults=[];
      if (this.props.searchResults) {
        searchResults=(this.props.searchResults).map((item)=>{return(`${item.name} ${item.state} ${item.country}`)
        })
      }

    console.log(searchResults)

    return (
    <MuiThemeProvider>
      <div className='search-bar'>
        <AutoComplete
          hintText="Search for a city..."
          searchText={this.state.searchText}
          onUpdateInput={this.handleUpdateInput}
          dataSource={[...searchResult]}
          filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
          openOnFocus={true}
        />
        <div>
          <button>Go</button>
          <button onClick={this.handleNewRequest}>Clear</button>
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
