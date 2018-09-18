import {
  get,
  post,
  put,
  deleteRe,
} from '../utils/ajax';

//首页轮播api
const swiper = (language) => {
  return new Promise((resolve, reject) => {
    get('portal/swiper', {}, res => {
      resolve(res);
    }, language);
  });
};

//首页数据api
const recommended = (language) => {
  return new Promise((resolve, reject) => {
    get('recommended', {}, res => {
      resolve(res);
    }, language);
  });
};

//课程详情api
const courseDetail = (id, language) => {
  return new Promise((resolve, reject) => {
    get(
      'course/' + id, {},
      res => {
        resolve(res);
      },
      language
    );
  });
};

//课程列表api
const courseLists = (data, language) => {
  return new Promise((resolve, reject) => {
    get(
      'course',
      data,
      res => {
        resolve(res);
      },
      language
    );
  });
};

//活动详情api
const activityDetail = (id, language) => {
  return new Promise((resolve, reject) => {
    get(
      'activity/' + id, {},
      res => {
        resolve(res);
      },
      language
    );
  });
};

//活动列表api
const activityLists = (data, language) => {
  return new Promise((resolve, reject) => {
    get(
      'activity',
      data,
      res => {
        resolve(res);
      },
      language
    );
  });
};

//活动订单api
const activityOders = (data, language) => {
  return new Promise((resolve, reject) => {
    get(
      'order?orderType=OFFLINE',
      data,
      res => {
        resolve(res);
      },
      language
    );
  });
};

//课程订单api
const courseOders = (data, language) => {
  return new Promise((resolve, reject) => {
    get(
      'course/bought',
      data,
      res => {
        resolve(res);
      },
      language
    );
  });
};

//登录接口
const login = data => {
  return new Promise((resolve, reject) => {
    post('auth/wechatMiniLogin', data, res => {
      resolve(res);
    });
  });
};

//下订单api
const putOder = (data, language) => {
  return new Promise((resolve, reject) => {
    post('order/wx_mini', data, res => {
      resolve(res);
    }, language);
  });
};

//支付api
const pay = (data, language) => {
  return new Promise((resolve, reject) => {
    post('payment/pay', data, res => {
      resolve(res);
    }, language);
  });
};

//修改用户信息api
const putUserInfo = data => {
  return new Promise((resolve, reject) => {
    put('auth/profile', data, res => {
      resolve(res);
    });
  });
};

//收藏api
const collection = (data, language) => {
  return new Promise((resolve, reject) => {
    post('portal/favorite', data, res => {
      resolve(res);
    }, language);
  });
};

//取消收藏
const cancelCollection = (data, language) => {
  return new Promise((resolve, reject) => {
    deleteRe('portal/favorite', data, res => {
      resolve(res);
    }, language);
  });
};

//新闻列表api
const newLists = (data, language) => {
  return new Promise((resolve, reject) => {
    get(
      'talentShow',
      data,
      res => {
        resolve(res);
      },
      language
    );
  });
};

//新闻详情api
const newDetail = (newId, language) => {
  return new Promise((resolve, reject) => {
    get(
      'talentShow/' + newId,
      "",
      res => {
        resolve(res);
      },
      language
    );
  });
};

//热门搜索api
const hotSearch = (type, language) => {
  return new Promise((resolve, reject) => {
    get(
      'hotWord/all?type=' + type,
      "",
      res => {
        resolve(res);
      },
      language
    );
  });
};

//判断用户是否有地址api
const userInfo = (language) => {
  return new Promise((resolve, reject) => {
    get(
      'order/receiveAddress',
      "",
      res => {
        resolve(res);
      },
      language
    );
  });
};

//搜索分类api
const searchSize = (language) => {
  return new Promise((resolve, reject) => {
    get(
      'label/all',
      "",
      res => {
        resolve(res);
      },
      language
    );
  });
};

//举报视屏、音频api
const report = (data, language) => {
  return new Promise((resolve, reject) => {
    post('portal/feedback/applicant', data, res => {
      resolve(res);
    }, language);
  });
};

//播放视频历史api
const historyVideo = (data, language) => {
  return new Promise((resolve, reject) => {
    get(
      'playRecord?type=course_video',
      data,
      res => {
        resolve(res);
      },
      language
    );
  });
};

//播放音频历史api
const historyAudio = (data, language) => {
  return new Promise((resolve, reject) => {
    get(
      'playRecord?type=course_audio',
      data,
      res => {
        resolve(res);
      },
      language
    );
  });
};

//播放音频历史api
const favoriteList = (data, language) => {
  return new Promise((resolve, reject) => {
    get(
      'favoriteList',
      data,
      res => {
        resolve(res);
      },
      language
    );
  });
};

