import { handleActions } from 'redux-actions'
import {
  UPLOAD_FILES_START,
  UPLOAD_FILES_SUCCESS,
  UPLOAD_FILES_ERROR,
  UPLOAD_FILES_INIT
} from '../constants/upload'

export default handleActions({
  [UPLOAD_FILES_START] (state) {
    return {
      ...state,
      isFetching: true
    }
  },

  [UPLOAD_FILES_SUCCESS] (state, action) {
    const newFiles = action.payload.files.concat()
    const oldFiles = state.files.concat()
    const files = oldFiles.concat(newFiles)
    return {
      ...state,
      isFetching: false,
      isError: false,
      files
    }
  },

  [UPLOAD_FILES_ERROR] (state) {
    return {
      ...state,
      isFetching: false,
      isError: true
    }
  },

  [UPLOAD_FILES_INIT] (state) {
    return {
      ...state,
      isFetching: false,
      isError: false,
      filse: []
    }
  }
}, {
  isFetching: false,
  isError: false,
  files: []
})
