function users (state = [], action) {
  switch (action.type) {
    case 'RECEIVE_USERS':
      return [...action.users]
    case 'SAVE_LOCATION_ID':
      return[
        {locationID:action.id}
      ]
    default:
      return state
  }
}

export default users
