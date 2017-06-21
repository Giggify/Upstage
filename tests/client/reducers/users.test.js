import test from 'ava'

import users from '../../../client/reducers/users'
import * as actions from '../../../client/actions/users'

const initialState={}

test('users reducer handles SAVE_LOCATION_ID by adding id to state', t=>{
  const expectedState = {locationID:12345}
  const actual = users(initialState,actions.saveLocationId(12345))
  t.deepEqual(expectedState,actual)
})

test('users reducer handles SAVE_LOCATION_NAME by adding city info to state', t=>{
  let data = {
    id:31455,
    name:'wellington',
    state:'',
    country:'New Zealand'
  }
  const expectedState = {
    city:'wellington',
    state:'',
    country:'New Zealand'
  }
  const actual = users(initialState,actions.saveLocationName(data))
  t.deepEqual(expectedState,actual)
})

test('users reducer handles SAVE_MIN_DATE and SAVE_MAX_DATE by adding the dates to state', t=>{
  let minDate = 'Sat Jun 17 2017 00:00:00 GMT+1200 (NZST)'
  let maxDate = 'Sun Jun 18 2017 00:00:00 GMT+1200 (NZST)'
  const expectedStateMin = {
    minDate:minDate
  }
  const expectedStateMax = {
    maxDate:maxDate
  }
  const actualMin = users(initialState,actions.saveMinDate(minDate))
  const actualMax = users(initialState,actions.saveMaxDate(maxDate))
  t.deepEqual(expectedStateMin,actualMin)
  t.deepEqual(expectedStateMax,actualMax)
})
