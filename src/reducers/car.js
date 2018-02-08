import { handleActions } from 'redux-actions'
import {
  CAR_LICENSE_INPUT,
  CAR_NUMBER_INPUT,
  CAR_AGE_INPUT,
  CAR_BRAND_SELECT,
  CAR_SYSTEM_SELECT,
  CAR_COMPANY_INPUT,
  CAR_BELONGTO_SELECT,
  INIT_CAR
} from '../constants/car'

const initCarData = {
  license: null, // 车牌号码，车牌号码
  number: null, // 限载人数
  age: null, // 生产日期
  brand: null, // 车辆品牌
  system: null, // 驱动系统
  company: null,  // 所属公司
  belongTo: null,  // 所属地
  images: []  // 车辆图片
}

export default handleActions({
  [INIT_CAR] (state, action) {
    if (action.payload) {
      return {
        ...state,
        ...action.payload
      }
    } else {
      return {
        ...state,
        ...initCarData
      }
    }
  },

  [CAR_AGE_INPUT] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [CAR_BRAND_SELECT] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [CAR_LICENSE_INPUT] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [CAR_NUMBER_INPUT] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [CAR_SYSTEM_SELECT] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [CAR_COMPANY_INPUT] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  },

  [CAR_BELONGTO_SELECT] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  }
}, {
  ...initCarData
})
