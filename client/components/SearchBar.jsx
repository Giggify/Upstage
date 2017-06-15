import React from 'react'
import {connect} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AutoComplete} from 'material-ui'
import injectTapEventPlugin from 'react-tap-event-plugin'

import {fetchLocations} from '../actions/locations'
import SearchResults from './SearchResults'

let serachResults= []


class SearchBar extends React.Component{
  state={
    searchText:''
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
    return (
    <MuiThemeProvider>
      <div className='search-bar'>
        <AutoComplete
          hintText="Search for a city..."
          searchText={this.state.searchText}
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={this.handleNewRequest}
          dataSource={serachResults}
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

export default connect()(SearchBar)
