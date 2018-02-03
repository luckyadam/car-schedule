import { createAction } from 'redux-actions'

import {
  CAR_AGE_INPUT,
  CAR_BRAND_SELECT,
  CAR_PASSENGERS_INPUT,
  CAR_NUMBER_INPUT
} from '../constants/car'

export const inputCarNumber = createAction(CAR_NUMBER_INPUT, number => ({ number }))
export const inputCarAge = createAction(CAR_AGE_INPUT, age => ({ age }))
export const inputCarPassengers = createAction(CAR_PASSENGERS_INPUT, passengers => ({ passengers }))
export const inputCarBrand = createAction(CAR_BRAND_SELECT, brand => ({ brand }))
