import { combineReducers } from 'redux'
import user from './user'
import car from './car'
import upload from './upload'
import message from './message'

export default combineReducers({
  user,
  car,
  upload,
  message
})
