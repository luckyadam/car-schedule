import { createAction } from 'redux-actions'
import wepy from 'wepy'

import { GET_USER, GET_USER_ERROR, GET_USER_SUCCESS, SET_USER_ROLE } from '../constants/user'
import { API_USER } from '../utils/api'

export const getUserIng = createAction(GET_USER)
export const getUserError = createAction(GET_USER_ERROR)
export const getUserSuccess = createAction(GET_USER_SUCCESS)
export const setUserRole = createAction(SET_USER_ROLE, role => ({ role }))

export function fetchUser () {
  return async dispatch => {
    dispatch(getUserIng())
    try {
      const authorization = wepy.getStorageSync('authorization')
      let userInfo
      // 本地存在authorization，表示之前已经请求登录过
      if (authorization) {
        userInfo = await wepy.request({
          url: API_USER,
          method: 'GET',
          header: {
            authorization: `JWT ${authorization}`
          }
        })
      } else { // 请求微信登录获取相关信息
        const loginRes = await wepy.login()
        const userData = await wepy.getUserInfo()
        userInfo = await wepy.request({
          url: API_USER,
          data: {
            code: loginRes.code,
            iv: userData.iv,
            encryptedData: userData.encryptedData
          },
          method: 'POST'
        }).then(userData => userData.data)
        wepy.setStorageSync('authorization', userInfo.token)
      }
      dispatch(getUserSuccess({
        userInfo
      }))
    } catch (err) {
      dispatch(getUserError())
    }
  }
}
