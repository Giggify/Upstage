var request = require('superagent')

export function fetchLocationsRequest(){
  return{
    type:'FETCH_LOCATIONS_REQUEST'
  }
}

export function fetchLocationsFailure(err){
  alert(err);
  return{
    type:'FETCH_LOCATIONS_FAILURE',
    err
  }
}

export function fetchLocationsSuccess(res){
  return{
    type:'FETCH_LOCATIONS_SUCCESS',
    res
  }
}

export function fetchLocations(cityName){
  return (dispatch) => {
    dispatch(fetchLocationsRequest())
    request
      .get(`/api/v1/metros/city/${cityName}`)
      .end((err, res)=>{
        if (err) {
          dispatch((fetchLocationsFailure(err)))
        } else {
          dispatch((fetchLocationsSuccess(res.body)))
        }
      })
  }
}
