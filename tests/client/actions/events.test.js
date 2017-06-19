import test from 'ava'
import nock from 'nock'
import sinon from 'sinon'

import * as actions from '../../../client/actions/events'
import * as helperData from '../helpers/apiSampleData'

test.cb('fetchEvents dispatches correct series of actions', t=>{
  const scope = nock('http://localhost:80')
    .get('/api/v1/events/31433')
    .reply(200,helperData.events)

  const dispatch = sinon.stub()
    .onFirstCall()
    .callsFake((action)=>{
      t.deepEqual(action,{
        type:'FETCH_EVENTS_REQUEST'
      })
    })
    .onSecondCall()
    .callsFake((action) =>{
      t.deepEqual(action,{
        type:'FETCH_EVENTS_SUCCESS',
        res:helperData.events
      })
      t.end()
    })
  actions.fetchEvents(31433)(dispatch)
})
