function location(state={},action){
  switch (action.type){
    case 'FETCH_LOCATIONS_REQUEST':
      return{
        ...state,
        fetching:true,
        message:action.message
      }
    case 'FETCH_LOCATIONS_FAILURE':
      return{
        ...state,
        fetching:false,
        err:action.err
      }
    case 'FETCH_LOCATIONS_SUCCESS':
      return{
        ...state,
        fetching:false,
        name:action.res
      }
    default:
      return state
  }
}

export default location
