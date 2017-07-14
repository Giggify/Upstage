var request = require('superagent')

export function getPlaylistId(playlistID){
  return {
    type: 'GET_PLAYLIST_ID',
    playlistID
  }
}

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

export function saveSelectedTracks(tracks) {
  return {
    type: 'SAVE_SELECTED_TRACKS',
    tracks
  }
}
export function saveSelectedArtists(artists) {
  return {
    type: 'SAVE_SELECTED_ARTISTS',
    artists
  }
}


export function saveTopTracks(artistName, topTracks) {
  let newObj = {[artistName]: topTracks}
  return {
    type: 'SAVE_TOP_TRACKS',
    newObj
  }
}

export function saveSelection(updatedArtists, updatedTracks) {
  return {
    type: 'SAVE_SELECTION',
    updatedArtists, updatedTracks
  }
}

export function addArtist(name, tracks) {
  return {
    type: 'SAVE_ARTIST',
    artist:{name, tracks}
  }
}

export function deleteArtist (artistName) {
  return {
    type: 'DELETE_ARTIST',
    artistName
  }
}

export function clearArtist () {
    return {
        type: 'CLEAR_ARTIST'
    }
}

export function createPlaylist (tracks) {
  return (dispatch) => {
    dispatch(changeLoadState(true))
    request
      .post(`/api/v1/spotify/users/createplaylist`)
      .send(format(tracks))
      .end((err, res)=>{
        if (err) {
          dispatch(changeLoadState(false))
          dispatch((playlistError(err.message)))
        } else {
          dispatch(clearPlaylistError())
          dispatch(changeLoadState(false))
          dispatch(getPlaylistId(res.text))
        }
      })
  }
}

export function addTracksToPlaylist (tracks, playlist_id) {
    let formattedTracks = format(tracks)
    return (dispatch) => {
        request
            .post(`/api/v1/spotify/users/playlist/${playlist_id}/tracks`)
            .send(formattedTracks)
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

export function format(tracks) { //I dont think this needs export? Or anything below
  return tracks.map((track) =>
      `spotify:track:${track}`)
}

export function mapTracksArray(tracksArray, selTracks, dispatch) {
  tracksArray.forEach((track) => selTracks.push(track))
  dispatch(saveSelectedTracks(selTracks))
}

export function removeTrackIfExists(tracksArray, oldTracksArray) {
  return oldTracksArray.filter((track) => {
    return tracksArray.indexOf(track) == -1
  })
}
