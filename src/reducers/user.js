import { handleActions } from 'redux-actions'
import { GET_USER, GET_USER_SUCCESS, GET_USER_ERROR, SET_USER_ROLE } from '../constants/user'

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
