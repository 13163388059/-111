const getTime = {
  getZHymd: (date, status) => {
    if (date == undefined) return
    if (typeof (date) == 'string') {
      return date
    }
    var time = new Date(date);
    var newTime = new Date().getTime();
    var day = (newTime - date) / 1000 / 60 / 60 / 24;
    if (newTime <= date) {
      day = 0
    }
    var roughDetailTime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + (time.getDate());
    if (day > 30) {
      roughDetailTime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + (time.getDate());
    } else if (day > 1) {
      roughDetailTime = parseInt(day) + ' 天以前'
    } else if (day > 0.04166666666) {
      roughDetailTime = parseInt(day * 24) + ' 小时以前'
    } else if (day >= 0) {
      roughDetailTime = "刚刚"
    }
    if (status == false) {
      var hours = time.getHours();
      var minutes = time.getMinutes()
      if (hours < 10) {
        hours = '0' + hours
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      roughDetailTime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + (time.getDate()) + ' ' + hours + ':' + minutes
    }
    return roughDetailTime
  },
  getENymd: (date, status) => {
    if (date == undefined) return
    if (typeof (date) == 'string') {
      return date
    }
    var time = new Date(date);
    var newTime = new Date().getTime();
    var day = (newTime - date) / 1000 / 60 / 60 / 24;
    if (newTime <= date) {
      day = 0
    }
    var month = 'January';
    switch (time.getMonth() + 1) {
      case 1:
        month = 'January'
        break;
      case 2:
        month = 'February'
        break;
      case 3:
        month = 'March'
        break;
      case 4:
        month = 'April'
        break;
      case 5:
        month = 'May'
        break;
      case 6:
        month = 'June'
        break;
      case 7:
        month = 'July'
        break;
      case 8:
        month = 'August'
        break;
      case 9:
        month = 'September'
        break;
      case 10:
        month = 'October'
        break;
      case 11:
        month = 'November'
        break;
      case 12:
        month = 'December'
        break;
      default:
        month = 'January'
    }
    var roughDetailTime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + (time.getDate());
    if (day > 30) {
      roughDetailTime = month + ' ' + (time.getDate()) + ',' + time.getFullYear()
    } else if (day >= 1) {
      roughDetailTime = parseInt(day) + ' day ago'
    } else if (day >= 0.041666666) {
      roughDetailTime = parseInt(day * 24) + " hours ago"
    } else if (day >= 0) {
      roughDetailTime = "just now"
    }
    if (status == false) {
      var hours = time.getHours();
      var minutes = time.getMinutes()
      if (hours < 10) {
        hours = '0' + hours
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      roughDetailTime = month + ' ' + (time.getDate()) + ',' + time.getFullYear() + ' ' + hours + ':' + minutes
    }
    return roughDetailTime
  },
  getZHhm: (date) => {
    if (date == undefined) return
    if (typeof (date) == 'string') {
      return date
    }
    var time = new Date(date);
    return time.getHours() + ':' + time.getMinutes();
  }
}
module.exports = {
  getTime
};
