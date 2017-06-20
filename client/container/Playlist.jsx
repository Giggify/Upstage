import React from 'react'
import {connect} from 'react-redux'
import Modal from 'simple-react-modal'
import ToggleDisplay from 'react-toggle-display'
import Loading from 'react-loading'

import {createPlayList} from '../actions/playlist'

class Playlist extends React.Component {

  create() {
    const tracks = {"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"]}
    this.props.dispatch(createPlayList(tracks))
  }

  closeModal = () => this.setState({isShowingModal: false})


 render() {
   if(!this.props.playlistLoading && !this.props.playlistID) {
     return (
       <div className="Playlist">
         <button onClick={ () => this.create() }>Create Playlist </button>
       </div>
     )
   } else if(this.props.playlistLoading && !this.props.playlistID) {
     return (
       <div className="Playlist">
          <Loading type='bars' color='#ff6900' height='667' width='500'/>
       </div>
     )
   } else if(!this.props.playlistLoading && this.props.playlistID) {
     return (
       <div className="Playlist">
         <button className="Create-Playlist"onClick={this.create}>Create Playlist</button>
             <Modal
               show={true}
               onClose={() => this.closeModal.bind(this)}
               style={{width: "100%"}}
               containerStyle={{background: 'none'}}
               closeOnOuterClick={true}
               >
               <div style={{width: '100%'}} className="inner-modal">
                 <p style={{width: '100%', marginLeft: '25vh', fontSize: '25px'}} onClick={() => this.closeModal()} >&#10007;</p>
                 <iframe src={`https://open.spotify.com/embed/user/${this.props.user}/playlist/${this.props.playlistID}`} width="380" height="450" frameborder="0" allowtransparency="false"></iframe>
               </div>
             </Modal>
       </div>
     )
   }
 }
}

const mapStateToProps  = (state)  => {
  return {
    playlistLoading: state.playlist.playlistLoading,
    error: state.error,
    playlistID: state.playlist.playlistID
  }
}
export default connect(mapStateToProps)(Playlist)
