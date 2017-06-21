var request = require('superagent')

export function fetchEventsRequest(){
  return{
    type:'FETCH_EVENTS_REQUEST'
  }
}

export function fetchEventsFailure(err){
  return{
    type:'FETCH_EVENTS_FAILURE',
    err
  }
}

export function fetchEventsSuccess(res){
  return{
    type:'FETCH_EVENTS_SUCCESS',
    res
  }
}

export function fetchEvents(locationID){
  return (dispatch) => {
    dispatch(fetchEventsRequest())
    request
      .get(`/api/v1/events/${locationID}`)
      .end((err, res)=>{
        if (err) {
          dispatch((fetchEventsFailure(err)))
        } else {
          dispatch((fetchEventsSuccess(res.body)))
        }
      })
  }
}
