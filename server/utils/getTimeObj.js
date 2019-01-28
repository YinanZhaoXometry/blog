// 定义工具函数返回time对象，储存不同时间格式，方便后续使用（精确到毫秒、年、月、日、分钟）
const getTimeObj = function  (userSetDate) {
  let date = userSetDate ? new Date(userSetDate) : new Date()
  let year = date.getFullYear()
  let month = date.getMonth()+1
  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let fullDate = year + "年" + month + "月" + day + "日"  
  let simpleDate = month + "月" + day + "日" 
  let hoursMinutes = ( hours < 10 ? ('0' + hours) : hours )   
    + ":" + ( minutes < 10 ? ('0' + minutes) : minutes )
  if (hours >= 0 && hours < 5) {
    hoursMinutes = '凌晨' + hoursMinutes
  } else if (hours >= 5 && hours < 12) {
    hoursMinutes = '早上' + hoursMinutes
  } else if (hours >= 12 && hours < 13) {
    hoursMinutes = '中午' + hoursMinutes
  } else if (hours >= 13 && hours < 18) {
    hoursMinutes = '下午' + hoursMinutes
  } else {
    hoursMinutes = '晚上' + hoursMinutes
  }
  let time = {
    date,         // Date对象
    year,         // 2018
    month,        // 12
    fullDate,     // 2018年12月5日
    simpleDate,   // 12月5日
    hoursMinutes, // 上午06:52
  }
  return time
}

module.exports = getTimeObj