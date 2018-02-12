import { createAction } from 'redux-actions'
import wepy from 'wepy'

import {
  UPLOAD_FILES_START,
  UPLOAD_FILES_SUCCESS,
  UPLOAD_FILES_ERROR,
  UPLOAD_FILES_INIT
} from '../constants/upload'
import { userLoginError } from '../actions/user'
import { API_FILE } from '../utils/api'

export const uploadFilesStart = createAction(UPLOAD_FILES_START)
export const uploadFilesSuccess = createAction(UPLOAD_FILES_SUCCESS, files => ({ files }))
export const uploadFilesError = createAction(UPLOAD_FILES_ERROR)
export const uploadFilesInit = createAction(UPLOAD_FILES_INIT)

export function uploadFiles (files, opts) {
  return async dispatch => {
    dispatch(uploadFilesStart())
    try {
      const authorization = wepy.getStorageSync('authorization')
      // 本地存在authorization，表示之前已经请求登录过
      if (authorization) {
        const result = []
        files.forEach(async (file, index) => {
          opts.beforeFileUpload && opts.beforeFileUpload(index, file)
          const singleRes = await wepy.uploadFile({
            url: API_FILE,
            name: 'files',
            filePath: files[0].path,
            header: {
              authorization: `JWT ${authorization}`
            }
          })
          if (singleRes.statusCode === 200 || singleRes.statusCode === 201) {
            const url = JSON.parse(singleRes.data).url[0]
            result.push(url)
            opts.uploadFileSuccess && opts.uploadFileSuccess(index, url)
          } else {
            result.push(null)
            opts.uploadFileError && opts.uploadFileError(index, null)
          }
          if (index === files.length - 1) {
            dispatch(uploadFilesSuccess(result))
          }
        })
      } else {
        dispatch(userLoginError())
      }
    } catch (err) {
      console.log(err)
      dispatch(uploadFilesError())
    }
  }
}
