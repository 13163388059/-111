
<style lang="less">
.video-detail-header {
  width: 100%;
  background: #f7f8fa;
  position: relative;
  float: left;
}

.video-img {
  width: 244rpx;
  height: 244rpx;
  border-radius: 8rpx;
  margin-left: 254rpx;
  margin-top: 50rpx;
}

.collect {
  width: 190rpx;
  height: 88rpx;
  text-align: center;
  line-height: 34rpx;
  font-size: 24rpx;
  color: #4a4a4a;
  position: absolute;
  top: 2rpx;
  right: 26rpx;
}

.collect image {
  width: 52rpx;
  margin-left: 69rpx;
  height: 52rpx;
  float: left;
  margin-bottom: 2rpx;
}

.video-title {
  width: 100%;
  font-family: PingFangSC-Medium;
  font-size: 32rpx;
  color: #040404;
  line-height: 44rpx;
  text-align: center;
  margin: 26rpx 0 6rpx 0;
}

.video-content {
  width: 686rpx;
  font-family: PingFangSC-Medium;
  font-size: 24rpx;
  color: #9b9b9b;
  line-height: 34rpx;
  height: 34rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 32rpx;
  text-align: center;
}

.labels {
  padding: 20rpx 46rpx 8rpx 46rpx;
  text-align: center;
  float: left;
}

.labels-li {
  line-height: 24rpx;
  padding: 7rpx 20rpx;
  border: 2rpx solid #999999;
  border-radius: 100rpx;
  font-size: 24rpx;
  color: #757575;
  margin: 0 17rpx 16rpx 0;
}

.list-box {
  width: 686rpx;
  height: 98rpx;
  border-bottom: 2rpx solid #e5e3e3;
  line-height: 96rpx;
  font-size: 30rpx;
  padding: 0 32rpx;
  display: flex;
}

.detail-nav {
  flex: 1;
  height: 96rpx;
  float: left;
  text-align: center;
  // border-bottom: 2rpx solid #A90202;
}

.comment-nav {
  flex: 1;
  height: 96rpx;
  float: left;
  text-align: center;
}

.detail-nav text,
.comment-nav text {
  padding: 28rpx 20rpx;
}

.select-red {
  color: #a90202;
  border-bottom: 2rpx solid #a90202;
}

.detail-content {
  padding: 6rpx 32rpx 0rpx 32rpx;
  width: 686rpx;
  float: left;
}

.detail-title-content {
  width: 686rpx;
  line-height: 48rpx;
  font-size: 28rpx;
  color: #4a4a4a;
}

.content-text {
  width: 100%;
  line-height: 48rpx;
  font-size: 28rpx;
  color: #4a4a4a;
  margin-bottom: 100rpx;
  float: left;
}

.content-text label {
  margin: 18rpx 0;
  width: 100%;
  float: left;
}

.content-text label image {
  width: 100%;
}

.footer-pay {
  width: 100%;
  height: 94rpx;
  position: fixed;
  border-top: 2rpx solid #a90202;
  line-height: 94rpx;
  bottom: 0;
  font-size: 32rpx;
  z-index: 10;
}

.play-icon {
  width: 18rpx;
  height: 20rpx;
  float: left;
  margin-top: 14rpx;
}

.free-trial {
  width: 50%;
  background: #fff;
  float: left;
  color: #a90202;
}

.free-trial image {
  width: 48rpx;
  height: 48rpx;
  float: left;
  margin: 24rpx 20rpx 0 90rpx;
}

.to-pay {
  width: 50%;
  height: 100%;
  background: #a90202;
  color: #fff;
  text-align: center;
  float: left;
}

.no-free {
  width: 100%;
}

.course-list {
  float: left;
}

.sollect-content {
  text-align: center;
  width: 100%;
  float: left;
}

.c-lables {
  padding-left: 76rpx;
}

.pay-over {
  text-align: center;
  background: #9b9b9b;
  color: #fff;
  border: 0;
}

.lables-top {
  height: 64rpx;
  width: 100%;
  float: left;
}

.is-fixed {
  position: fixed;
  top: 0;
  background: #ffffff;
  z-index: 7;
}

