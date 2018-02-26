import { createAction } from 'redux-actions'
import wepy from 'wepy'

import {
  GET_USER,
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  SET_USER_ROLE,
  USER_USERNAME_INPUT,
  USER_TELEPHONE_INPUT,
  USER_COMPANY_INPUT,
  USER_COMPANY_TEL_INPUT,
  USER_COMPANY_FAX_INPUT,
  USER_COMPANY_ADDR_INPUT,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  USER_LOGIN_ERROR,
  SET_USER_DRTVER_LICENSE_POS,
  SET_USER_DRTVER_LICENSE_OPP,
  SET_USER_WORK_LICENSE_POS,
  SET_USER_WORK_LICENSE_OPP,
  ADD_USER_CAR,
  INIT_USER_CARS,
  DELETE_USER_CAR,
  UPDATE_USER_CAR,
  ADD_USER_MESSAGE,
  UPDATE_USER_MESSAGE,
  INIT_USER_MESSAGE,
  SET_IS_NEW
} from '../constants/user'
import { API_USER } from '../utils/api'
import { isEmptyObject } from '../utils'

export const getUserIng = createAction(GET_USER)
export const getUserSuccess = createAction(GET_USER_SUCCESS)
export const getUserError = createAction(GET_USER_ERROR, errorObj => ({ errorObj }))
export const setUserRole = createAction(SET_USER_ROLE, role => ({ role }))
export const inputUsername = createAction(USER_USERNAME_INPUT, username => ({ username }))
export const inputTelephone = createAction(USER_TELEPHONE_INPUT, telephone => ({ telephone }))
export const inputCompany = createAction(USER_COMPANY_INPUT, company => ({ company }))
export const inputCompanyTel = createAction(USER_COMPANY_TEL_INPUT, companyTel => ({ companyTel }))
export const inputCompanyFax = createAction(USER_COMPANY_FAX_INPUT, companyFax => ({ companyFax }))
export const inputCompanyAddr = createAction(USER_COMPANY_ADDR_INPUT, companyAddr => ({ companyAddr }))
export const setUserDriverLicensePos = createAction(SET_USER_DRTVER_LICENSE_POS, driverLicensePos => ({ driverLicensePos }))
export const setUserDriverLicenseOpp = createAction(SET_USER_DRTVER_LICENSE_OPP, driverLicenseOpp => ({ driverLicenseOpp }))
export const setUserWorkLicensePos = createAction(SET_USER_WORK_LICENSE_POS, workLicensePos => ({ workLicensePos }))
export const setUserWorkLicenseOpp = createAction(SET_USER_WORK_LICENSE_OPP, workLicenseOpp => ({ workLicenseOpp }))

export const updateUserIng = createAction(UPDATE_USER)
export const updateUserError = createAction(UPDATE_USER_ERROR)
export const updateUserSuccess = createAction(UPDATE_USER_SUCCESS)
export const userLoginError = createAction(USER_LOGIN_ERROR)

export const initUserCars = createAction(INIT_USER_CARS)
export const addUserCar = createAction(ADD_USER_CAR, car => ({ car }))
export const deleteUserCar = createAction(DELETE_USER_CAR, index => ({ index }))
export const updateUserCar = createAction(UPDATE_USER_CAR, (index, car) => ({ index, car }))

export const addUserMessage = createAction(ADD_USER_MESSAGE, message => ({ message }))
export const updateUserMessage = createAction(UPDATE_USER_MESSAGE, (index, message) => ({ index, message }))
export const initUserMessage = createAction(INIT_USER_MESSAGE)
export const setIsNew = createAction(SET_IS_NEW, isNew => ({ isNew }))

export async function checkSettingStatus () {
  const setting = await wepy.getSetting()
  const authSetting = setting.authSetting
  if (!isEmptyObject(authSetting)) {
    if (authSetting['scope.userInfo'] === false) {
      const res = await wepy.showModal({
        title: '用户未授权',
        content: '如需正常使用汽车调度小程序，请按确定并在授权管理中选中“用户信息”，然后点按确定。最后再重新进入小程序即可正常使用。',
        showCancel: false
      })
      if (res.confirm) {
        await wepy.openSetting()
      }
    }
  }
}

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
    return 'wxerror'
  }
}

async function fetchUserCore (dispatch) {
  dispatch(getUserIng())
  try {
    await wepy.showLoading({
      mask: true
    })
    const authorization = wepy.getStorageSync('authorization')
    let userInfo
    let statusCode
    // 本地存在authorization，表示之前已经请求登录过
    if (authorization) {
      userInfo = await wepy.request({
        url: API_USER,
        method: 'GET',
        header: {
          authorization: `JWT ${authorization}`
        }
      }).then(userData => {
        statusCode = userData.statusCode
        return userData.data
      })
    } else { // 请求微信登录获取相关信息
      statusCode = 200
      dispatch(setIsNew(true))
      userInfo = await fetchInitialUserInfo()
    }
    await wepy.hideLoading()
    if (userInfo === 'wxerror') {
      dispatch(getUserError({ type: 'wx' }))
    } else if (statusCode === 200 || statusCode === 201) {
      dispatch(getUserSuccess(userInfo))
    } else {
      wepy.removeStorageSync('authorization')
      await fetchUserCore(dispatch)
    }
  } catch (err) {
    await wepy.showToast({
      title: JSON.stringify(err),
      icon: 'success'
    })
    await wepy.hideLoading()
    dispatch(getUserError(err))
  }
}

export function fetchUser () {
  return async dispatch => {
    await fetchUserCore(dispatch)
  }
}

export function updateUser (user) {
  return async dispatch => {
    dispatch(updateUserIng())
    try {
      await wepy.showLoading()
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
        if (userInfo.statusCode === 200 || userInfo.statusCode === 201) {
          dispatch(updateUserSuccess(userInfo))
          dispatch(setIsNew(false))
          await wepy.showToast({
            title: '提交审核成功',
            icon: 'success'
          })
        } else {
          await wepy.showToast({
            title: userInfo.data.msg,
            icon: 'none'
          })
        }
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
