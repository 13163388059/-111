<style lang="less">
.tabBar {
  width: 100%;
  height: 98rpx;
  border-top: 2rpx solid #ccc;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #f6f6f6;
  z-index: 9;
}

.tabBar view {
  flex: 1;
  font-size: 22rpx;
  color: #777;
  text-align: center;
}

.tabBar view image {
  width: 50rpx;
  height: 50rpx;
  float: left;
  margin: auto;
  display: block;
  margin-left: calc(50% - 17rpx);
  margin-top: 8rpx;
}

.tabBar view text {
  width: 100%;
  line-height: 24rpx;
  float: left;
  margin-top: 5rpx;
}
</style>
<template>
  <view class="tabBar">
      <view data-set="index?pages=0" @tap="navigationTo">
          <image wx:if="{{pages!=0}}" src="../image/house1.png"></image>
          <image wx:if="{{pages==0}}" src="../image/icon.jpg"></image>
          <text>首页</text>
      </view>
      <view data-set="course?pages=1" @tap="navigationTo">
          <image wx:if="{{pages!=1}}" src="../image/house1.png"></image>
          <image wx:if="{{pages==1}}" src="../image/icon.jpg"></image>
          <text> 课程</text>
      </view>
      <view data-set="activity?pages=2" @tap="navigationTo">
          <image wx:if="{{pages!=2}}" src="../image/house1.png"></image>
          <image wx:if="{{pages==2}}" src="../image/icon.jpg"></image>
          <text>活动</text>
      </view>
      <view data-set="information?pages=3" @tap="navigationTo">
          <image wx:if="{{pages!=3}}" src="../image/house1.png"></image>
          <image wx:if="{{pages==3}}" src="../image/icon.jpg"></image>
          <text>资讯</text>
      </view>
      <view data-set="me?pages=4" @tap="navigationTo">
          <image wx:if="{{pages!=4}}" src="../image/house1.png"></image>
          <image wx:if="{{pages==4}}" src="../image/icon.jpg"></image>
          <text>我的</text>
      </view>
  </view>
</template>
<script>
import wepy from 'wepy';
let app = getApp();

export default class Counter extends wepy.component {
  props = {
    navigationOption: Object
  };

  data = {
    route: 'index',
    pages: 0,
    tarList: []
  };

  events = {};

  watch = {};

  methods = {
    navigationTo(e) {
      if (e.currentTarget.dataset.set.slice(0, -8) !== this.route)
        wx.navigateTo({
          url: e.currentTarget.dataset.set,
          success: e => {}
        });
    }
  };
  init() {
    const p = getCurrentPages();
    this.route = p[p.length - 1].route.slice(6);
    if (
      p[p.length - 1].options.pages !== 0 &&
      p[p.length - 1].options.pages !== undefined
    ) {
      this.pages = p[p.length - 1].options.pages;
    }
  }
  onLoad() {
    this.init();
  }
}
</script>
