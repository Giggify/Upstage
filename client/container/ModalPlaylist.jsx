import React from 'react'
import {connect} from 'react-redux'
import Modal from 'simple-react-modal'

class Playlist extends React.Component {
  constructor() {
    super()
      this.state = {
        isShowingModal: false
      }
    }
handleClick = () => this.setState({isShowingModal: true})
handleClose = () => this.setState({isShowingModal: false})

render() {
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
}

export default Playlist
