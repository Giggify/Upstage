import {combineReducers} from 'redux'

import users from './users'
import location from './location'
import events from './events'
import playlist from './playlist'
import artists from './artists'

export default combineReducers({
  users,
  location,
  events,
  playlist,
  artists
})
