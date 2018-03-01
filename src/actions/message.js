import { createAction } from 'redux-actions'
import wepy from 'wepy'

import {
  SET_MESSAGE_START_TIME,
  SET_MESSAGE_END_TIME,
  SET_MESSAGE_LOCATION,
  SET_MESSAGE_LOCATION_MAP,
  SET_MESSAGE_CAR,
  SET_MESSAGE_DESCRIPTION,
  SET_MESSAGE_LOCATION_SEND,
  SET_MESSAGE_LOCATION_SEND_MAP,
  SET_MESSAGE_NUMBER,
  SET_MESSAGE_GUIDE_NAME,
  SET_MESSAGE_GUIDE_TELEPHONE,
  PUBLISH_MESSAGE_ERROR,
  INIT_MESSAGE
} from '../constants/message'
import { addUserMessage, initUserMessage } from './user'

import { API_DRIVER_MESSAGE, API_TRAVEL_MESSAGE } from '../utils/api'
import { ROLE } from '../constants/user'

export const setMessageStartTime = createAction(SET_MESSAGE_START_TIME, startTime => ({ startTime }))
export const setMessageEndTime = createAction(SET_MESSAGE_END_TIME, endTime => ({ endTime }))
export const setMessageLocation = createAction(SET_MESSAGE_LOCATION, location => ({ location }))
export const setMessageLocationMap = createAction(SET_MESSAGE_LOCATION_MAP, locationMap => ({ locationMap }))
export const setMessageCar = createAction(SET_MESSAGE_CAR, car => ({ car }))
export const setMessageDescription = createAction(SET_MESSAGE_DESCRIPTION, description => ({ description }))
export const setMessageLocationSend = createAction(SET_MESSAGE_LOCATION_SEND, locationSend => ({ locationSend }))
export const setMessageLocationSendMap = createAction(SET_MESSAGE_LOCATION_SEND_MAP, locationSendMap => ({ locationSendMap }))
export const setMessageNumber = createAction(SET_MESSAGE_NUMBER, number => ({ number }))
export const setMessageGuideName = createAction(SET_MESSAGE_GUIDE_NAME, guideName => ({ guideName }))
export const setMessageGuideTelephone = createAction(SET_MESSAGE_GUIDE_TELEPHONE, guideTelphone => ({ guideTelphone }))
export const publishMessageError = createAction(PUBLISH_MESSAGE_ERROR, error => ({ error }))
export const initMessage = createAction(INIT_MESSAGE, message => message)

export function publishMessage (role, message) {
  return async dispatch => {
    try {
      await wepy.showLoading()
      const authorization = wepy.getStorageSync('authorization')
      // 本地存在authorization，表示之前已经请求登录过
      if (authorization) {
        let url
        let data = {
          startTime: message.startTime,
          endTime: message.endTime,
          location: message.location,
          locationMap: message.locationMap,
          description: message.description || ''
        }
        if (role === ROLE.DRIVER) {
          url = API_DRIVER_MESSAGE
          data.car = message.car
        } else {
          url = API_TRAVEL_MESSAGE
          data.locationSend = message.locationSend
          data.locationSendMap = message.locationSendMap
          data.number = message.number
          data.guideName = message.guideName
          data.guideTelphone = message.guideTelphone
        }
        const result = await wepy.request({
          url,
          method: 'POST',
          data: data,
          header: {
            authorization: `JWT ${authorization}`
          }
        })
        await wepy.hideLoading()
        if (result.statusCode === 200 || result.statusCode === 201) {
          await wepy.showToast({
            icon: 'none',
            title: '发布成功，即将为您匹配行程！'
          })
          const messageData = result.data
          messageData.car = messageData.car.id
          dispatch(initMessage(messageData))
        } else {
          await wepy.showToast({
            icon: 'none',
            title: '发布失败，请重新再试！'
          })
          dispatch(publishMessageError())
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export function cancelMessage (role, opts) {
  return async dispatch => {
    try {
      await wepy.showLoading()
      const authorization = wepy.getStorageSync('authorization')
      // 本地存在authorization，表示之前已经请求登录过
      if (authorization) {
        let url
        if (role === ROLE.DRIVER) {
          url = API_DRIVER_MESSAGE
        } else {
          url = API_TRAVEL_MESSAGE
        }
        url += `/${opts.messageId}`
        const result = await wepy.request({
          url,
          method: 'DELETE',
          header: {
            authorization: `JWT ${authorization}`
          }
        })
        await wepy.hideLoading()
        if (result.statusCode === 204) {
          await wepy.showToast({
            icon: 'none',
            title: '取消成功！'
          })
        } else {
          await wepy.showToast({
            icon: 'none',
            title: '取消失败，稍后再试！'
          })
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export function fetchMessages (role, opts) {
  return async dispatch => {
    try {
      await wepy.showLoading()
      const authorization = wepy.getStorageSync('authorization')
      // 本地存在authorization，表示之前已经请求登录过
      if (authorization) {
        let url
        if (role === ROLE.DRIVER) {
          url = API_DRIVER_MESSAGE
        } else {
          url = API_TRAVEL_MESSAGE
        }
        const result = await wepy.request({
          url,
          method: 'GET',
          data: opts,
          header: {
            authorization: `JWT ${authorization}`
          }
        })
        await wepy.hideLoading()
        if (result.statusCode === 200 || result.statusCode === 201) {
          const messages = result.data
          if (opts.page === 0) {
            dispatch(initUserMessage(messages))
          } else {
            dispatch(addUserMessage(messages))
          }
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
}
