import test from 'ava'
import nock from 'nock'
import sinon from 'sinon'

import * as actions from '../../../client/actions/locations'
import * as helperData from '../helpers/apiSampleData'

test.cb('fetchLocations dispatches correct series of actions', t=>{
  const scope = nock('http://localhost:80')
    .get('/api/v1/metros/city/wellington')
    .reply(200,helperData.locations)

  const dispatch = sinon.stub()
    .onFirstCall()
    .callsFake((action)=>{
      t.deepEqual(action,
        {type:'FETCH_LOCATIONS_REQUEST',
        message:'Searching locations...'}
      )
    })
    .onSecondCall()
    .callsFake((action) => {
      t.is(action.type, 'FETCH_LOCATIONS_SUCCESS')
      t.end()
    })

  actions.fetchLocations("wellington")(dispatch)

})

test('filterLocation remove duplicates in results', t=>{
  const expected=helperData.locations
  const actual=actions.filterLocation([...helperData.locations,...helperData.locations])
  t.deepEqual(actual,expected)
})

test('fetchLocationsRequest creates an action to indicate fetching', t => {
  const expectedAction = {
    type: 'FETCH_LOCATIONS_REQUEST',
    message:'Searching locations...'
  }
  const actual=actions.fetchLocationsRequest()
  t.deepEqual(actual,expectedAction)
}
)

test('fetchLocationsFailure creates an action and sends err', t => {
  const expectedAction = {
    type: 'FETCH_LOCATIONS_FAILURE',
    err:'failure'
  }
  const actual=actions.fetchLocationsFailure('failure')
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
