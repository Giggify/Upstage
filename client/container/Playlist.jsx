import React from 'react'
import {connect} from 'react-redux'
import Modal from 'simple-react-modal'
import Loading from 'react-loading'

class Playlist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playlistID: props.playlistID,
      playlistLoading: props.playlistLoading,
      isShowingModal: true
    }
  }
  componentWillReceiveProps({playlistLoading, playlistID}) {
    if (playlistID != this.state.playlistID) {
      this.setState({isShowingModal: true})
    }
    this.setState({playlistLoading, playlistID})
  }

  closeModal = () => this.setState({isShowingModal: false})


 render() {
   if(!this.state.playlistLoading && !this.state.playlistID) {
     return (
       <div className="Playlist">

       </div>
     )
   } else if(this.state.playlistLoading && !this.state.playlistID) {
     return (
       <div className="Loading">
          <Loading type='bars' color='#ff6900' height='500' width='400'/>
       </div>
     )
   } else if(!this.state.playlistLoading && this.state.playlistID) {
     return (
       <div className="Playlist">
             <Modal
               show={this.state.isShowingModal}
               onClose={() => this.closeModal.bind(this)}
               style={{width: "100%"}}
               containerStyle={{background: 'none'}}
               closeOnOuterClick={true}
               >
               <div style={{width: '100%'}} className="inner-modal">
                 <p style={{width: '100%', marginLeft: '25vh', fontSize: '25px', color:'#ff6900'}} onClick={() => this.closeModal()} >&#10007;</p>
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
    playlistID: state.playlist.playlistID,
    user: state.users.user
  }
}
export default connect(mapStateToProps)(Playlist)
