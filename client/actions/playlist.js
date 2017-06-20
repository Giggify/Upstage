var request = require('superagent')

export function getPlaylistId(playlistID){
  return {
    type: 'GET_PLAYLIST_ID',
    playlistID
  }
}

// export function addTracksToPlaylist(playlistID) {
//   request
// }

export function playlistError (message) {
  return {
    type: 'THROW_ERROR',
    message
  }
}

export const changeLoadState = (newLoadState) => {
  return newLoadState ?
    {type: 'TOGGLE_PLAYLIST_LOADING_ON'} :
    {type: 'TOGGLE_PLAYLIST_LOADING_OFF'}
}

export function clearPlaylistError () {
  return {
    type: 'CLEAR_ERROR'
  }
}

export function createPlayList () {
  return (dispatch) => {
    dispatch(changeLoadState(true))
    request
      .post(`/api/v1/spotify/users/playlist`)
      .send({
        "name": "Upstage Playlist",
        "public": true,
        "collaborative": false,
        "description": "Top tracks from artists performing near you"
      })
      .end((err, res)=>{
        if (err) {
          dispatch(changeLoadState(false))
          dispatch((playlistError(err.message)))
        } else {
          dispatch(clearPlaylistError())
          dispatch(getPlaylistId(res.body.id))
          dispatch(addTracksToPlaylist(tracks, res.body.id))
          dispatch(changeLoadState(false))

        }
      })
  }
}

export function addTracksToPlaylist (tracks, playlist_id) {
    return (dispatch) => {
        request
            .post(`/api/v1/spotify/users/playlist/${playlist_id}/tracks`)
            .send(tracks)
            .end((err, res)=>{
              if (err) {
                dispatch(changeLoadState(false))
                dispatch((playlistError(err.message)))
              } else {
                dispatch(clearPlaylistError())
                dispatch(changeLoadState(false))
              }
            })
    }
}
