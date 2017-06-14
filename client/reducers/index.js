import {combineReducers} from 'redux'

import users from './users'
import location from './location'
import eventfinda from './eventfinda'

export default combineReducers({
  users,
  location,
  eventfinda
})
