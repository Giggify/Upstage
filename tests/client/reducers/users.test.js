import test from 'ava'

import users from '../../../client/reducers/users'
import * as actions from '../../../client/actions/users'

const initialState=[]

test('users reducer handles SAVE_LOCATION_ID by adding id to state', t=>{
  const expectedState = [{locationID:12345}]
  const actual = users(initialState,actions.saveLocationId(12345))
  t.deepEqual(expectedState,actual)
})
