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
  CAR_IMAGES_UPDATE_BY_INDEX,
  INIT_CAR
} from '../constants/car'
import { addUserCar, initUserCars, updateUserCar, deleteUserCar } from './user'
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
export const updateCarImageByIndex = createAction(CAR_IMAGES_UPDATE_BY_INDEX, (index, image) => ({ index, image }))
export const initCar = createAction(INIT_CAR, car => car)

export function addCar (car) {
  return async dispatch => {
    try {
      await wepy.showLoading()
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
          dispatch(initCar(carData))
          dispatch(addUserCar(carData))
        } else {
          dispatch(initCar())
          await wepy.showToast({
            icon: 'none',
            title: '添加车辆失败，请重试！'
          })
        }
      }
    } catch (err) {
      await wepy.hideLoading()
      console.log(err)
    }
  }
}

export function updateCar (idx, car) {
  return async dispatch => {
    try {
      await wepy.showLoading()
      const authorization = wepy.getStorageSync('authorization')
      // 本地存在authorization，表示之前已经请求登录过
      if (authorization) {
        const result = await wepy.request({
          url: `${API_CAR}/${car.id}`,
          method: 'PUT',
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
            title: '修改车辆资料成功，等待审核！'
          })
          const carData = result.data
          dispatch(updateUserCar(idx, carData))
        } else {
          await wepy.showToast({
            icon: 'none',
            title: '修改车辆资料失败，请重试！'
          })
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
          dispatch(initUserCars(cars))
        } else {
          dispatch(initUserCars([]))
          await wepy.showToast({
            icon: 'none',
            title: '获取车辆列表，请重试！'
          })
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export function deleteCar (idx, car) {
  return async dispatch => {
    try {
      await wepy.showLoading()
      const authorization = wepy.getStorageSync('authorization')
      // 本地存在authorization，表示之前已经请求登录过
      if (authorization) {
        const result = await wepy.request({
          url: `${API_CAR}/${car.id}`,
          method: 'DELETE',
          header: {
            authorization: `JWT ${authorization}`
          }
        })
        await wepy.hideLoading()
        if (result.statusCode === 204) {
          await wepy.showToast({
            icon: 'none',
            title: '删除车辆成功！'
          })
          dispatch(deleteUserCar(idx))
        } else {
          await wepy.showToast({
            icon: 'none',
            title: '删除车辆失败，请重试！'
          })
        }
      }
    } catch (err) {
      await wepy.hideLoading()
      console.log(err)
    }
  }
}
