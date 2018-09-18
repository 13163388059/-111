<style lang="less">
.activi-content {
  width: 718rpx;
  padding-left: 32rpx;
}

.activity-list {
  width: 100%;
  height: 156rpx;
  padding: 26rpx 0 38rpx 0;
  border-bottom: 2rpx solid #e5e3e3;
}

.activity-list:last-child {
  border: 0;
}

.activity-list image {
  width: 260rpx;
  height: 156rpx;
  float: left;
  border-radius: 8rpx;
}

.content-right {
  width: 402rpx;
  height: 156rpx;
  margin-left: 26rpx;
  float: left;
}

.content-title {
  width: 100%;
  height: 80rpx;
  line-height: 40rpx;
  font-size: 28rpx;
  overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
}

.content-city {
  width: 100%;
  line-height: 34rpx;
  font-size: 24rpx;
  color: #4a4a4a;
  margin: 8rpx 0;
}

.content-footer {
  width: 100;
  height: 36rpx;
  line-height: 36rpx;
}

.content-time {
  font-size: 22rpx;
  color: #999999;
  float: left;
  line-height: 40rpx;
}

.content-price {
  font-family: PingFangSC-Medium;
  font-size: 26rpx;
  color: #a90202;
  float: right;
}
</style>
<template>
  <view class="activi-content">
    <view class="activity-list" wx:for="{{activityContentOption}}" data-set="{{item.offlineActivityId}}" wx:key="{{index}}" @tap="toDetail">
      <image mode="aspectFill" binderror="imgErr" data-set="{{index}}" src="{{item.cover}}"/>
      <view class="content-right">
        <view class="content-title">{{item.name}}</view>
        <view class="content-city">{{item.naddress}}</view>
        <view class="content-footer">
          <view class="content-time">{{item.createTime}}</view>
          <view class="content-price"><text wx:if="{{item.priceRange!=='免费'}}">¥</text>{{item.priceRange=='免费'?language=='ZH'?'免费':'Free':item.priceRange}}</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import wepy from 'wepy';
import { getTime } from '../utils/filter';
export default class ActivityContent extends wepy.component {
  props = {};

  data = {
    activityContentOption: [],
    language: 'ZH'
  };
  events = {
    CL() {
      this.language = wx.getStorageSync('language');
    },
    putActivity(data, status) {
      for (var i = 0; i < data.length; i++) {
        if (this.language == 'ZH') {
          data[i].createTime = getTime.getZHymd(data[i].createTime);
        } else {
          data[i].createTime = getTime.getENymd(data[i].createTime);
        }
      }
      if (status == true) {
        for (var i = 0; i < data.length; i++) {
          this.activityContentOption.push(data[i]);
        }
      } else {
        this.activityContentOption = data;
      }
    },
    noData() {
      this.activityContentOption = [];
    }
  };

  watch = {};
  methods = {
    toDetail(e) {
      wx.navigateTo({
        url: '/pages/activity/activityDetail?id=' + e.currentTarget.dataset.set
      });
    },
    imgErr(e) {
      this.activityContentOption[e.currentTarget.dataset.set].cover =
        'http://pc1u34h1m.bkt.clouddn.com/defult.png';
    }
  };
  onLoad() {}
}
</script>