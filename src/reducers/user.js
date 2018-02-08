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
  USER_LOGIN_ERROR
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
    return {
      ...state,
      isFetching: false,
      isError: false,
      ...action.payload
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
  errorObj: null,
  loginError: false
})
