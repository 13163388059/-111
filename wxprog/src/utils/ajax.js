const host = 'https://portal.or-rouge.cn/api/app/';
var token = ''
//查询数据
const get = (url, data, fn, language) => {
  if (wx.getStorageSync('importantInfo').token == '' || wx.getStorageSync('importantInfo').token == undefined) {
    token = ''
  } else {
    token = wx.getStorageSync('importantInfo').token
  }
  if (language == undefined) {
    language = 'ZH'
  }
  wx.request({
    url: host + url, //请求接口的url
    method: 'GET', //请求方式
    data: data, //
    dataType: 'json',
    header: {
      'content-type': 'application/json', // 默认值
      'Cookie': '_LANGUAGE=' + language + ';',
      'token': token,
      'terminal': 'WX_MINI'
    },
    success: res => {
      fn(res.data);
    },
    error: res => {
      console.log(res.data);
    }
  });
};

//新增数据
const post = (url, data, fn, language) => {
  if (wx.getStorageSync('importantInfo').token == '' || wx.getStorageSync('importantInfo').token == undefined) {
    token = ''
  } else {
    token = wx.getStorageSync('importantInfo').token
  }
  wx.request({
    url: host + url, //请求接口的url
    method: 'POST', //请求方式
    data: data, //
    dataType: 'json',
    header: {
      'content-type': 'application/json', // 默认值
      'Cookie': '_LANGUAGE=' + language + ';',
      'token': token,
      'terminal': 'WX_MINI'
    },
    success: res => {
      fn(res.data);
    },
    error: res => {
      console.log(res.data);
    }
  });
};

//修改数据
const put = (url, data, fn, language) => {
  if (wx.getStorageSync('importantInfo').token == '' || wx.getStorageSync('importantInfo').token == undefined) {
    token = ''
  } else {
    token = wx.getStorageSync('importantInfo').token
  }
  wx.request({
    url: host + url, //请求接口的url
    method: 'PUT', //请求方式
    data: data, //
    dataType: 'json',
    header: {
      'content-type': 'application/json', // 默认值
      'Cookie': '_LANGUAGE=' + language + ';',
      'token': token,
      'terminal': 'WX_MINI'
    },
    success: res => {
      fn(res.data);
    },
    error: res => {
      console.log(res.data);
    }
  });
};

//删除数据
const deleteRe = (url, data, fn, language) => {
  if (wx.getStorageSync('importantInfo').token == '' || wx.getStorageSync('importantInfo').token == undefined) {
    token = ''
  } else {
    token = wx.getStorageSync('importantInfo').token
  }
  wx.request({
    url: host + url, //请求接口的url
    method: 'DELETE', //请求方式
    data: data, //
    dataType: 'json',
    header: {
      'content-type': 'application/json', // 默认值
      'Cookie': '_LANGUAGE=' + language + ';',
      'token': token,
      'terminal': 'WX_MINI'
    },
    success: res => {
      fn(res.data);
    },
    error: res => {
      console.log(res.data);
    }
  });
};
module.exports = {
  get,
  post,
  put,
  deleteRe
};