.video-detail-header-fixed {
  padding-bottom: 100rpx;
}
</style>
<template>
  <view class="container">
    <scroll-view scroll-y="true" bindscroll="scroll" bindscrolltolower="scrolltolower" scroll-top="{{scrollTop}}" style="height: 100vh;" >
    <view class="video-detail-header {{isFixed?'video-detail-header-fixed':''}}">
        <image binderror="imgErr" mode="aspectFill" class="video-img" src="{{option.cover}}"></image>
        <view catchtap="sollect" class="collect">
          <image wx:if="{{isSollect==false}}" src="http://pc1u34h1m.bkt.clouddn.com/collection%402x.png"></image>
          <image wx:if="{{isSollect==true}}" src="http://pc1u34h1m.bkt.clouddn.com/collected%402x.png"></image>
          <view class="sollect-content">{{isSollect?language=='ZH'?'已收藏':'Add to favorites':language=='ZH'?'收藏':'Add to favorites'}}</view>
        </view>
        <view class="video-title">{{option.name}}</view>
        <view class="video-content"><text wx:for="{{option.introduction}}" wx:key="{{index}}">{{item.type=='text'?item.content:''}}</text></view>
        <view class="labels {{language=='ZH'?'c-lables':''}}">
          <view class="lables-top">
            <text class="labels-li">{{option.quantity}}{{language=='ZH'?'人已订阅':' subscribers'}}</text>
            <text class="labels-li"><image src="http://pc1u34h1m.bkt.clouddn.com/play-grey%402x.png" class="play-icon"></image>{{option.allResourceDuration}}{{language=='ZH'?'课时':'hours'}}</text>
            <text class="labels-li">{{time}}{{language=='ZH'?'更新':' update'}}</text>
          </view>
          <view class="lables-top">
          <text class="labels-li">{{option.favoriteNumber}}{{language=='ZH'?'人已收藏':' collected'}}</text>
          <text class="labels-li">{{allCommentNumber}}{{language=='ZH'?'条评论':' comments'}}</text>
          <text class="labels-li">{{option.playCardinalityNumber+option.playNumber}}{{language=='ZH'?'次播放':' times play'}}</text>
          </view>
        </view>
    </view>
     <view class="list-box {{isFixed?'is-fixed':''}}">
            <view catchtap="selectContent" data-set="{{false}}" class="comment-nav"><text class="{{!isRed?'select-red':''}}">{{language=='ZH'?'课时':'CHAPTERS'}}({{option.resourceResps.length}})</text></view>
            <view catchtap="selectContent" data-set="{{true}}" class="detail-nav"><text class="{{isRed?'select-red':''}}">{{language=='ZH'?'详情':'DETAILS'}}</text></view>
      </view>
      <view wx:if="{{isRed}}" style="min-height:{{scrollHeight}}rpx" class="detail-content">
          <titleLineTitle :titleLineOption.sync="titleLineTitle"></titleLineTitle>
          <view style="word-wrap:break-word" class="detail-title-content">{{option.artist.name}}：{{option.artist.introduction}}</view>
          <titleLineContent :titleLineOption.sync="titleLineContent"></titleLineContent>
          <view class="content-text">
            <label wx:for="{{option.introduction}}" wx:key="{{index}}">
                <view style="word-wrap:break-word" wx:if="{{item.type=='text'}}">{{item.content}}</view>
               <image binderror="imgsErr" data-set="{{index}}" wx:if="{{item.type=='img'}}" mode="aspectFill" src="{{item.content}}"></image>
              </label>
          </view>
      </view>
      <view wx:if="{{!isRed}}" style="min-height:{{scrollHeight}}rpx" class="course-list">
         <courseList></courseList>
      </view>
      <view wx:if="{{!isBuyAll}}" class="footer-pay">
        <view catchtap="toVideo" wx:if="{{isFree}}" class="free-trial"><image src="http://pc1u34h1m.bkt.clouddn.com/play-red%403x.png"></image><text>{{language=='ZH'?'免费试看':'Preview'}}</text></view>
        <view data-set="{{0}}" catchtap="navTo" class="to-pay {{isFree?'':'no-free'}}">{{language=='ZH'?'订阅':'Subscribe'}} |￥{{option.price/100}}</view>
      </view>
      <view wx:if="{{isBuyAll}}" class="footer-pay pay-over">{{language=='ZH'?'已订阅此课程':'You have bought this course!'}}</view>
    </scroll-view>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import titleLine from '../../components/titleLine';
import courseList from '../../components/courseList';
import {
  courseDetail,
  collection,
  cancelCollection,
  relationList
} from '../../api/index';
import { getTime } from '../../utils/filter';

export default class CourseVideoDetail extends wepy.page {
  config = {};
  components = {
    titleLineTitle: titleLine,
    titleLineContent: titleLine,
    courseList: courseList
  };

  data = {
    isSollect: false,
    isRed: false,
    titleLineTitle: '主讲人',
    titleLineContent: '内容简介',
    isFree: false,
    courseId: 0,
    option: {},
    time: '',
    language: 'ZH',
    fristFreeId: -1,
    isBuyAll: false,
    isFixed: false,
    scrollHeight: 0,
    allCommentNumber: 0,
    scrollTop: 0,
    isBottom: false
  };

  computed = {};

