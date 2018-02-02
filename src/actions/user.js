import { createAction } from 'redux-actions'
import wepy from 'wepy'

import { GET_USER, GET_USER_ERROR, GET_USER_SUCCESS } from '../constants/user'

export const getUserIng = createAction(GET_USER)
export const getUserError = createAction(GET_USER_ERROR)
export const getUserSuccess = createAction(GET_USER_SUCCESS)

export function fetchUser () {
  return async dispatch => {
    dispatch(getUserIng())
    try {
      const loginRes = await wepy.login()
      const userData = await wepy.getUserInfo()
      dispatch(getUserSuccess({
        ...loginRes,
        ...userData
      }))
    } catch (err) {
      dispatch(getUserError())
    }
  }
}
