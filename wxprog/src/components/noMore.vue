<style lang="less">
.no-more {
  width: 686rpx;
  height: 32rpx;
  padding: 36rpx 32rpx 48rpx 32rpx;
  position: relative;
}

.no-more text {
  width: 100%;
  height: 2rpx;
  float: left;
  background: #e5e3e3;
  margin-top: 15rpx;
}

.no-more-content {
  font-size: 22rpx;
  color: #9b9b9b;
  width: 220rpx;
  line-height: 32rpx;
  position: absolute;
  background: #ffffff;
  top: 35rpx;
  left: 275rpx;
  text-align: center;
}
</style>
<template>
  <view class="no-more">
    <text></text>
    <view class="no-more-content">{{language=="ZH"?'没有更多内容了':'No more content'}}</view>
  </view>
</template>
<script>
import wepy from 'wepy';

export default class NoMore extends wepy.component {
  props = {};

  data = {
    language: 'ZH'
  };
  events = {
    CL(){
       this.language = wx.getStorageSync('language');
    }
  };

  watch = {};

  methods = {};
  onLoad() {
    this.language = wx.getStorageSync('language');
  }
}
</script>