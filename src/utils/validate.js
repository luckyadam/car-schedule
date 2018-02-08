export const phoneReg = /^1[3|4|5|8][0-9]\d{8}$/
export const identifyIdReg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/

export function isEmptyStr (str) {
  return (!str || str.length === 0)
}

export function isValidPhoneNumber (number) {
  return phoneReg.test(number)
}

export function isValidIdentifyId (id) {
  return identifyIdReg.test(id)
}
