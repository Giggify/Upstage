import React from 'react'
import {connect} from 'react-redux'
// import ToggleDisplay from 'react-toggle-display'
// import Loading from 'react-loading'

class Playlist extends React.Component {

 constructor(props) {
   super(props)
     this.state = {
       show: props.show,
       loading: props.loading
   }
 }

 render() {
   if(this.props.show && !this.props.loading) {
     return (
       <div className="Playlist">
         <iframe src={`https://open.spotify.com/embed/user/${this.props.user}/playlist/${this.props.playlist}`} width="300" height="380" frameBorder="0" allowTransparency="true"></iframe>
       </div>
     )
   }
  else if(this.props.show && this.props.loading){
    return (
      <div className="Playlist">
          <p>Creating Playlist: This is where we put that orange spinny wheel!</p>
      </div>
    )
  }
  else if (!this.props.show) {
    return (
      <div className="Playlist">
        <button onClick={ () => this.props.handlePlaylist() }>Create Playlist</button>
      </div>
    )
  }
 }
}

export default Playlist



// <ToggleDisplay
//   className="LoadPlaylist"
//   show={this.props.loadplaylist}>
//   {/* <Loading type="spin" color="#ff6900" /> */}
// </ToggleDisplay>
