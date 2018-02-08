import { handleActions } from 'redux-actions'
import {
  CAR_LICENSE_INPUT,
  CAR_NUMBER_INPUT,
  CAR_AGE_INPUT,
  CAR_BRAND_SELECT,
  CAR_SYSTEM_SELECT,
  CAR_COMPANY_INPUT,
  CAR_BELONGTO_SELECT,
  CAR_IMAGES_ADD,
  CAR_IMAGRS_DELETE,
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
  },

  [CAR_IMAGES_ADD] (state, action) {
    const { image } = action.payload
    let images = state.images.concat()
    if (Array.isArray(image)) {
      images = images.concat(image)
    } else {
      images.push(image)
    }
    return {
      ...state,
      images
    }
  },

  [CAR_IMAGRS_DELETE] (state, action) {
    const { index } = action.payload
    const images = state.images.concat()
    images.splice(index, 1)
    return {
      ...state,
      images
    }
  }
}, {
  ...initCarData
})
