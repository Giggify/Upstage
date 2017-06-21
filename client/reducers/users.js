function users (state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_USERS':
      return [...action.users]
    case 'SAVE_LOCATION_ID':
      return{
        ...state,
        locationID:action.id
      }
    case 'SAVE_LOCATION_NAME':
      return{
        ...state,
        city:action.result.name,
        state:action.result.state,
        country:action.result.country
      }
    case 'SAVE_MIN_DATE':
      return{
        ...state,
        minDate:action.date
      }
    case 'SAVE_MAX_DATE':
      return{
        ...state,
        maxDate:action.date
      }
    case 'SAVE_USER_DETAILS':
      return{
        ...state,
        user: action.user,
        image: action.image
      }
    default:
      return state
  }
}

export default users
