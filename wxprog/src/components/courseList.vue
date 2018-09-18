<style lang="less">
.course {
  width: 100%;
  float: left;
}

.list-number {
  width: 102rpx;
  height: 100%;
  line-height: 138rpx;
  text-align: center;
  float: left;
  font-family: PingFangSC-Medium;
  font-size: 30rpx;
  color: #9b9b9b;
}

.list-right {
  width: 648rpx;
  border-bottom: 2rpx solid #e5e3e3;
  float: left;
}

.list-title {
  width: 440rpx;
  line-height: 42rpx;
  float: left;
  font-family: PingFangSC-Medium;
  font-size: 30rpx;
  color: #4a4a4a;
  margin-top: 29rpx;
}

.list-time {
  line-height: 42rpx;
  float: right;
  font-family: PingFangSC-Medium;
  font-size: 22rpx;
  color: #9b9b9b;
  margin-top: 29rpx;
  margin-right: 32rpx;
}

.list-detail {
  width: 100%;
  height: 48rpx;
  line-height: 48rpx;
  font-family: PingFangSC-Medium;
  font-size: 22rpx;
  color: #9b9b9b;
  margin-top: 10rpx;
  margin-bottom: 15rpx;
  float: left;
}

.list-detail text {
  float: left;
}

.list-detail image:nth-child(1) {
  margin-top: 14rpx;
}

.list-detail image:nth-child(3) {
  margin-top: 15rpx;
}

.list-detail image:nth-child(5) {
  margin-top: 16rpx;
}

.list-play {
  width: 16rpx;
  height: 20rpx;
  float: left;
  margin-right: 8rpx;
}

.list-time-icon {
  width: 18rpx;
  height: 18rpx;
  float: left;
  margin-left: 20rpx;
  margin-right: 8rpx;
}

.list-new-icon {
  width: 18rpx;
  height: 16rpx;
  float: left;
  margin-left: 20rpx;
  margin-right: 8rpx;
}

.is-free {
  background: #5aadff;
  border-radius: 8rpx;
  padding: 0 20rpx;
  color: #fff;
  float: right;
  margin-right: 32rpx;
  text-align: center;
}

.course:last-child .list-right {
  border: 0;
}
</style>
<template>
  <view catchtap="navTo" class="course" wx:for="{{courseListOption}}" data-set="{{index}}" wx:key="{{index}}">
      <view class="list-number">{{index+1}}</view>
      <view class="list-right">
          <view class="list-title">{{item.name}}</view>
          <view class="list-time">{{item.updateTime.time}}</view>
          <view class="list-detail">
              <image class="list-play" src="http://pc1u34h1m.bkt.clouddn.com/play--s-grey%402x.png"></image>
              <text>{{playCardinalityNumber+item.playNumber}}</text>
              <image src="http://pc1u34h1m.bkt.clouddn.com/time-s-grey%402x.png" class="list-time-icon" ></image>
              <text>{{timeArr[index]}}</text>
              <image src="http://pc1u34h1m.bkt.clouddn.com/comments-s-grey%402x.png" class="list-new-icon" ></image>
              <text>{{allCommentNumber}}</text>
              <view wx:if="{{item.freeTrailOrNot=='YES'}}" class="is-free">{{language=='ZH'?'免费试看':'Preview'}}</view>
          </view>
      </view>
  </view>
</template>
<script>
import wepy from 'wepy';
import { getTime } from '../utils/filter';

export default class courseList extends wepy.component {
  props = {};

  data = {
    left: 0,
    courseListOption: [],
    time: '',
    language: 'ZH',
    courseId: 1,
    isBuy: false,
    isDetail: false,
    playCardinalityNumber: 0,
    allCommentNumber: 0,
    timeArr: []
  };
  events = {
    getCourseList(data) {
      for (var i = 0; i < data.length; i++) {
        this.timeArr.push(this.getPros(data[i].resourceDuration));
      }
      this.courseListOption = data;
      for (var i = 0; i < this.courseListOption.length; i++) {
        this.courseId = this.courseListOption[i].onlineCourseId;

        if (this.language == 'ZH') {
          this.courseListOption[i].updateTime = {
            time: getTime.getZHymd(this.courseListOption[i].updateTime),
            detailTime: getTime.getZHhm(this.courseListOption[i].updateTime)
          };
        } else {
          this.courseListOption[i].updateTime = {
            time: getTime.getENymd(this.courseListOption[i].updateTime),
            detailTime: getTime.getZHhm(this.courseListOption[i].updateTime)
          };
        }
      }
    },
    CL(status) {
      this.language = wx.getStorageSync('language');
    },
    isBuy() {
      this.isBuy = true;
    },
    isDetail() {
      this.isDetail = true;
    },
    linkData(allCommentNumber, playCardinalityNumber) {
      this.allCommentNumber = allCommentNumber;
      this.playCardinalityNumber = parseInt(
        playCardinalityNumber / this.courseListOption.length
      );
    },
    playNumberAdd(index) {
      this.courseListOption[index].playNumber++;
    }
  };

  watch = {};

  methods = {
    navTo(e) {
      if (
        wx.getStorageSync('importantInfo') == '' ||
        wx.getStorageSync('importantInfo') == undefined
      ) {
        wx.navigateTo({
          url: '/pages/login'
        });
        return;
      }
      if (
        this.courseListOption[e.currentTarget.dataset.set].freeTrailOrNot ==
          'NO' &&
        this.isBuy == false
      ) {
        wx.showToast({
          title:
            this.language == 'ZH'
              ? '您未购买此课程'
              : 'You have not bought this course',
          icon: 'none',
          duration: 1000,
          mask: true
        });
      }
      if (
        this.courseListOption[e.currentTarget.dataset.set].freeTrailOrNot ==
          'YES' ||
        this.isBuy == true
      ) {
        if (this.isDetail == true) {
          wx.navigateTo({
            url:
              'courseVideo?courseId=' +
              this.courseId +
              '&listId=' +
              e.currentTarget.dataset.set
          });
        } else {
          this.$emit('newData', e.currentTarget.dataset.set);
        }
      }
    }
  };
  getPros(time) {
    var hours = parseInt(time / 1000 / 60 / 60);
    var minute = parseInt(time / 1000 / 60) - hours * 60;
    var second = parseInt(time / 1000) - minute * 60 - hours * 60 * 60;
    if (hours > 0) {
      if (hours <= 9) {
        hours = '0' + hours;
      }
      if (minute <= 9) {
        minute = '0' + minute;
      }
      if (second <= 9) {
        second = '0' + second;
      }
      return hours + ':' + minute + ':' + second;
    } else if (minute > 0) {
      if (minute <= 9) {
        minute = '0' + minute;
      }
      if (second <= 9) {
        second = '0' + second;
      }
      return minute + ':' + second;
    } else {
      if (second <= 9) {
        second = '0' + second;
      }
      return '00:' + second;
    }
  }
  onLoad() {}
}
</script>