import {combineReducers} from 'redux'

import users from './users'
import location from './location'

export default combineReducers({
  users,
  location
})
