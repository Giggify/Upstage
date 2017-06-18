import React from 'react'
import {Chip, Avatar} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class SelectedArtistsBox extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      chipData:[]
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

  renderChip(data){
    console.log(data);
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
      chipData:artists
    })
  }

  render(){
    return(
      <MuiThemeProvider>
      <div style={this.styles.wrapper}>
        {this.state.chipData.map(this.renderChip, this)}
      </div>
    </MuiThemeProvider>
    )
  }
}

export default SelectedArtistsBox
