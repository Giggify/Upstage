import request from 'superagent'

export function saveLocationId(id){
  return {
    type:'SAVE_LOCATION_ID',
    id:id
  }
}
