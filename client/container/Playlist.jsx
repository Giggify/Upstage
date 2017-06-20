import React from 'react'
import {connect} from 'react-redux'
import Modal from 'simple-react-modal'
// import ToggleDisplay from 'react-toggle-display'
// import Loading from 'react-loading'

class Playlist extends React.Component {

 constructor(props) {
   super(props)
     this.state = {
       show: props.show,
       loading: props.loading,
       isShowingModal: false
   }
 }

 handleClick = () => this.setState({isShowingModal: true})
 handleClose = () => this.setState({isShowingModal: false})

 render() {
   if(this.props.show && !this.props.loading) {
     return (
       <div className="Playlist">
         <button className="Create-Playlist"onClick={this.handleClick}>Create Playlist</button>
         {
           this.state.isShowingModal &&
             <Modal
               show={this.state.isShowingModal}
               onClose={() => this.handleClose.bind(this)}
               style={{width: "100%"}}
               containerStyle={{background: 'none'}}
               closeOnOuterClick={true}
               >
                 <div style={{width: '100%'}} className="inner-modal">
                   <p style={{width: '100%', marginLeft: '25vh', fontSize: '25px'}} onClick={() => this.handleClose()} >&#10007;</p>
                   <iframe src={`https://open.spotify.com/embed/user/${this.props.user}/playlist/${this.props.playlist}`} width="380" height="450" frameborder="0" allowtransparency="false"></iframe>
                 </div>
             </Modal>
         }
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
 }
}

export default Playlist



// <ToggleDisplay
//   className="LoadPlaylist"
//   show={this.props.loadplaylist}>
//   {/* <Loading type="spin" color="#ff6900" /> */}
// </ToggleDisplay>
