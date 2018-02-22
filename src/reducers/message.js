import { handleActions } from 'redux-actions'
import {
  SET_MESSAGE_START_TIME,
  SET_MESSAGE_END_TIME,
  SET_MESSAGE_LOCATION,
  SET_MESSAGE_LOCATION_MAP,
  SET_MESSAGE_CAR,
  SET_MESSAGE_DESCRIPTION,
  SET_MESSAGE_LOCATION_SEND,
  SET_MESSAGE_LOCATION_SEND_MAP,
  SET_MESSAGE_GUIDE_NAME,
  SET_MESSAGE_GUIDE_TELEPHONE,
  PUBLISH_MESSAGE_ERROR,
  INIT_MESSAGE
} from '../constants/message'

const initMessageData = {
  startTime: null,
  endTime: null,
  location: null,
  locationMap: null,
  locationSend: null,
  locationSendMap: null,
  number: null,
  guideName: null,
  guideTelphone: null,
  description: null,
  status: false,
  refDriver: null,
  refTravel: null,
  car: null,
  type: -1,
  isError: false,
  errorInfo: null
}

export default handleActions({
  [INIT_MESSAGE] (state, action) {
    if (action.payload) {
      return {
        ...state,
        ...action.payload,
        isError: false
      }
    } else {
      return {
        ...state,
        ...initMessageData,
        isError: false
      }
    }
  },

  [SET_MESSAGE_START_TIME] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [SET_MESSAGE_END_TIME] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [SET_MESSAGE_LOCATION] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [SET_MESSAGE_LOCATION_MAP] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [SET_MESSAGE_CAR] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [SET_MESSAGE_DESCRIPTION] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [SET_MESSAGE_LOCATION_SEND] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [SET_MESSAGE_LOCATION_SEND_MAP] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [SET_MESSAGE_GUIDE_NAME] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [SET_MESSAGE_GUIDE_TELEPHONE] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [PUBLISH_MESSAGE_ERROR] (state, action) {
    return {
      ...state,
      isError: true,
      ...action.payload
    }
  }
}, {
  ...initMessageData
})
