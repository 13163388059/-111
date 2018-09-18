<style lang="less">
page {
  background: #f2f2f2;
}

.header {
  width: 100%;
  background: #f2f2f2;
  border-bottom: 2rpx solid #e5e3e3;
}

.get-info {
  width: 400rpx;
  margin-top: 90rpx;
}

.header image {
  width: 154rpx;
  height: 154rpx;
  border-radius: 50%;
  margin: 57rpx 0 0 298rpx;
}

.me-top {
  width: 686rpx;
  height: 196rpx;
  border-bottom: 2rpx solid #e5e3e3;
  background: #f7f8fa;
  display: flex;
  padding: 0 32rpx;
}

.me-class {
  flex: 1;
  height: 100%;
  float: left;
  font-size: 28rpx;
  color: #4a4a4a;
  text-align: center;
}

.me-class image {
  width: 84rpx;
  height: 84rpx;
  padding: 30rpx 14rpx 12rpx 14rpx;
}

.me-class text {
  display: block;
}

.me-footer {
  width: 100%;
  background: #fff;
}

.nav {
  width: 670rpx;
  height: 100rpx;
  border-bottom: 2rpx solid #ececec;
  display: block;
  padding: 0 40rpx;
}

.nav view {
  float: left;
  font-size: 28rpx;
  color: #333333;
  line-height: 100rpx;
}

.nav image {
  width: 16rpx;
  height: 32rpx;
  float: right;
  margin-top: 32rpx;
}

.atl {
  width: 154rpx;
  height: 154rpx;
  border-radius: 50%;
  margin: 30rpx 0 0 298rpx;
  overflow: hidden;
}

