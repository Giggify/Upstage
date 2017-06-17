import test from 'ava'

import * as actions from '../../../client/actions/users'

test('saveLocationId creates an action that gives id chosen by user to reducer', t=>{
  const expectedAction = {
    type:'SAVE_LOCATION_ID',
    id:31455
  }
  const actual=actions.saveLocationId(31455)
  t.deepEqual(actual,expectedAction)
})

test('saveLocationName creates an action that gives city name chosen by user to reducer', t=>{
  let data = {
    id:31455,
    name:'wellington',
    state:'',
    country:'New Zealand'
  }
  const expectedAction = {
    type:'SAVE_LOCATION_NAME',
    result:data
  }
  const actual=actions.saveLocationName(data)
  t.deepEqual(actual,expectedAction)
})
