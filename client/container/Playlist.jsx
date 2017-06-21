import React from 'react'
import {connect} from 'react-redux'
import Modal from 'simple-react-modal'
import ToggleDisplay from 'react-toggle-display'
import Loading from 'react-loading'

class Playlist extends React.Component {

 constructor(props) {
   super(props)
     this.state = {
       show: props.show,
       loading: props.loading
   }
 }


 render() {
   return(
     this.props.loading ? <div className="Playlist">
         <p>Creating Playlist....It might take a while :P</p>
     </div> : <div className="Playlist">
       <iframe src={`https://open.spotify.com/embed/user/${this.props.user}/playlist/${this.props.playlist}`} width="300" height="380" frameBorder="0" allowTransparency="true"></iframe>
     </div>
   )
  }
}

export default Playlist
