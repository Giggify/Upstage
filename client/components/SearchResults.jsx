import React from 'react'
import {connect} from 'react-redux'

class SearchResults extends React.Component{
  render(){
    return(
      <div className='search-results'>
        {this.props.results && this.props.results.map((result)=>{return(
          <div>{result}</div>
        )})}
      </div>
    )
  }
}

let mapState2Props = (state)=>{
  return{
    results:state.location.name
  }
}

export default connect(mapState2Props)(SearchResults)
