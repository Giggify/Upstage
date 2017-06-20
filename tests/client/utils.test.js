import test from 'ava'

import{filterEventsbyDates} from '../../client/utils'
import {events} from './helpers/componentSampleData'

const minDate= 'Thu Jun 22 2017 00:00:00 GMT+1200 (NZST)'
const maxDate= 'Fri Jun 23 2017 00:00:00 GMT+1200 (NZST)'

test('filterEventsbyDates returns a new array or undefined', t=>{
  const afterFilter=filterEventsbyDates(minDate,maxDate,events)
  let expectedArray=[...events]
  expectedArray.splice(3,1)//filter should filter out the fourth event from sample
  const expected=expectedArray
  t.is(afterFilter.length,expected.length)
})
