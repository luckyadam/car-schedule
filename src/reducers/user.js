import { handleActions } from 'redux-actions'
import { GET_USER, GET_USER_SUCCESS, GET_USER_ERROR } from '../constants/user'

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
  }
}, {
  isFetching: false,
  isError: false,
  code: null,
  encryptedData: null,
  iv: null,
  signature: null,
  userInfo: null
})
