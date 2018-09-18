<style lang="less">
.title-line {
  width: 100%;
  height: 42rpx;
  font-size: 30rpx;
  color: #4a4a4a;
  padding: 24rpx 0 18rpx 0;
  position: relative;
}

.line {
  width: 100%;
  height: 2rpx;
  background: #e5e3e3;
  margin-top: 21rpx;
}

.line-content {
  display: inline-block;
  padding: 0 40rpx;
  line-height: 42rpx;
  background: #fff;
  margin: auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 24rpx;
}
</style>
<template>
  <view class="title-line">
    <view class="line"></view>
    <view class="line-content">{{titleLineOption}}</view>
  </view>
</template>
<script>
import wepy from 'wepy';

export default class titleLine extends wepy.component {
  props = {
    titleLineOption: String
  };

  data = {
    left: 0,
    language: 'ZH'
  };
  events = {
    CL() {
      this.language = wx.getStorageSync('language');
      if (this.language == 'ZH') {
        this.left = 343 - this.titleLineOption.length * 15 - 40 + 'rpx';
      } else {
        this.left = 343 - this.titleLineOption.length * 15 / 2 - 50 + 'rpx';
      }
    }
  };
  watch = {};

  methods = {};
  onLoad() {}
}
</script>