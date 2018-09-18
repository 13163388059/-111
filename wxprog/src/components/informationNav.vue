<style lang="less">
.information-nav {
  width: 100%;
  height: 86rpx;
  border-bottom: 2px solid #e5e3e3;
  display: flex;
}

.information-nav view {
  flex: 1;
  text-align: center;
  line-height: 86rpx;
  height: 86rpx;
  font-size: 26rpx;
  font-family: PingFangSC-Medium;
  color: #4a4a4a;
}

.information-nav view text {
  padding: 27rpx 16rpx;
  height: 86rpx;
}

.select text {
  border-bottom: 2px solid #a90202;
}
</style>
<template>
  <view class="information-nav">
      <view data-set="0" class="{{listNum==0?'select':''}}" catchtap="select"><text>全部</text></view>
      <view data-set="1" class="{{listNum==1?'select':''}}" catchtap="select"><text>推荐</text></view>
      <view data-set="2" class="{{listNum==2?'select':''}}" catchtap="select"><text>专访</text></view>
      <view data-set="3" class="{{listNum==3?'select':''}}" catchtap="select"><text>财经</text></view>
  </view>
</template>
<script>
import wepy from 'wepy';

export default class Counter extends wepy.component {
  props = {};

  data = {
    listNum: 0
  };
  events = {};

  watch = {};

  methods = {
    select(e) {
      this.listNum = e.currentTarget.dataset.set;
    }
  };
}
</script>