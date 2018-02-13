import { handleActions } from 'redux-actions'
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
  USER_LOGIN_ERROR,
  SET_USER_DRTVER_LICENSE_POS,
  SET_USER_DRTVER_LICENSE_OPP,
  SET_USER_WORK_LICENSE_POS,
  SET_USER_WORK_LICENSE_OPP,
  ADD_USER_CAR
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
      username: action.payload.username
    }
  },

  [USER_TELEPHONE_INPUT] (state, action) {
    return {
      ...state,
      telephone: action.payload.telephone
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
    return {
      ...state,
      isFetching: false,
      isError: false,
      ...action.payload
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
  }
}, {
  isFetching: false,
  isError: false,
  id: null,
  nickname: null,
  username: null,
  telephone: null,
  avatarUrl: null,
  role: null,
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
  errorObj: null,
  loginError: false
})
