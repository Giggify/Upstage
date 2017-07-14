export default function artists(state = [], action) {
  let newState = [...state]
    switch (action.type) {
      case 'SAVE_ARTIST':
        let artist = newState.find(artist => artist.name == action.artist.name)
        if (artist) return newState
        return [...state, action.artist]

      case 'DELETE_ARTIST':
        return newState.filter(artist => artist.name != action.artistName)

      case 'CLEAR_ARTIST':
        return newState = []

      default:
        return newState

    }

}
