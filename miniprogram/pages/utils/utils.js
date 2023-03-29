/** 
 * new Date() ---> 转化为 年 月 日 时 分 秒
 * let date = new Date();
 * date: 传入参数日期 Date
 */
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var days = date.getDay()


  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-')
}

function formatMinute(date) {


  var hour = date.getHours()
  var minute = date.getMinutes()


  return [hour, minute].map(formatNumber).join(':')
}

function getWeek(date) {
  var days = date.getDay()
  switch (days) {
    case 1:
      days = '周一';
      break;
    case 2:
      days = '周二';
      break;
    case 3:
      days = '周三';
      break;
    case 4:
      days = '周四';
      break;
    case 5:
      days = '周五';
      break;
    case 6:
      days = '周六';
      break;
    case 0:
      days = '周日';
      break;
    
  }
  return days;
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
 */
function formatTimeTwo(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

module.exports = {
  formatTime: formatTime,
  formatTimeTwo: formatTimeTwo,
  getWeek:getWeek,
  formatMinute:formatMinute
}