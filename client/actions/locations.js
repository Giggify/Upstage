var request = require('superagent')

export function fetchLocationsRequest(){
  return{
    type:'FETCH_LOCATIONS_REQUEST'
  }
}

export function fetchLocationsFailure(err){
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


function filterLocation (locations) { //filter location to remove duplicates
    var obj = {};

    for ( var i=0, len=locations.length; i < len; i++ ){
        obj[locations[i]['id']] = locations[i];
    }

    locations = new Array();

    for ( var key in obj ) {
        locations.push(obj[key]);
    }

    return locations

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

          dispatch(fetchLocationsSuccess(filterLocation(res.body)))
        }
      })
  }
}
