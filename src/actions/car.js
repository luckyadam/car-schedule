import { createAction } from 'redux-actions'

import {
  CAR_LICENSE_INPUT,
  CAR_NUMBER_INPUT,
  CAR_AGE_INPUT,
  CAR_BRAND_SELECT,
  CAR_SYSTEM_SELECT,
  CAR_COMPANY_INPUT,
  CAR_BELONGTO_SELECT,
  INIT_CAR
} from '../constants/car'

export const inputCarLicense = createAction(CAR_LICENSE_INPUT, license => ({ license }))
export const inputCarNumber = createAction(CAR_NUMBER_INPUT, carNumber => ({ carNumber }))
export const inputCarAge = createAction(CAR_AGE_INPUT, age => ({ age }))
export const inputCarBrand = createAction(CAR_BRAND_SELECT, brand => ({ brand }))
export const inputCarSystem = createAction(CAR_SYSTEM_SELECT, system => ({ system }))
export const inputCarCompany = createAction(CAR_COMPANY_INPUT, company => ({ company }))
export const inputCarBelongTo = createAction(CAR_BELONGTO_SELECT, belongTo => ({ belongTo }))
export const initCar = createAction(INIT_CAR, car => car)
