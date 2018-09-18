<style lang="less">
.activity {
  width: 328rpx;
  border-radius: 8rpx;
  border: 2rpx solid #e8e8e8;
  margin: 28rpx 0 40rpx 0;
  overflow: hidden;
  margin-right: 27rpx;
  float: left;
}

.activity image {
  width: 100%;
  height: 174rpx;
  float: left;
}

.activity-content {
  font-family: PingFangSC-Medium;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.8);
  width: 296rpx;
  height: 72rpx;
  line-height: 36rpx;
  overflow: hidden;
  float: left;
  margin-left: 14rpx;
  margin-top: 12rpx;
}

.activity-time {
  width: 296rpx;
  height: 34rpx;
  line-height: 34rpx;
  color: #9b9b9b;
  font-size: 24rpx;
  margin: 14rpx 0 28rpx 14rpx;
  float: left;
}

.activity-city {
  float: right;
}
</style>
<template>
  <view class="activity" wx:for="{{activityContentOption}}" data-set="{{item.offlineActivityId}}" wx:key="{{index}}" catchtap="navigateto">
    <image mode="aspectFill" binderror="imgErr" data-set="{{index}}" src="{{item.cover}}"/>
    <view class="activity-content">{{item.name}}</view>
    <view class="activity-time">{{item.startTime}}<text class="activity-city">{{item.province}}</text></view>
  </view>
</template>
<script>
import wepy from 'wepy';
import { getTime } from '../utils/filter';

export default class ActivityItem extends wepy.component {
  props = {
    activityItemOption: Object
  };

  data = {
    activityContentOption: [],
    language: 'ZH'
  };
  events = {
    CL() {
      this.language = wx.getStorageSync('language');
    },
    putActivity(data, status) {
      if (status == true) {
        for (var i = 0; i < data.length; i++) {
          this.activityContentOption.push(data[i]);
        }
      } else {
        this.activityContentOption = data;
      }
      for (var i = 0; i < this.activityContentOption.length; i++) {
        if (this.language == 'ZH') {
          this.activityContentOption[i].startTime = getTime.getZHymd(
            this.activityContentOption[i].startTime
          );
        } else {
          this.activityContentOption[i].startTime = getTime.getENymd(
            this.activityContentOption[i].startTime
          );
        }
      }
    }
  };

  watch = {};

  methods = {
    navigateto(e) {
      wx.navigateTo({
        url: 'activity/activityDetail?id=' + e.currentTarget.dataset.set
      });
    },
    imgErr(e) {
      this.activityContentOption[e.currentTarget.dataset.set].cover =
        'http://pc1u34h1m.bkt.clouddn.com/defult.png';
    }
  };
}
</script>
