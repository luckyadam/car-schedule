import { createAction } from 'redux-actions'
import { SET_TRIP_TYPE, SET_TRIP_INFO } from '../constants/trip'

export const setTripType = createAction(SET_TRIP_TYPE, type => type)
export const setTripInfo = createAction(SET_TRIP_INFO, info => info)
