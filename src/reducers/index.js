import { combineReducers } from 'redux'
import user from './user'
import car from './car'
import upload from './upload'
import message from './message'
import trip from './trip'

export default combineReducers({
  user,
  car,
  upload,
  message,
  trip
})
