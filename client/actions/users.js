import request from 'superagent'

export function saveLocationId(id){
  console.log('am i being called')
  return {
    type:'SAVE_LOCATION_ID',
    id:id
  }
}
export function saveLocationName(resultObject){
  console.log('kanye')
  return {
    type:'SAVE_LOCATION_NAME',
    result:resultObject
  }
}
