import { handleActions } from 'redux-actions'

import {
  SET_TRIP_TYPE,
  SET_TRIP_INFO
} from '../constants/trip'

export default handleActions({
  [SET_TRIP_TYPE] (state, action) {
    return {
      ...state,
      type: action.payload
    }
  },
  [SET_TRIP_INFO] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  }
}, {
  type: 'new',
  from: 'add'
})
