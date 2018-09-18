<style lang="less">
.courseItem {
  width: 100%;
  height: 156rpx;
  padding: 26rpx 0 38rpx 0;
  border-bottom: 2rpx solid #e5e3e3;
  position: relative;
}

.courseItem image {
  width: 156rpx;
  height: 156rpx;
  border-radius: 8rpx;
  float: left;
}

.course-right {
  float: left;
  margin-left: 36rpx;
  height: 100%;
  width: 494rpx;
}

.course-title {
  font-size: 28rpx;
  line-height: 40rpx;
  height: 40rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.course-name {
  font-size: 26rpx;
  line-height: 36rpx;
  height: 36rpx;
  overflow: hidden;
  margin: 6rpx 0 8rpx 0;
}

.course-detail {
  font-size: 24rpx;
  line-height: 34rpx;
  height: 34rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999999;
  margin-bottom: 4rpx;
}

.course-price-box {
  line-height: 36rpx;
  font-size: 26rpx;
}

.course-people {
  float: left;
  line-height: 32rpx;
  font-size: 22rpx;
  color: #999999;
  margin-top: 4rpx;
}

.course-price {
  color: #a90202;
  float: right;
}

.courseItem:last-child {
  border: 0;
}

.is-refund {
  color: #9b9b9b;
}

.courseItem .refund-img {
  width: 88rpx;
  height: 44rpx;
  position: absolute;
  right: 0;
  top: 38rpx;
  border-radius: 0;
}
</style>
<template>
  <view class="courseItem" wx:for="{{courseItemOption}}" wx:key="{{index}}" data-set="{{item.onlineCourseId}}" catchtap="navTo">
    <image binderror="imgErr" data-set="{{index}}" mode="aspectFill" src="{{item.cover}}"/>
    <view class="course-right">
        <view class="course-title">{{item.name}}</view>
        <view class="course-name">{{item.artist.name}}</view>
        <view class="course-detail"><text wx:for="{{item.introduction}}" wx:key="{{index}}">{{item.type=='text'?item.content:''}}</text></view>
        <view class="course-price-box">
            <text class="course-people">{{item.quantity}}{{language=="ZH"?'人已订阅':'subscribers'}}</text>
            <view class="course-price {{item.orderStatus=='REFUND_SUCCESS'?'is-refund':''}}">¥{{item.price/100}}/{{item.allResourceDuration}}{{language=="ZH"?'课时':'hours'}}</view>
        </view>
    </view>
    <image mode="aspectFill" wx:if="{{item.orderStatus=='REFUND_SUCCESS'}}" class="refund-img" src="http://pc1u34h1m.bkt.clouddn.com/paid.png"></image>
  </view>
</template>
<script>
import wepy from 'wepy';

export default class MeCourseItem extends wepy.component {
  props = {
    ishao: Object
  };

  data = {
    isRefund: false,
    courseItemOption: [],
    language: 'ZH'
  };

  events = {
    putCourse(data) {
      this.courseItemOption = data;
      for (var i = 0; i < this.courseItemOption.length; i++) {
        this.courseItemOption[i].allResourceDuration = (
          this.courseItemOption[i].allResourceDuration /
          1000 /
          60 /
          60
        ).toFixed(1);
        try {
          this.courseItemOption[i].introduction = JSON.parse(
            this.courseItemOption[i].introduction
          );
        } catch (err) {
          this.courseItemOption[i].introduction = [];
        }
      }
    },
    CL() {
      this.language = wx.getStorageSync('language');
    }
  };

  watch = {};

  methods = {
    navTo(e) {
      wx.navigateTo({
        url: '/pages/course/courseVideoDetail?id=' + e.currentTarget.dataset.set
      });
    },
    imgErr(e) {
      this.courseItemOption[e.currentTarget.dataset.set].thumbnail =
        'http://pc1u34h1m.bkt.clouddn.com/defult.png';
    }
  };
  onShow() {}
  onLoad() {}
}
</script>