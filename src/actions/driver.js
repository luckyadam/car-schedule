import { createAction } from 'redux-actions'

import {
  ADD_CAR,
  DELETE_CAR
} from '../constants/driver'

export const addCar = createAction(ADD_CAR, car => car)
export const deleteCar = createAction(DELETE_CAR, index => index)