.atl .vatar {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.user-name {
  width: 100%;
  height: 50rpx;
  line-height: 50rpx;
  font-family: PingFangSC-Medium;
  font-size: 36rpx;
  color: #4a4a4a;
  text-align: center;
  margin-top: 10rpx;
}

.getPhone {
  width: 100%;
  line-height: 36rpx;
  font-size: 26rpx;
  color: #a90202;
  text-align: center;
  margin-bottom: 22rpx;
}

.phone-get-box {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(43, 46, 61, 0.9);
}

.blank-box {
  width: 100%;
  height: 100%;
}

.sollect-box {
  width: 100%;
  height: 306rpx;
  position: absolute;
  bottom: 0;
  background: #ffffff;
}

.phone-btn {
  height: 100rpx;
  border-bottom: 2rpx solid #e5e4e4;
  width: 100%;
  background: #ffffff;
  line-height: 100rpx;
  text-align: center;
  font-size: 32rpx;
  color: #3a3a3a;
  padding: 0;
  border-radius: 0;
}

.phone-btn:last-child {
  border: 0;
}

button::after {
  border: 0;
}

.friend-share,
.people-share {
  width: 176rpx;
  height: 160rpx;
  background: none;
  color: #fff;
}

.people-share {
  padding: 28rpx;
  width: 120rpx;
  margin-left: 287rpx;
  margin-top: 55rpx;
}

.friend-share {
  margin-top: 495rpx;
}

.friend-share image,
.people-share image {
  width: 120rpx;
  height: 120rpx;
  float: left;
}

.friend-share view,
.people-share view {
  font-size: 24rpx;
  color: #ffffff;
  line-height: 24rpx;
  float: left;
  width: 100%;
  text-align: center;
  margin-top: 10rpx;
}

.close-icon {
  width: 50rpx;
  height: 50rpx;
  padding: 20rpx;
  margin-left: 326rpx;
  margin-top: 55rpx;
}

.nav .unreadNum {
  width: 50rpx;
  height: 50rpx;
  background: #a90202;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 50rpx;
  float: right;
  margin-right: 30rpx;
  margin-top: 25rpx;
  font-size: 24rpx;
}
</style>
<template>
  <view class="container">
    <view class="header">
      <view catchtap="bigImage" data-set="{{userInfo.photo==undefined?'http://pc1u34h1m.bkt.clouddn.com/headerImg.png':userInfo.photo}}" class="atl"><image class="vatar" src="{{userInfo.photo==undefined?'http://pc1u34h1m.bkt.clouddn.com/headerImg.png':userInfo.photo}}"></image></view>
      <view catchtap="meData" class="user-name"><view>{{userInfo.token==undefined?language=='ZH'?'请登陆':'Log in':userInfo.nickname==undefined?language=='ZH'?'用户':'User':userInfo.nickname}}</view></view>
    </view>
    <view class="me-top">
      <view class="me-class" catchtap="meSubscribe"><image src='http://pc1u34h1m.bkt.clouddn.com/%E8%AE%A2%E9%98%85-2.png'></image><text>{{content.meRead}}</text></view>
      <view class="me-class" catchtap="meActivity"><image src="http://pc1u34h1m.bkt.clouddn.com/%E6%B4%BB%E5%8A%A8-7.png"></image><text>{{content.meActivity}}</text></view>
      <view class="me-class" catchtap="meHistory"><image src="http://pc1u34h1m.bkt.clouddn.com/%E5%8E%86%E5%8F%B2-3.png"></image><text>{{content.history}}</text></view>
    </view>
    <view class="me-footer">
      <navigater catchtap="meCollection" class="nav"><view>{{content.meCollection}}</view><image src="http://pc1u34h1m.bkt.clouddn.com/right%402x.png"></image></navigater>
      <navigater catchtap="meComment" class="nav"><view>{{content.meComment}}</view><image src="http://pc1u34h1m.bkt.clouddn.com/right%402x.png"></image></navigater>
      <navigater catchtap="meNews" class="nav"><view>{{content.meNews}}</view><image src="http://pc1u34h1m.bkt.clouddn.com/right%402x.png"></image><view wx:if="{{unReadNumber!=0}}" class="unreadNum">{{unReadNumber>0?unReadNumber:''}}</view></navigater>
      <navigater catchtap="meSet" class="nav"><view>{{content.setting}}</view><image src="http://pc1u34h1m.bkt.clouddn.com/right%402x.png"></image></navigater>
    </view>
  <view wx:if="{{isGetPhone}}" class="phone-get-box">
    <button class="friend-share" open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber"><image src="http://pc1u34h1m.bkt.clouddn.com/icon_wechat%402x.png"></image><view>一键绑定</view></button>
    <view catchtap="writePhone" class="people-share"><image src="http://pc1u34h1m.bkt.clouddn.com/phone-cion.png"></image><view>手机绑定</view></view>
    <image  catchtap="cancelGet" class="close-icon" src="http://pc1u34h1m.bkt.clouddn.com/cancel-icon2.png"></image>
  </view>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import navigation from '../components/navigation';
import tabBar from '../components/tabBar';
import { unreadNews } from '../api/index.js';
var ab = 123;
export default class Me extends wepy.page {
  config = {};
  components = {
    toast: Toast
    // navigation: navigation,
    // tabBar: tabBar
  };

  data = {
    // navigationOption: {
    //   title: '我的',
    //   icon: false
    // }
    isuserInfo: true,
    userInfo: '',
    isGetPhone: false,
    content: {},
    contentZh: {
      meRead: '我的订阅',
      meActivity: '我的活动',
      history: '播放历史',
      meCollection: '我的收藏',
      meComment: '我的评论',
      meNews: '我的消息',
      setting: '设置'
    },
    contentEn: {
      meRead: 'My Courses',
      meActivity: 'My Activities',
      history: 'Play Histories',
      meCollection: 'My Favorites',
      meComment: 'My comments',
      meNews: 'Messages',
      setting: 'Settings'
    },
    language: 'ZH',
    unReadNumber: 0
  };

  computed = {};

  methods = {
    cancelGet() {
      this.isGetPhone = false;
    },
    getPhone() {
      this.isGetPhone = true;
    },
    getPhoneNumber(e) {
      console.log(e);
    },
    meData() {
      if (
        wx.getStorageSync('importantInfo') == '' ||
        wx.getStorageSync('importantInfo') == undefined
      ) {
        wx.navigateTo({
          url: 'login'
        });
        return;
      }
      wx.navigateTo({
        url: 'me/meData'
      });
    },
    bigImage(e) {
      var url = e.currentTarget.dataset.set;
      wx.previewImage({
        current: url, // 当前显示图片的http链接
        urls: [url] // 需要预览的图片http链接列表
      });
    },
    meSubscribe() {
      if (
        wx.getStorageSync('importantInfo') == '' ||
        wx.getStorageSync('importantInfo') == undefined
      ) {
        wx.navigateTo({
          url: '/pages/login'
        });
        return;
      }
      wx.navigateTo({
        url: 'me/meSubscribe'
      });
    },
    meActivity() {
      if (
        wx.getStorageSync('importantInfo') == '' ||
        wx.getStorageSync('importantInfo') == undefined
      ) {
        wx.navigateTo({
          url: 'login'
        });
        return;
      }
      wx.navigateTo({
        url: 'me/meActivity'
      });
    },
    meHistory() {
      if (
        wx.getStorageSync('importantInfo') == '' ||
        wx.getStorageSync('importantInfo') == undefined
      ) {
        wx.navigateTo({
          url: 'login'
        });
        return;
      }
      wx.navigateTo({
        url: 'me/meHistory'
      });
    },
    meCollection() {
      if (
        wx.getStorageSync('importantInfo') == '' ||
        wx.getStorageSync('importantInfo') == undefined
      ) {
        wx.navigateTo({
          url: 'login'
        });
        return;
      }
      wx.navigateTo({
        url: 'me/meCollection'
      });
    },
    meComment() {
      if (
        wx.getStorageSync('importantInfo') == '' ||
        wx.getStorageSync('importantInfo') == undefined
      ) {
        wx.navigateTo({
          url: 'login'
        });
        return;
      }
      wx.navigateTo({
        url: 'me/meComment'
      });
    },
    meNews() {
      if (
        wx.getStorageSync('importantInfo') == '' ||
        wx.getStorageSync('importantInfo') == undefined
      ) {
        wx.navigateTo({
          url: 'login'
        });
        return;
      }
      wx.navigateTo({
        url: 'me/meNews'
      });
    },
    meSet() {
      wx.navigateTo({
        url: 'me/meSet'
      });
    },
    writePhone() {
      wx.navigateTo({
        url: 'me/getPhone'
      });
    }
  };

  events = {};

  init() {
    this.userInfo = wx.getStorageSync('importantInfo');
    if (wx.getStorageSync('language') == 'EN') {
      this.content = this.contentEn;
      wx.setNavigationBarTitle({
        title: 'Me'
      });
      wx.setTabBarItem({
        index: 0,
        text: 'Home'
      });
      wx.setTabBarItem({
        index: 1,
        text: 'Course'
      });
      wx.setTabBarItem({
        index: 2,
        text: 'Activitie'
      });
      wx.setTabBarItem({
        index: 3,
        text: 'Infomation'
      });
      wx.setTabBarItem({
        index: 4,
        text: 'Me'
      });
    } else {
      this.content = this.contentZh;
      wx.setNavigationBarTitle({
        title: '我的'
      });
      wx.setTabBarItem({
        index: 0,
        text: '首页'
      });
      wx.setTabBarItem({
        index: 1,
        text: '课程'
      });
      wx.setTabBarItem({
        index: 2,
        text: '活动'
      });
      wx.setTabBarItem({
        index: 3,
        text: '资讯'
      });
      wx.setTabBarItem({
        index: 4,
        text: '我的'
      });
    }
  }

  async onShow() {
    this.init();
    this.language = wx.getStorageSync('language');
    if (
      wx.getStorageSync('importantInfo') == '' ||
      wx.getStorageSync('importantInfo') == undefined
    ) {
      this.unReadNumber = 0;
    } else {
      await unreadNews(
        {
          readStatus: 'UN_READ',
          receiverUserId: wx.getStorageSync('importantInfo').userId
        },
        this.language
      ).then(res => {
        this.unReadNumber = res;
      });
    }

    this.$apply();
  }
  onLoad() {
    // wx.getLocation({
    //   type: 'gcj02',
    //   success: function(res) {
    //     console.log(res);
    //     var latitude = res.latitude;
    //     var longitude = res.longitude;
    //     var speed = res.speed;
    //     var accuracy = res.accuracy;
    //   }
    // });
    // wx.chooseLocation({
    //   success: res => {
    //     console.log(res);
    //   }
    // });
    // this.init();
    // console.log()
    // wx.setNavigationBarTitle({
    //   title: '当前页面'
    // });
    // wx.setTabBarItem({
    //   index: 0,
    //   text: 'index',
    //   iconPath: './assets/icon/index.png',
    //   selectedIconPath: './assets/icon/index1.png'
    // });
  }
}
</script>