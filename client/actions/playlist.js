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

export function toggleArtist(artist, artistTracks, selArtists, selTracks, dispatch) {
  if(selArtists.indexOf(artist) == -1) {
    // console.log("start of toggleArtist");
    // console.log(artist);
    // console.log(artistTracks);
    // console.log(selArtists);
    mapTracksArray(artistTracks, selTracks, dispatch)
    let updatedArtists = [...selArtists, artist]
    dispatch(saveSelectedArtists(updatedArtists))
  }
  else {
    let updatedTracks = removeTrackIfExists(artistTracks,selTracks)
    let updatedArtists = selArtists.filter((name)=> name != artist)
    dispatch(saveSelectedArtists(updatedArtists))
    dispatch(saveSelectedTracks(updatedTracks))
  }
}


export function createPlaylist (tracks) {
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
        }
      })
  }
}

export function addTracksToPlaylist (tracks, playlist_id) {
  console.log('test');
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
  console.log(selTracks);
  // console.log(tracksArray);
  console.log("selTracks, tracksArray");
  tracksArray.forEach((track) => selTracks.push(track))
  dispatch(saveSelectedTracks(selTracks))
}

export function removeTrackIfExists(tracksArray, oldTracksArray) {
  return oldTracksArray.filter((track) => {
    return tracksArray.indexOf(track) == -1
  })
}
