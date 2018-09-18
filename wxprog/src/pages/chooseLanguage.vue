
<style lang="less">
.is-english {
  width: 670rpx;
  line-height: 92rpx;
  text-align: center;
  color: #ffffff;
  font-size: 32rpx;
  background-image: linear-gradient(-237deg, #db3069 0%, #a90202 100%);
  border-radius: 6rpx;
  margin-top: 250rpx;
  float: left;
}

.is-chinese {
  width: 670rpx;
  line-height: 92rpx;
  text-align: center;
  color: #ffffff;
  font-size: 32rpx;
  background-image: linear-gradient(-237deg, #db3069 0%, #a90202 100%);
  border-radius: 6rpx;
  margin-top: 100rpx;
  float: left;
}
</style>
<template>
  <view class="container">
    <view class="is-english" data-set="EN" catchtap="languageChange">English</view>
    <view class="is-chinese" data-set="ZH" catchtap="languageChange">中文</view>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';

export default class ChooseLanguage extends wepy.page {
  config = {};
  components = {};

  data = {
    language: 'ZH'
  };

  computed = {};

  methods = {
    languageChange(e) {
      this.language = e.currentTarget.dataset.set;
      wx.setStorageSync('language', e.currentTarget.dataset.set);
      this.isRed = !this.isRed;
      console.log(this.language);
      if (this.language == 'EN') {
        wx.setNavigationBarTitle({
          title: 'Choose language'
        });
      } else {
        wx.setNavigationBarTitle({
          title: '选择语言'
        });
      }
      wx.switchTab({
        url: 'index'
      });
    }
  };

  events = {};

  onLoad() {
    wx.setNavigationBarTitle({
      title: 'Choose language'
    });
  }
}
</script>