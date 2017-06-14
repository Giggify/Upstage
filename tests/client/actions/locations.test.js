import test from 'ava'

import * as actions from '../../../client/actions/locations'

test('fetchLocationsRequest creates an action to indicate fetching', t => {
  const expectedAction = {
    type: 'FETCH_LOCATIONS_REQUEST'
  }
  const actual=actions.fetchLocationsRequest()
  t.deepEqual(actual,expectedAction)
}
)

test('fetchLocationsFailure creates an action and sends err', t => {
  const expectedAction = {
    type: 'FETCH_LOCATIONS_FAILURE',
    err:'shiet'
  }
  const actual=actions.fetchLocationsFailure('shiet')
  t.deepEqual(actual,expectedAction)
})

test('fetchLocationsSuccess creates an action and sends err', t => {
  const expectedAction = {
    type: 'FETCH_LOCATIONS_SUCCESS',
    res:{value:'wellington'}
  }
  const actual=actions.fetchLocationsSuccess({value:'wellington'})
  t.deepEqual(actual,expectedAction)
})
