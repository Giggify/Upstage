import React from 'react'
import {connect} from 'react-redux'
import ToggleDisplay from 'react-toggle-display'
import Loading from 'react-loading'

class Playlist extends React.Component {

 constructor() {
   super();
   this.state = { show: false };
 }

 handleClick() {
   this.setState({
     show: !this.state.show
   });
 }

 render() {
   return (
     <div className="Playlist">
         <button onClick={ () => this.handleClick() }>Create Playlist</button>
       <ToggleDisplay show={this.state.show}>
  <iframe src={`https://open.spotify.com/embed/user/${this.state.username}/playlist/${this.state.stuff}`} width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
       </ToggleDisplay>
     </div>
   )
 }
}

export default Playlist



// <ToggleDisplay
//   className="LoadPlaylist"
//   show={this.props.loadplaylist}>
//   {/* <Loading type="spin" color="#ff6900" /> */}
// </ToggleDisplay>
