import { createAction } from 'redux-actions'
import wepy from 'wepy'

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
  CAR_IMAGES_UPDATE,
  INIT_CAR
} from '../constants/car'
import { addUserCar } from './user'
import { API_CAR } from '../utils/api'

export const inputCarLicense = createAction(CAR_LICENSE_INPUT, license => ({ license }))
export const inputCarNumber = createAction(CAR_NUMBER_INPUT, number => ({ number }))
export const inputCarAge = createAction(CAR_AGE_INPUT, age => ({ age }))
export const inputCarBrand = createAction(CAR_BRAND_SELECT, brand => ({ brand }))
export const inputCarSystem = createAction(CAR_SYSTEM_SELECT, system => ({ system }))
export const inputCarCompany = createAction(CAR_COMPANY_INPUT, company => ({ company }))
export const inputCarBelongTo = createAction(CAR_BELONGTO_SELECT, belongTo => ({ belongTo }))
export const addCarImage = createAction(CAR_IMAGES_ADD, image => ({ image }))
export const deleteCarImage = createAction(CAR_IMAGRS_DELETE, index => ({ index }))
export const updateCarImage = createAction(CAR_IMAGES_UPDATE, image => ({ image }))
export const initCar = createAction(INIT_CAR, car => car)

export function addCar (car) {
  return async dispatch => {
    await wepy.showLoading()
    try {
      const authorization = wepy.getStorageSync('authorization')
      // 本地存在authorization，表示之前已经请求登录过
      if (authorization) {
        const result = await wepy.request({
          url: API_CAR,
          method: 'POST',
          data: {
            license: car.license,
            number: car.number,
            age: new Date(car.age).toString(),
            brand: car.brand,
            system: car.system,
            company: car.company,
            belongTo: car.belongTo,
            images: car.images
          },
          header: {
            authorization: `JWT ${authorization}`
          }
        })
        await wepy.hideLoading()
        if (result.statusCode === 200 || result.statusCode === 201) {
          await wepy.showToast({
            icon: 'none',
            title: '添加车辆成功，等待审核！'
          })
          const carData = result.data
          dispatch(addUserCar(carData))
        }
      }
    } catch (err) {
      await wepy.hideLoading()
      console.log(err)
    }
  }
}

export function fetchCars () {
  return async dispatch => {
    try {
      const authorization = wepy.getStorageSync('authorization')
      // 本地存在authorization，表示之前已经请求登录过
      if (authorization) {
        const result = await wepy.request({
          url: API_CAR,
          method: 'GET',
          header: {
            authorization: `JWT ${authorization}`
          }
        })
        if (result.statusCode === 200 || result.statusCode === 201) {
          const cars = result.data
          dispatch(addUserCar(cars))
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
}
