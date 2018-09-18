<style lang="less">
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
</style>

<script>
import wepy from 'wepy';
import TestMixin from './mixins/test';
import 'wepy-async-function';
import seed from './seed';
import Toast from 'wepy-com-toast';
export default class extends wepy.app {
  config = {
    pages: [
      'pages/index',
      'pages/course',
      'pages/information',
      'pages/activity',
      'pages/me',
      'pages/activity/activitySearch',
      'pages/activity/activityDetail',
      'pages/course/courseSearch',
      'pages/me/meMoney',
      'pages/activity/oderCategory',
      'pages/activity/oderMan',
      'pages/activity/oderSure',
      'pages/activity/oderPay',
      'pages/activity/payOk',
      'pages/activity/map',
      'pages/course/courseVideoDetail',
      'pages/course/courseVideo',
      'pages/course/videoPay',
      'pages/course/commentDetail',
      'pages/information/informationDetail',
      'pages/login',
      'pages/emailLogin',
      'pages/missPassword',
      'pages/me/meData',
      'pages/me/chooseCountry',
      'pages/me/meSubscribe',
      'pages/me/meActivity',
      'pages/me/meHistory',
      'pages/me/meCollection',
      'pages/me/meComment',
      'pages/me/meNews',
      'pages/me/newsDetail',
      'pages/me/meSet',
      'pages/me/changeLanguage',
      'pages/me/feedback',
      'pages/information/informationSearch',
      'pages/me/getPhone',
      'pages/me/getEmail',
      'pages/phoneLogin',
      'pages/chooseLanguage'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#A90202',
      navigationBarTitleText: 'Or Rouge',
      navigationBarTextStyle: '#fff',
      // enablePullDownRefresh: true,
      onShareAppMessage: true
      // navigationStyle: 'custom'
    },
    tabBar: {
      selectedColor: '#a90202',
      list: [
        {
          pagePath: 'pages/index',
          text: '首页',
          iconPath: './assets/icon/index.png',
          selectedIconPath: './assets/icon/index1.png'
        },
        {
          pagePath: 'pages/course',
          text: '课程',
          iconPath: './assets/icon/course.png',
          selectedIconPath: './assets/icon/course1.png'
        },
        {
          pagePath: 'pages/activity',
          text: '活动',
          iconPath: './assets/icon/activity.png',
          selectedIconPath: './assets/icon/activity1.png'
        },
        {
          pagePath: 'pages/information',
          text: '资讯',
          iconPath: './assets/icon/information.png',
          selectedIconPath: './assets/icon/information1.png'
        },
        {
          pagePath: 'pages/me',
          text: '我的',
          iconPath: './assets/icon/me.png',
          selectedIconPath: './assets/icon/me1.png'
        }
      ]
    },
    networkTimeout: {
      request: 10000,
      downloadFile: 10000
    },
    debug: false
  };
  constructor() {
    super();
    this.use('promisify');
  }
  mixins = [TestMixin];
  globalData = {
    userInfo: null,
    courseSearch: '',
    activitySearch: '',
    informationSearch: ''
  };
  getData() {
    if (this.globalData.language === 'chinese') {
      this.globalData.seed = seed.chinese;
    } else {
      this.globalData.seed = seed.english;
    }
  }
  onShow() {
    this.getData();
  }
  onLoad() {}
}
</script>
