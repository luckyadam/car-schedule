import { handleActions } from 'redux-actions'
import {
  ADD_CAR,
  DELETE_CAR
} from '../constants/driver'

export default handleActions({
  [ADD_CAR] (state, { car }) {
    const cars = state.cars.concat()
    cars.push(car)
    return {
      ...state,
      cars
    }
  },

  [DELETE_CAR] (state, { index }) {
    const cars = state.cars.concat()
    cars.splice(index, 1)
    return {
      ...state,
      cars
    }
  }
}, {
  id: null,
  cars: []
})
