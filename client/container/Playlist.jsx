import React from 'react'
import {connect} from 'react-redux'
import Modal from 'simple-react-modal'
import ToggleDisplay from 'react-toggle-display'
import Loading from 'react-loading'

import {fetchPlaylistId} from '../actions/playlist'

class Playlist extends React.Component {

 // handleClick = () => this.setState({isShowingModal: true})
 // this.props.handlePlaylist
 handleClick() {
   //this.setState({loading: true})
   this.props.dispatch(fetchPlaylistId())
 }
 // handleClose = () => this.setState({isShowingModal: false})

 render() {
   console.log(this.props);
   if(!this.props.playlistLoading && !this.props.playlistID) {
     console.log('not loading')
     return (
       <div className="Playlist">
         <button onClick={ () => this.handleClick() }>Create Playlist </button>
       </div>
     )
   } else if(this.props.playlistLoading && !this.props.playlistID) {
     console.log(' loading')
     return (
       <div className="Playlist">
          <Loading type='bars' color='#ff6900' height='667' width='500'/>
       </div>
     )
   } else if(!this.props.playlistLoading && this.props.playlistID) {
     console.log('loaded')
     return (
       <div className="Playlist">
         <button className="Create-Playlist"onClick={this.handleClick}>Create Playlist</button>
             <Modal
               show={this.state.isShowingModal}
               onClose={() => this.handleClose.bind(this)}
               style={{width: "100%"}}
               containerStyle={{background: 'none'}}
               closeOnOuterClick={true}
               >
               <div style={{width: '100%'}} className="inner-modal">
                 <p style={{width: '100%', marginLeft: '25vh', fontSize: '25px'}} onClick={() => this.handleClose()} >&#10007;</p>
                 <iframe src={`https://open.spotify.com/embed/user/${this.props.user}/playlist/${this.props.playlistID}`} width="380" height="450" frameborder="0" allowtransparency="false"></iframe>
               </div>
             </Modal>
       </div>
     )
   }
 }
}

const mapStateToProps = (state) => {
  return {
    playlistLoading: state.playlistLoading,
    error: state.error,
    playlistID: state.playlistID
  }
}

Playlist = connect(mapStateToProps)(Playlist)
export default Playlist
