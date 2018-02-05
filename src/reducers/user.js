import { handleActions } from 'redux-actions'
import {
  GET_USER,
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  SET_USER_ROLE,
  USER_USERNAME_INPUT,
  USER_TELEPHONE_INPUT
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

  [GET_USER_ERROR] (state) {
    return {
      ...state,
      isFetching: false,
      isError: true
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
  }
}, {
  isFetching: false,
  isError: false,
  nickname: null,
  username: null,
  telephone: null,
  avatarUrl: null,
  role: null
})
