import React from 'react'
import {connect} from 'react-redux'

import {fetchLocations} from '../actions/locations'
import SearchResults from './SearchResults'

class SearchBar extends React.Component{
  constructor(props){
    super(props)
    this.state={
      query:''
    }
  }

  handleChange(e){
    this.setState(
      {query: e.target.value}
    )
    this.props.dispatch(fetchLocations(e.target.value))
  }

  handleClick(e){
    this.props.dispatch(fetchLocations(this.state.query))
  }

  render(){

    return (
      <div className='search-bar'>
        <input type='search' name='search' placeholder='Search for a city..'
          value={this.state.query}
          onChange={this.handleChange.bind(this)}
          />
        <button onClick={this.handleClick.bind(this)}>GO</button>
        <SearchResults />
      </div>
    )
  }
}

export default connect()(SearchBar)
