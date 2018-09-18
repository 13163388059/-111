<style lang="less">
page {
  background: #f2f2f2;
}
.set-list {
  width: 675rpx;
  padding: 0 35rpx 0 40rpx;
  line-height: 100rpx;
  background: #ffffff;
  font-size: 28rpx;
  color: #333333;
  box-shadow: inset 0 -1px 0 0 #e3e3e3, inset 0 1px 0 0 #e3e3e3;
  margin-bottom: 16rpx;
}

.right-content {
  color: #999999;
  float: right;
}

.right-content image {
  width: 17rpx;
  height: 34rpx;
  float: right;
  margin-left: 26rpx;
  margin-top: 33rpx;
}
</style>
<template>
  <view class="container">
     <view catchtap="changeLanguage" class="set-list">{{language=='ZH'?'语言切换':'Language'}}<view class="right-content">{{language=='ZH'?'中文':'English'}}<image src="http://pc1u34h1m.bkt.clouddn.com/right.png"></image></view></view>
     <view catchtap="feedback" class="set-list">{{language=='ZH'?'意见反馈':'Help & Feedback'}}<view class="right-content"><image src="http://pc1u34h1m.bkt.clouddn.com/right.png"></image></view></view>
     <view catchtap="loginOut" class="set-list">{{language=='ZH'?'退出登录':'Log Out'}}<view class="right-content"></view></view>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';

export default class CourseSearch extends wepy.page {
  config = {};
  components = {};

  data = {
    language: 'ZH'
  };

  computed = {};

  methods = {
    loginOut() {
      wx.setStorageSync('importantInfo', '');
      wx.switchTab({
        url: '/pages/me'
      });
    },
    changeLanguage() {
      wx.navigateTo({
        url: 'changeLanguage'
      });
    },
    feedback() {
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
        url: 'feedback'
      });
    }
  };
  async onShow() {
    this.language = wx.getStorageSync('language');
    if (this.language == 'ZH') {
      wx.setNavigationBarTitle({
        title: '设置'
      });
    } else {
      wx.setNavigationBarTitle({
        title: 'Settings'
      });
    }
  }
  events = {};
  onLoad() {}
}
</script>