import { handleActions } from 'redux-actions'
import {
  UPLOAD_FILES_START,
  UPLOAD_FILES_SUCCESS,
  UPLOAD_FILES_ERROR
} from '../constants/upload'

export default handleActions({
  [UPLOAD_FILES_START] (state) {
    return {
      ...state,
      isFetching: true
    }
  },

  [UPLOAD_FILES_SUCCESS] (state, action) {
    return {
      ...state,
      isFetching: false,
      isError: false,
      ...action.payload
    }
  },

  [UPLOAD_FILES_ERROR] (state) {
    return {
      ...state,
      isFetching: false,
      isError: true
    }
  }
}, {
  isFetching: false,
  isError: false,
  files: []
})
