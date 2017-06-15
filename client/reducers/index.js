import {combineReducers} from 'redux'

import users from './users'
import location from './location'
import events from './events'

export default combineReducers({
  users,
  location,
  events
})
