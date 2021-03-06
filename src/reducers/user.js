import { handleActions } from 'redux-actions'
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
  SET_USER_MESSAGE_HAS_MORE,
  SET_IS_NEW
} from '../constants/user'

export default handleActions({
  [GET_USER] (state) {
    return {
      ...state,
      isFetching: true,
      isError: false
    }
  },

  [GET_USER_SUCCESS] (state, action) {
    const payload = { ...action.payload }
    const {
      driverLicensePos,
      driverLicenseOpp,
      workLicensePos,
      workLicenseOpp
    } = payload
    if (driverLicensePos) {
      payload.driverLicensePos = {
        path: driverLicensePos
      }
    }
    if (driverLicenseOpp) {
      payload.driverLicenseOpp = {
        path: driverLicenseOpp
      }
    }
    if (workLicensePos) {
      payload.workLicensePos = {
        path: workLicensePos
      }
    }
    if (workLicenseOpp) {
      payload.workLicenseOpp = {
        path: workLicenseOpp
      }
    }
    return {
      ...state,
      isFetching: false,
      isError: false,
      ...payload
    }
  },

  [GET_USER_ERROR] (state, action) {
    return {
      ...state,
      isFetching: false,
      isError: true,
      ...action.payload
    }
  },

  [SET_USER_ROLE] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [USER_USERNAME_INPUT] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [USER_TELEPHONE_INPUT] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [USER_COMPANY_INPUT] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [USER_COMPANY_TEL_INPUT] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [USER_COMPANY_FAX_INPUT] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [USER_COMPANY_ADDR_INPUT] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [UPDATE_USER] (state) {
    return {
      ...state,
      isFetching: true,
      isError: false
    }
  },

  [UPDATE_USER_SUCCESS] (state, action) {
    const payload = { ...action.payload }
    const {
      driverLicensePos,
      driverLicenseOpp,
      workLicensePos,
      workLicenseOpp
    } = payload
    if (driverLicensePos) {
      payload.driverLicensePos = {
        path: driverLicensePos
      }
    }
    if (driverLicenseOpp) {
      payload.driverLicenseOpp = {
        path: driverLicenseOpp
      }
    }
    if (workLicensePos) {
      payload.workLicensePos = {
        path: workLicensePos
      }
    }
    if (workLicenseOpp) {
      payload.workLicenseOpp = {
        path: workLicenseOpp
      }
    }
    return {
      ...state,
      isFetching: false,
      isError: false,
      ...payload
    }
  },

  [UPDATE_USER_ERROR] (state) {
    return {
      ...state,
      isFetching: false,
      isError: true
    }
  },

  [USER_LOGIN_ERROR] (state) {
    return {
      ...state,
      isFetching: false,
      loginError: true
    }
  },

  [SET_USER_DRTVER_LICENSE_POS] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [SET_USER_DRTVER_LICENSE_OPP] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [SET_USER_WORK_LICENSE_POS] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [SET_USER_WORK_LICENSE_OPP] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [ADD_USER_CAR] (state, action) {
    let cars = state.cars.concat()
    const car = action.payload.car
    if (Array.isArray(car)) {
      cars = cars.concat(car)
    } else {
      cars.push(action.payload.car)
    }
    return {
      ...state,
      cars
    }
  },

  [INIT_USER_CARS] (state, actions) {
    const cars = (actions.payload && actions.payload.length) ? actions.payload : []
    return {
      ...state,
      cars
    }
  },

  [DELETE_USER_CAR] (state, action) {
    let cars = state.cars.concat()
    const index = action.payload.index
    cars.splice(index, 1)
    return {
      ...state,
      cars
    }
  },

  [UPDATE_USER_CAR] (state, action) {
    let cars = state.cars.concat()
    const index = action.payload.index
    const car = action.payload.car
    cars.splice(index, 1, car)
    return {
      ...state,
      cars
    }
  },

  [ADD_USER_MESSAGE] (state, action) {
    let messages = state.messages.concat()
    const message = action.payload.message
    if (Array.isArray(message)) {
      messages = messages.concat(message)
    } else {
      messages.push(action.payload.message)
    }
    return {
      ...state,
      messages,
      isFetchingMessage: false
    }
  },

  [UPDATE_USER_MESSAGE] (state, action) {
    let messages = state.messages.concat()
    const index = action.payload.index
    const message = action.payload.message
    messages.splice(index, 1, message)
    return {
      ...state,
      messages
    }
  },

  [INIT_USER_MESSAGE] (state, action) {
    const payload = action.payload
    const messages = payload.message || []
    return {
      ...state,
      messages,
      isMessagesHasMore: true,
      isFetchingMessage: false
    }
  },

  [SET_USER_MESSAGE_HAS_MORE] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [SET_IS_NEW] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  }
}, {
  isFetching: false,
  isError: false,
  id: null,
  nickname: null,
  username: null,
  telephone: null,
  avatarUrl: null,
  role: 'unknown',
  company: null,
  companyTel: null,
  companyFax: null,
  companyAddr: null,
  driverLicensePos: null,
  driverLicenseOpp: null,
  workLicensePos: null,
  workLicenseOpp: null,
  status: 0,
  auditOpinion: null,
  cars: [],
  messages: [],
  errorObj: null,
  loginError: false,
  isNew: false,
  isFetchingMessage: true,
  isMessagesHasMore: true
})
