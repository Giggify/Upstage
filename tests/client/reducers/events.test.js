import test from 'ava'

import events from '../../../client/reducers/events'
import * as actions from '../../../client/actions/events'

test('reducer should return initial state', t => {
  const expectedState = {}
  const actual=location(undefined,{})
  t.deepEqual(actual,expectedState)
}
)

test('reducer should handle FETCH_EVENTS_REQUEST by adding loading to store', t=>{
  const expectedState = {fetching:true}
  const actual=location({},actions.fetchEventsRequest())
  t.deepEqual(actual,expectedState)
})

test('reducer should handle FETCH_EVENTS_FAILURE by adding error to store', t=>{
  const expectedState = {fetching:false,err:'failure'}
  const actual=location({},actions.fetchEventsFailure('failure'))
  t.deepEqual(actual,expectedState)
})

test('reducer should handle FETCH_EVENTS_SUCCESS by adding result to store', t=>{
  const expectedState = {fetching:false, name:{name:'wellington'}}
  const actual=location({},actions.fetchEventsSuccess({name:'wellington'}))
  t.deepEqual(actual,expectedState)
})
