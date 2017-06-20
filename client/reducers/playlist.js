function playlist(state={playlistLoading: false},action){
  console.log(action)
  switch (action.type){
    case 'TOGGLE_PLAYLIST_LOADING_ON':
      return  {
        ...state,
        playlistLoading:true
      }
    case 'TOGGLE_PLAYLIST_LOADING_OFF':
       return {...state,
         playlistLoading: false
       }
    case 'GET_PLAYLIST_ID':
      return action.playlistID
    default:
      return state
  }
}

export default playlist
