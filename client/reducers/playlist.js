function playlist(state = {
    playlistLoading: false,
    playlistID: null,
    tracks: [],
    artists: [],
    topTracks: []
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
            return {
                ...state,
                playlistID: action.playlistID
            }
        case 'SAVE_SELECTED_TRACKS':
            return {
                ...state,
                tracks: action.tracks
            }
        case 'SAVE_SELECTED_ARTISTS':
            return {
                ...state,
                artists: action.artists
            }
        case 'SAVE_TOP_TRACKS':
            return {
                ...state,
                topTracks: action.topTracks
            }
        default:
            return state
    }
}

export default playlist
