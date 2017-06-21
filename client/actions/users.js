export function saveLocationId(id){
  return {
    type:'SAVE_LOCATION_ID',
    id:id
  }
}

export function saveLocationName(resultObject){
  return {
    type:'SAVE_LOCATION_NAME',
    result:resultObject
  }
}

export function saveMinDate(date){
  return {
    type:'SAVE_MIN_DATE',
    date:date
  }
}

export function saveMaxDate(date){
  return {
    type:'SAVE_MAX_DATE',
    date:date
  }
}

export function saveUserDetails(user,image) {
  return {
    type:'SAVE_USER_DETAILS',
    user: user,
    image:image
  }
}
