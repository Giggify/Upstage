import test from 'ava'

import location from '../../../client/reducers/location'
import * as actions from '../../../client/actions/locations'

test('reducer should return initial state', t => {
  const expectedState = {}
  const actual=location(undefined,{})
  t.deepEqual(actual,expectedState)
}
)

test('reducer should handle FETCH_LOCATIONS_REQUEST by adding loading to store', t=>{
  const expectedState = {fetching:true}
  const actual=location({},actions.fetchLocationsRequest())
  t.deepEqual(actual,expectedState)
})

test('reducer should handle FETCH_LOCATIONS_FAILURE by adding error to store', t=>{
  const expectedState = {fetching:false,err:'shiet'}
  const actual=location({},actions.fetchLocationsFailure('shiet'))
  t.deepEqual(actual,expectedState)
})

test('reducer should handle FETCH_LOCATIONS_SUCCESS by adding result to store', t=>{
  const expectedState = {fetching:false, name:{name:'wellington'}}
  const actual=location({},actions.fetchLocationsSuccess({name:'wellington'}))
  t.deepEqual(actual,expectedState)
})