  methods = {
    async sollect() {
      if (
        wx.getStorageSync('importantInfo') == '' ||
        wx.getStorageSync('importantInfo') == undefined
      ) {
        wx.navigateTo({
          url: '/pages/login'
        });
        return;
      }
      if (this.isSollect == false) {
        collection(
          {
            relationId: this.courseId,
            relationType: 'online',
            status: 'ADD_FAVORITE',
            userId: wx.getStorageSync('importantInfo').userId
          },
          this.language
        ).then(res => {
          if (res.status == 'ADD_FAVORITE') {
            this.option.favoriteNumber++;
            this.isSollect = true;
            this.$apply();
          }
        });
      } else {
        cancelCollection(
          {
            relationId: this.courseId,
            relationType: 'online',
            status: 'CANCEL_FAVORITE',
            userId: wx.getStorageSync('importantInfo').userId
          },
          this.language
        ).then(res => {
          if (res == '') {
            this.option.favoriteNumber--;
            this.isSollect = false;
            this.$apply();
          }
        });
      }
    },
    selectContent(e) {
      var that = this;
      if (e.currentTarget.dataset.set == this.isRed) {
        return;
      }
      this.isRed = !this.isRed;
      if (this.isFixed == true) {
        if (this.isRed == true) {
          wx.getSystemInfo({
            success: function(res) {
              that.scrollTop = 570 / 750 * res.windowWidth + 0.1;
            }
          });
        } else {
          wx.getSystemInfo({
            success: function(res) {
              that.scrollTop = 570 / 750 * res.windowWidth;
            }
          });
        }
      }
    },
    navTo() {
      if (
        wx.getStorageSync('importantInfo') == '' ||
        wx.getStorageSync('importantInfo') == undefined
      ) {
        wx.navigateTo({
          url: '/pages/login'
        });
        return;
      }
      wx.navigateTo({
        url: 'videoPay?id=' + this.courseId
      });
    },
    toVideo() {
      if (
        wx.getStorageSync('importantInfo') == '' ||
        wx.getStorageSync('importantInfo') == undefined
      ) {
        wx.navigateTo({
          url: '/pages/login'
        });
        return;
      }
      wx.navigateTo({
        url:
          'courseVideo?courseId=' +
          this.courseId +
          '&listId=' +
          this.fristFreeId
      });
    },
    imgErr(e) {
      this.option.cover = 'http://pc1u34h1m.bkt.clouddn.com/defult.png';
    },
    imgsErr(e) {
      this.option.introduction[e.currentTarget.dataset.set].content =
        'http://pc1u34h1m.bkt.clouddn.com/defult.png';
    },
    scroll(e) {
      var system;

      if (e.detail.scrollTop >= this.scrollTop) {
        // wx.getSystemInfo({
        //   success: res => {
        //     system = res.system.slice(0, 3);
        //   }
        // });
        // if (system == 'iOS' && this.isBottom == true) {
        //   return;
        // }
        this.isFixed = true;
      } else {
        this.isFixed = false;
        this.isBottom = false;
      }
    },
    scrolltolower() {
      this.isBottom = true;
    }
  };

  events = {};

  async init() {
    var language = wx.getStorageSync('language');
    await courseDetail(this.courseId, language).then(res => {
      this.option = res;
      this.option.allResourceDuration = (
        this.option.allResourceDuration /
        1000 /
        60 /
        60
      ).toFixed(1);
      try {
        this.option.introduction = JSON.parse(this.option.introduction);
      } catch (err) {
        this.option.introduction = [];
      }
      wx.setNavigationBarTitle({
        title: this.option.name
      });
      if (this.option.buyOrNot == 'YES') {
        this.isBuyAll = true;
        this.$broadcast('isBuy');
      }
      for (var i = this.option.resourceResps.length - 1; i >= 0; i--) {
        if (this.option.resourceResps[i].freeTrailOrNot == 'YES') {
          this.isFree = true;
          this.fristFreeId = i;
        }
      }
      wx.setNavigationBarTitle({
        title: this.option.name
      });
      if (this.language == 'ZH') {
        this.time = getTime.getZHymd(this.option.lastUpdate);
      } else {
        this.time = getTime.getENymd(this.option.lastUpdate);
      }
      this.$broadcast('getCourseList', this.option.resourceResps);
      if (this.option.favoriteId > 0) {
        this.isSollect = true;
      } else {
        this.isSollect = false;
      }
    });
    await relationList(
      {
        relationType: 'course',
        relationId: this.courseId
      },
      this.language
    ).then(res => {
      this.allCommentNumber = res.total;
      this.$broadcast(
        'linkData',
        this.allCommentNumber,
        this.option.playCardinalityNumber
      );
    });
    this.$apply();
  }
  getObj() {
    this.language = wx.getStorageSync('language');
    if (this.language == 'ZH') {
      this.titleLineTitle = '主讲人';
      this.titleLineContent = '内容简介';
    } else {
      this.titleLineTitle = 'Keynote speaker';
      this.titleLineContent = 'Requirements';
    }
  }
  async onShow() {
    wx.showLoading({
      title: this.language == 'ZH' ? '数据加载中' : 'Loading',
      mask: true
    });
    await this.init();
    wx.hideLoading();
  }
  async onLoad(e) {
    var that = this;
    this.courseId = e.id;
    this.getObj();
    this.$broadcast('CL', true);
    this.$broadcast('isDetail');
    wx.getSystemInfo({
      success: function(res) {
        that.scrollHeight = res.windowHeight / res.windowWidth * 750 - 670;
        that.scrollTop = 570 / 750 * res.windowWidth;
      }
    });
  }
}
</script>