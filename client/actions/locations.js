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

export function fetchLocations(query){
  return (dispatch) => {
    dispatch(fetchLocationsRequest())
    request
      .get(`http://www.reddit.com/r/${query}.json`)
      .end((err, res)=>{
        if (err) {
          dispatch((fetchLocationsFailure(err)))
        } else {
          let results=(res.body.data.children)
          let result=results.map((each)=>each.data.author)
          dispatch((fetchLocationsSuccess(result)))
        }
      })
  }
}
