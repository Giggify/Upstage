import React from 'react'

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
    console.log('banana', this.state.query)
  }

  render(){
    return (
      <div className='search-bar'>
        <input type='text' name='search' placeholder='Search for a city..'
          value={this.state.query}
          onChange={this.handleChange.bind(this)}/>
      </div>
    )
  }
}

export default SearchBar
