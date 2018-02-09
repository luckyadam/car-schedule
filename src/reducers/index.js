import { combineReducers } from 'redux'
import user from './user'
import driver from './driver'
import car from './car'
import upload from './upload'

export default combineReducers({
  user,
  driver,
  car,
  upload
})
