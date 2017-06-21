function playlist(state = {
    playlistLoading: false,
    playlistID: null,
    tracks: [],
    artists: [],
    topTracks: [],
    selArtists: [],
    selTracks: []
}, action) {
    switch (action.type) {
        case 'TOGGLE_PLAYLIST_LOADING_ON':
            return {
                ...state,
                playlistLoading: true
            }
        case 'TOGGLE_PLAYLIST_LOADING_OFF':
            return {
                ...state,
                playlistLoading: false
            }
        case 'GET_PLAYLIST_ID':
        console.log(action)
            return {
                ...state,
                playlistID: action.playlistID
            }
        case 'SAVE_SELECTED_TRACKS':
          let tracks = state.tracks.concat(action.tracks)
            return {
                ...state,
                tracks: tracks
            }
        case 'SAVE_SELECTED_ARTISTS':
            return {
                ...state,
                artists: action.artists
            }
        case 'SAVE_SELECTION':
          return {
            ...state,
            selTracks: action.tracks,
            selArtists: action.artists
          }
        case 'SAVE_TOP_TRACKS':
            return {
                ...state,
              topTracks: [...state.topTracks, action.newObj] //we need to change this one so it adds tracks on the end not overwrites the whole thing
            }
        default:
            return state
    }
}

export default playlist
