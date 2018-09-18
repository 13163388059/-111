<style lang="less">
.remove-template {
  width: 750rpx;
  overflow: hidden;
}

.remove-delete {
  width: 862rpx;
}

.delete-btn {
  width: 112rpx;
  height: 100%;
  background: #d0021b;
  color: #ffffff;
  text-align: center;
  line-height: 200rpx;
  font-size: 28rpx;
  float: left;
}

.is-remove {
  margin-left: -112rpx;
}

.left {
  width: 750rpx;
  float: left;
}

.news-list {
  width: 100%;
  padding: 32rpx;
  border-bottom: 2rpx solid #9b9b9b;
  float: left;
}

.last-child {
  border: 0;
}

.news-icon {
  width: 90rpx;
  height: 90rpx;
  border-radius: 8rpx;
  float: left;
  position: relative;
}

.news-icon image {
  width: 100%;
  height: 100%;
}

.news-right {
  width: 564rpx;
  margin-left: 36rpx;
  float: left;
}

.title-time {
  line-height: 44rpx;
  width: 100%;
  font-size: 32rpx;
  color: #000000;
}

.time {
  line-height: 44rpx;
  float: right;
  font-size: 24rpx;
  color: #adadad;
}

.news-detail {
  width: 100%;
  line-height: 40rpx;
  height: 80rpx;
  margin-top: 10rpx;
  font-size: 28rpx;
  color: #808080;
  overflow:hidden;
}

.red-line {
  width: 18rpx;
  height: 18rpx;
  border-radius: 50%;
  position: absolute;
  right: -5rpx;
  top: -5rpx;
  background: #e90924;
}
</style>
<template >
  <view class="contain">
        <view wx:for="{{swiperRemoveOption}}" wx:key="{{index}}">
            <view data-set="{{index}}" bindtouchstart="removeStart" bindtouchend="removeEnd" class="remove-template">
                <view class="remove-delete {{isRemove==index?'is-remove':''}}">
                    <view catchtap="navTo" data-set="{{item.id}}" class="left">
                        <view class="news-list {{index==swiperRemoveOption.length-1?'last-child':''}}" >
                            <view class="news-icon">
                                <image wx:if="{{item.notifyType=='ACTIVITY_NOTIFY'}}" mode="aspectFill" src="{{iconImgs[0]}}"></image>
                                <image wx:if="{{item.notifyType=='COUPONS_NOTIFY'}}" mode="aspectFill" src="{{iconImgs[1]}}"></image>
                                <image wx:if="{{item.notifyType=='SYSTEM_NOTIFY'}}" mode="aspectFill" src="{{iconImgs[2]}}"></image>
                                <view wx:if="{{item.readStatus=='UN_READ'}}" class="red-line"></view>
                            </view>
                            <view class="news-right">
                                <view class="title-time">
                                  {{item.notifyType=='ACTIVITY_NOTIFY'?language=='ZH'?'参与活动':'Participate Activities':''}}
                                  {{item.notifyType=='COUPONS_NOTIFY'?language=='ZH'?'课程提醒':'Course Remind':''}}
                                  {{item.notifyType=='SYSTEM_NOTIFY'?language=='ZH'?'系统通知':'System':''}}
                                  <view class="time">{{item.createTime}}</view></view>
                                <view class="news-detail">{{item.description}}</view>
                            </view>
                        </view>
                    </view>
                    <view data-set="{{[index,item.id]}}" catchtap="delete" class="delete-btn">{{language=='ZH'?'删除':'delete'}}</view>
                </view>
            </view>
        </view>
  </view>
</template>
<script>
import wepy from 'wepy';
import { deleteNew } from '../api/index';
export default class SwiperRemove extends wepy.component {
  props = {
    swiperRemoveOption: Object
  };

  data = {
    isRemove: -1,
    startX: 0,
    distance: 0,
    language: 'ZH',
    iconImgs: [
      'http://pc1u34h1m.bkt.clouddn.com/activity.png',
      'http://pc1u34h1m.bkt.clouddn.com/course-remind.png',
      'http://pc1u34h1m.bkt.clouddn.com/system-message.png'
    ]
  };
  events = {
    CL(status) {
      this.language = wx.getStorageSync('language');
    }
  };

  watch = {};

  methods = {
    removeStart(e) {
      this.startX = e.changedTouches[0].pageX;
    },
    removeEnd(e) {
      this.distance = this.startX - e.changedTouches[0].pageX;
      if (this.distance >= 50) {
        this.isRemove = true;
        this.isRemove = e.currentTarget.dataset.set;
      } else if (this.distance <= -50) {
        this.isRemove = false;
        this.isRemove = -1;
      }
    },
    async delete(e) {
      await deleteNew(e.currentTarget.dataset.set[1], this.language).then(
        res => {
          if (res == '') {
            this.swiperRemoveOption.splice([e.currentTarget.dataset.set[0]], 1);
            this.isRemove = -1;
            this.$apply();
          }
        }
      );
    },
    navTo(e) {
      wx.navigateTo({
        url: '/pages/me/newsDetail?id=' + e.currentTarget.dataset.set
      });
    }
  };
  onLoad() {}
}
</script>