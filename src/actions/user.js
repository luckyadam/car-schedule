import { createAction } from 'redux-actions'
import wepy from 'wepy'

import {
  GET_USER,
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  SET_USER_ROLE,
  USER_USERNAME_INPUT,
  USER_TELEPHONE_INPUT,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  USER_LOGIN_ERROR
} from '../constants/user'
import { API_USER } from '../utils/api'

export const getUserIng = createAction(GET_USER)
export const getUserSuccess = createAction(GET_USER_SUCCESS)
export const getUserError = createAction(GET_USER_ERROR, errorObj => ({ errorObj }))
export const setUserRole = createAction(SET_USER_ROLE, role => ({ role }))
export const inputUsername = createAction(USER_USERNAME_INPUT, username => ({ username }))
export const inputTelephone = createAction(USER_TELEPHONE_INPUT, telephone => ({ telephone }))

export const updateUserIng = createAction(UPDATE_USER)
export const updateUserError = createAction(UPDATE_USER_ERROR)
export const updateUserSuccess = createAction(UPDATE_USER_SUCCESS)
export const userLoginError = createAction(USER_LOGIN_ERROR)

export async function fetchInitialUserInfo () {
  try {
    const loginRes = await wepy.login()
    const userData = await wepy.getUserInfo()
    const userInfo = await wepy.request({
      url: API_USER,
      data: {
        code: loginRes.code,
        iv: userData.iv,
        encryptedData: userData.encryptedData
      },
      method: 'POST'
    }).then(userData => userData.data)
    wepy.setStorageSync('authorization', userInfo.token)
    return userInfo
  } catch (err) {
    console.log('微信登录或用户接口故障')
    return await fetchInitialUserInfo()
  }
}

export function fetchUser () {
  return async dispatch => {
    dispatch(getUserIng())
    await wepy.showLoading()
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
        }).then(userData => userData.data)
      } else { // 请求微信登录获取相关信息
        userInfo = await fetchInitialUserInfo()
      }
      await wepy.hideLoading()
      dispatch(getUserSuccess(userInfo))
    } catch (err) {
      await wepy.hideLoading()
      dispatch(getUserError(err))
    }
  }
}

export function updateUser (user) {
  return async dispatch => {
    dispatch(updateUserIng())
    await wepy.showLoading()
    try {
      const authorization = wepy.getStorageSync('authorization')
      if (authorization) {
        const userInfo = await wepy.request({
          url: API_USER,
          method: 'PUT',
          header: {
            authorization: `JWT ${authorization}`
          },
          data: user
        })
        await wepy.hideLoading()
        dispatch(updateUserSuccess(userInfo))
        await wepy.showToast({
          title: '修改成功',
          icon: 'success'
        })
      } else {
        await wepy.hideLoading()
        dispatch(userLoginError())
      }
    } catch (err) {
      await wepy.hideLoading()
      dispatch(updateUserError())
    }
  }
}
