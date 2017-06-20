import React from 'react'
import {Chip, Avatar} from 'material-ui'

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';

class SelectedArtistsBox extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      chipData:[],
      open: false

    }
    this.styles = {
      chip:{
        margin:4,
      },
      wrapper: {
        display:'flex',
        flexWrap:'wrap'
      }
    }
  }

  handleRequestDelete = (key) => {
    this.chipData = this.state.chipData
    const chipToDelete = this.chipData.map((chip)=>chip.key).indexOf(key)
    this.chipData.splice(chipToDelete,1)
    this.setState({chipData: this.chipData})
    this.props.deleteArtist(key)
  }


   handleToggle = () => {
       console.log(this.props)
       this.props.handlePlaylist()
       this.setState({open: !this.state.open});
   }

   handleClose = () => this.setState({open: false});

  renderChip(data){
    return(
      <Chip
        key={data.key}
        onRequestDelete={()=> this.handleRequestDelete(data.key)}
        style={this.styles.chip}>
        <Avatar src='http://www.freepngimg.com/thumb/kanye_west/1-2-kanye-west-png-hd-thumb.png' />
        {data.label}
      </Chip>
    )
  }

  componentWillReceiveProps(nextprops){
    let artists = nextprops.artists.map((artist,index)=>{
      return(
        {key: index, label: artist}
      )
    })
    this.setState({
      chipData:artists,
      open: true
    })
  }

  render(){
    return(
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div>

      <Drawer
        docked={false}
        width={200}
        open={this.state.open}
        onRequestChange={(open) => this.setState({open})}
        >
       <div style={this.styles.wrapper}>
          {this.state.chipData.map(this.renderChip, this)}
       </div>
       <RaisedButton
                   label="Create Playlist"
                   onClick={this.handleToggle}
        />
      </Drawer>
      </div>
    </MuiThemeProvider>
    )
  }
}

export default SelectedArtistsBox
