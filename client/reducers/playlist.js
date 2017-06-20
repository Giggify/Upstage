function playlist(state={playlistLoading: false, playlistID: null},action){
  console.log(action)
  switch (action.type){
    case 'TOGGLE_PLAYLIST_LOADING_ON':
      return  {
        playlistLoading:true
      }
    case 'TOGGLE_PLAYLIST_LOADING_OFF':
       return {
         playlistLoading: false
       }
    case 'GET_PLAYLIST_ID':
      return {...state,
        playlistID: action.playlistID
      }
      case 'SAVE_SELECTED_TRACKS':
        return {
          ...state,
          tracks: action.selectedTracks
        }
      case 'SAVE_SELECTED_ARTISTS':
        return {
          ...state,
          artists: action.selectedArtists
        }
    default:
      return state
  }
}

export default playlist
