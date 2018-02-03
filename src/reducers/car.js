import { handleActions } from 'redux-actions'
import {
  CAR_AGE_INPUT,
  CAR_BRAND_SELECT,
  CAR_PASSENGERS_INPUT,
  CAR_NUMBER_INPUT
} from '../constants/car'

export default handleActions({
  [CAR_AGE_INPUT] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [CAR_BRAND_SELECT] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [CAR_PASSENGERS_INPUT] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [CAR_NUMBER_INPUT] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  }
}, {
  carNumber: null,
  passengers: null,
  age: null,
  brand: null,
  images: []
})
