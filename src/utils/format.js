export function formatYear (date) {
  if (date) {
    date = typeof date === 'string' ? new Date(standardizedTime(date)) : new Date(date)
  } else {
    date = new Date()
  }
  return date.getFullYear()
}

export function formatDate (date) {
  if (date) {
    date = typeof date === 'string' ? new Date(standardizedTime(date)) : new Date(date)
  } else {
    date = new Date()
  }
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  if (month < 10) {
    month = '0' + month
  }
  let day = date.getDate()
  if (day < 10) {
    day = '0' + day
  }
  return year + '-' + month + '-' + day
}

export function formatTime (date) {
  if (date) {
    date = typeof date === 'string' ? new Date(standardizedTime(date)) : new Date(date)
  } else {
    date = new Date()
  }
  let hour = date.getHours()
  if (hour < 10) {
    hour = '0' + hour
  }
  let minute = date.getMinutes()
  if (minute < 10) {
    minute = '0' + minute
  }
  return hour + ':' + minute
}

export function standardizedTime (time) {
  if (time.indexOf('-') < 0 || time.indexOf('T') >= 0) {
    return time
  }
  const timeArr = time.split(' ')
  const dateArr = timeArr[0].split('-')
  const year = dateArr[0]
  const month = dateArr[1]
  const day = dateArr[2]
  return timeArr[1] ? `${month}/${day}/${year} ${timeArr[1]}` : `${month}/${day}/${year}`
}
