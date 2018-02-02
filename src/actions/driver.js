import { createAction } from 'redux-actions'

import {
  DRIVER_ID_INPUT,
  DRIVER_USERNAME_INPUT,
  DRIVER_PHONE_INPUT
} from '../constants/driver'

export const inputDriverUsername = createAction(DRIVER_USERNAME_INPUT, username => ({ username }))
export const inputDriverId = createAction(DRIVER_ID_INPUT, idNumber => ({ idNumber }))
export const inputDriverPhone = createAction(DRIVER_PHONE_INPUT, phoneNumber => ({ phoneNumber }))
