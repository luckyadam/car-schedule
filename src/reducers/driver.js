import { handleActions } from 'redux-actions'
import {
  DRIVER_ID_INPUT,
  DRIVER_USERNAME_INPUT,
  DRIVER_PHONE_INPUT
} from '../constants/driver'

export default handleActions({
  [DRIVER_ID_INPUT] (state, action) {
    return {
      ...state,
      idNumber: action.payload.idNumber
    }
  },

  [DRIVER_USERNAME_INPUT] (state, action) {
    return {
      ...state,
      username: action.payload.username
    }
  },

  [DRIVER_PHONE_INPUT] (state, action) {
    return {
      ...state,
      phoneNumber: action.payload.phoneNumber
    }
  }
}, {
  username: null,
  phoneNumber: null,
  idNumber: null
})
