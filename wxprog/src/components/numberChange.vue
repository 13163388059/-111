<style lang="less">
.numberChange {
  width: 160rpx;
  height: 52rpx;
  line-height: 48rpx;
}

.number-change-add,
.number-change-reduce {
  width: 48rpx;
  height: 48rpx;
  border: 2rpx solid #cccccc;
  float: left;
  color: #cccccc;
  font-size: 40rpx;
  text-align: center;
}

.numner {
  width: 56rpx;
  height: 48rpx;
  float: left;
  border-top: 2rpx solid #cccccc;
  border-bottom: 2rpx solid #cccccc;
  text-align: center;
}
</style>
<template>
  <view class="numberChange">
    <view class="number-change-reduce" catchtap="reduce">-</view>
    <view class="numner">{{number}}</view>
    <view class="number-change-add" catchtap="add">+</view>
  </view>
</template>
<script>
import wepy from 'wepy';

export default class numberChange extends wepy.component {
  props = {
    numberChange: Number
  };

  data = {
    number: 1
  };
  events = {
    newNumber() {
      this.number = 1;
    }
  };

  watch = {};

  methods = {
    reduce() {
      if (this.number <= 1) {
        this.number = 1;
      } else {
        this.number--;
      }
      this.$emit('changeNumber', this.number);
    },
    add() {
      this.number++;
      if (this.number > this.numberChange) {
        this.number = this.numberChange;
      }
      this.$emit('changeNumber', this.number);
    }
  };
}
</script>