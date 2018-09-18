<style lang="less">
.navigation {
  width: 100%;
  height: 130rpx;
  background: rgba(0, 0, 0, 1);
  color: #fff;
}

.navigaton-img {
  width: 120rpx;
  height: 100rpx;
  background-size: 100%;
  float: left;
  margin-top: 20rpx;
  margin-left: 10rpx;
}

.navigaton-img image {
  width: 60rpx;
  height: 60rpx;
  float: left;
  margin-left: 20rpx;
  margin-top: 30rpx;
}

.navigation-content {
  height: 40rpx;
  width: 600rpx;
  float: left;
  margin-top: 60rpx;
  font-size: 40rpx;
  line-height: 40rpx;
}

.noreturn {
  margin-left: 40rpx;
}
</style>
<template>
  <view class="navigation">
      <view wx:if="{{navigationOption.icon}}" @tap="routerReturn" class="navigaton-img"><image mode="aspectFill" src="../image/house1.png"></image></view>
      <view class="navigation-content {{navigationOption.icon?'':'noreturn'}}">{{navigationOption.title}}</view>
  </view>
</template>
<script>
import wepy from 'wepy';

export default class Counter extends wepy.component {
  props = {
    navigationOption: Object
  };

  data = {};

  events = {};

  watch = {};

  methods = {
    routerReturn() {
      wx.navigateBack({
        delta: 1
      });
    }
  };

  onLoad() {}
}
</script>