//获取消息列表api
const feedBackList = (data, language) => {
  return new Promise((resolve, reject) => {
    get(
      'notifyMessage',
      data,
      res => {
        resolve(res);
      },
      language
    );
  });
};

//删除消息api
const deleteNew = (id, language) => {
  return new Promise((resolve, reject) => {
    deleteRe('notifyMessage/' + id, "", res => {
      resolve(res);
    }, language);
  });
};

//获取消息详情api
const feedBackDetail = (id, language) => {
  return new Promise((resolve, reject) => {
    put(
      'notifyMessage/' + id, {
        "readStatus": "READED"
      },
      res => {
        resolve(res);
      },
      language
    );
  });
};

//账号绑定api
const bind = (data, language) => {
  return new Promise((resolve, reject) => {
    put(
      'auth/bind',
      data,
      res => {
        resolve(res);
      },
      language
    );
  });
};

//获取手机验证码api
const phoneCode = (area, phone, language) => {
  return new Promise((resolve, reject) => {
    post(
      'phoneCode/sendValidate/' + area + '/' + phone,
      '',
      res => {
        resolve(res);
      },
      language
    );
  });
};

//订单详情api
const activityOderDetail = (id, language) => {
  return new Promise((resolve, reject) => {
    get(
      'order/' + id,
      '',
      res => {
        resolve(res);
      },
      language
    );
  });
};

//添加播放视屏、音频记录api
const addVAs = (data, language) => {
  return new Promise((resolve, reject) => {
    post('playRecord', data, res => {
      resolve(res);
    }, language);
  });
};

//评论列表api
const relationList = (data, language) => {
  return new Promise((resolve, reject) => {
    get(
      'portal/review',
      data,
      res => {
        resolve(res);
      },
      language
    );
  });
};

//发送评论api
const sendRelation = (data, language) => {
  return new Promise((resolve, reject) => {
    post('portal/review', data, res => {
      resolve(res);
    }, language);
  });
};

//评论详情api
const relationDetail = (id, language) => {
  return new Promise((resolve, reject) => {
    get(
      'portal/review/' + id,
      '',
      res => {
        resolve(res);
      },
      language
    );
  });
};


//删除评论
const deleteComment = (data, language) => {
  return new Promise((resolve, reject) => {
    deleteRe('portal/review', data, res => {
      resolve(res);
    }, language);
  });
};

//点赞接口api
const getGood = (data, language) => {
  return new Promise((resolve, reject) => {
    post('portal/praise', data, res => {
      resolve(res);
    }, language);
  });
};

//最新消息接口api
const unreadNews = (data, language) => {
  return new Promise((resolve, reject) => {
    post('notifyMessage/count', data, res => {
      resolve(res);
    }, language);
  });
};

//取消点赞api
const cancelGetGood = (data, language) => {
  return new Promise((resolve, reject) => {
    deleteRe('praise/cancel', data, res => {
      resolve(res);
    }, language);
  });
};

//搜索api
const searchCategory = (type, language) => {
  return new Promise((resolve, reject) => {
    get(
      'category/search/' + type,
      '',
      res => {
        resolve(res);
      },
      language
    );
  });
};

//搜索分类api
const searchSort = (data, language) => {
  return new Promise((resolve, reject) => {
    get(
      'label/byType',
      data,
      res => {
        resolve(res);
      },
      language
    );
  });
};

//邮箱登录api
const emailLogin = (data, language) => {
  return new Promise((resolve, reject) => {
    post('auth/wechatMiniLogin', data, res => {
      resolve(res);
    }, language);
  });
};

//找回密码api
const findPassword = (data, language) => {
  return new Promise((resolve, reject) => {
    put('auth/findPassword', data, res => {
      resolve(res);
    }, language);
  });
};

//获取邮箱验证码api
const emailCode = (email, language) => {
  return new Promise((resolve, reject) => {
    get(
      'sendValidEmail?email=' + email,
      '',
      res => {
        resolve(res);
      },
      language
    );
  });
};
module.exports = {
  courseDetail,
  courseLists,
  activityDetail,
  activityLists,
  activityOders,
  courseOders,
  login,
  pay,
  putOder,
  swiper,
  recommended,
  putUserInfo,
  collection,
  newLists,
  newDetail,
  hotSearch,
  userInfo,
  cancelCollection,
  report,
  historyVideo,
  historyAudio,
  favoriteList,
  feedBackList,
  deleteNew,
  feedBackDetail,
  phoneCode,
  activityOderDetail,
  addVAs,
  searchSize,
  relationList,
  sendRelation,
  relationDetail,
  deleteComment,
  getGood,
  cancelGetGood,
  searchCategory,
  searchSort,
  emailLogin,
  findPassword,
  emailCode,
  bind,
  unreadNews
};
