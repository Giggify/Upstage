function events(state={},action){
  switch (action.type){
    case 'FETCH_EVENTS_REQUEST':
      return{
        ...state,
        fetching:true
      }
    case 'FETCH_EVENTS_FAILURE':
      return{
        ...state,
        fetching:false,
        err:action.err
      }
    case 'FETCH_EVENTS_SUCCESS':
      return{
        ...state,
        fetching:false,
        events:action.res.events,
        artists: action.res.artists
      }
    default:
      return state
  }
}

export default events
