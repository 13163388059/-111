<style lang="less">
.swiper {
  width: 100%;
  height: 376rpx;
}

.slide-image {
  width: 100%;
  height: 100%;
}

.recommend {
  width: 718rpx;
  border-bottom: 26rpx solid #e8e8e8;
  padding: 0 0 0 32rpx;
}

.recommend:last-child {
  border: 0;
}

.nav-header {
  width: 100%;
  height: 40rpx;
  margin-top: 34rpx;
}

.red-line {
  width: 6rpx;
  height: 32rpx;
  background: #a90202;
  float: left;
  margin-top: 4rpx;
}

.get-more {
  line-height: 40rpx;
  float: right;
  color: #9b9b9b;
  font-size: 24rpx;
  margin-right: 32rpx;
}

.get-more image {
  float: right;
  width: 10rpx;
  height: 20rpx;
  margin: 11rpx 0 0 4rpx;
}

.nav-tip {
  line-height: 40rpx;
  font-size: 28rpx;
  float: left;
  margin-left: 12rpx;
  font-family: PingFangSC-Medium;
}

.screen {
  width: 100%;
  height: 364rpx;
  float: left;
}

.screen-box {
  position: relative;
  width: 328rpx;
  height: 148rpx;
  margin: 32rpx 0 0 32rpx;
  float: left;
}

.screen-box image {
  width: 100%;
  height: 100%;
  border-radius: 4rpx;
}
.screen-box view {
  width: 100%;
  height: 100%;
  line-height: 148rpx;
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
  font-size: 36rpx;
  color: #ffffff;
  position: absolute;
  top: 0;
  border-radius: 4rpx;
}
</style>
<template>
  <view class="container">
    <!-- <navigation :navigationOption="navigationOption"></navigation>
    <tabBar></tabBar> -->
    <swiper class="swiper" autoplay="true" interval="3000" circular="true" indicator-dots="true" indicator-color="rgba(0,0,0,0.4)" indicator-active-color="#fff" circular="true" duration="300">
      <block wx:for="{{imgUrls}}" wx:key="{{index}}">
        <swiper-item>
          <image binderror="imgsErr" catchtap="linkTo" data-set="{{item.link}}" mode="aspectFill" src="{{item.image}}" class="slide-image" width="355" height="150"/>
        </swiper-item>
      </block>
    </swiper>
    <view class="screen">
      <view class="screen-box"><image mode="aspectFill" src="http://pc1u34h1m.bkt.clouddn.com/index-nav1.jpg"></image><view catchtap="toCourse">{{language=='ZH'?'课程':'Course'}}</view></view>
      <view class="screen-box"><image mode="aspectFill" src="http://pc1u34h1m.bkt.clouddn.com/index-nav2.jpg"></image><view catchtap="toActivity">{{language=='ZH'?'活动':'Activity'}}</view></view>
      <view class="screen-box"><image mode="aspectFill" src="http://pc1u34h1m.bkt.clouddn.com/index-nav3.jpg"></image><view catchtap="toInformation">{{language=='ZH'?'访谈':'Interview'}}</view></view>
      <view class="screen-box"><image mode="aspectFill" src="http://pc1u34h1m.bkt.clouddn.com/index-nav4.jpg"></image><view catchtap="toInformation">{{language=='ZH'?'新闻':'News'}}</view></view>
    </view>
    <view class="recommend" wx:if="{{isCourses}}">
      <view class="nav-header">
        <view class="red-line"></view>
        <view class="nav-tip">{{language=='ZH'?'推荐课程':'Recommended Courses'}}</view>
        <view catchtap="toCourse" class="get-more">{{language=='ZH'?'更多':'More'}}<image src="http://pc1u34h1m.bkt.clouddn.com/right%402x.png"/></view>
      </view>
      <indexCourseItem :courseItemOption="courseItemOption"></indexCourseItem>
    </view>
    <view class="recommend" wx:if="{{isActivitys}}">
      <view class="nav-header">
        <view class="red-line"></view>
        <view class="nav-tip">{{language=='ZH'?'热门活动':'Top Activities'}}</view>
        <view catchtap="toActivity" class="get-more">{{language=='ZH'?'更多':'More'}}<image src="http://pc1u34h1m.bkt.clouddn.com/right%402x.png"/></view>
      </view>
      <indexActivity ></indexActivity>
    </view>
    <view class="recommend" wx:if="{{isInformations}}">
      <view class="nav-header">
        <view class="red-line"></view>
        <view class="nav-tip">{{language=='ZH'?'精选访谈':'Selection Interviews'}}</view>
        <view catchtap="toInformation" data-set="{{language=='ZH'?'访谈':'Interview'}}" class="get-more">{{language=='ZH'?'更多':'More'}}<image src="http://pc1u34h1m.bkt.clouddn.com/right%402x.png"/></view>
      </view>
      <indexInformationItem ></indexInformationItem>
    </view>
    <view class="recommend" wx:if="{{isXw}}">
      <view class="nav-header">
        <view class="red-line"></view>
        <view class="nav-tip">{{language=='ZH'?'精选新闻':'Top News'}}</view>
        <view catchtap="toInformation" data-set="{{language=='ZH'?'新闻':'news'}}" class="get-more">{{language=='ZH'?'更多':'More'}}<image src="http://pc1u34h1m.bkt.clouddn.com/right%402x.png"/></view>
      </view>
      <xinWen></xinWen>
    </view>
  </view>
</template>

<script>
import wepy from 'wepy';
import navigation from '../components/navigation';
import tabBar from '../components/tabBar';
import indexCourseItem from '../components/courseItem';
import indexActivity from '../components/activityItem';
import indexInformationItem from '../components/informationItem';
import { swiper, recommended } from '../api/index';
import xinWen from '../components/xinWen';
export default class Index extends wepy.page {
  config = {};
  components = {
    indexCourseItem: indexCourseItem,
    indexActivity: indexActivity,
    indexInformationItem: indexInformationItem,
    xinWen: xinWen
  };

  data = {
    imgUrls: [],
    language: 'ZH',
    isXw: true,
    isInformations: true,
    isActivitys: true,
    isCourses: true
  };

  computed = {};

  methods = {
    toCourse() {
      wx.switchTab({
        url: 'course'
      });
    },
    toActivity() {
      wx.switchTab({
        url: 'activity'
      });
    },
    toInformation(e) {
      wx.setStorageSync('informationKey', e.currentTarget.dataset.set);
      wx.switchTab({
        url: 'information'
      });
    },
    imgsErr(e) {
      this.imgUrls[e.currentTarget.dataset.set].image =
        'http://pc1u34h1m.bkt.clouddn.com/defult.png';
    },
    linkTo(e) {
      var linkArr = e.currentTarget.dataset.set.slice(17).split('/');
      if (linkArr[0] == 'activity') {
        wx.navigateTo({
          url: '/pages/activity/activityDetail?id=' + linkArr[1]
        });
      } else if (linkArr[0] == 'course') {
        wx.navigateTo({
          url: '/pages/course/courseVideoDetail?id=' + linkArr[1]
        });
      } else if (linkArr[0] == 'show') {
        wx.navigateTo({
          url: '/pages/information/informationDetail?id=' + linkArr[1]
        });
      }
    }
  };

  events = {};
  async init() {
    this.language = wx.getStorageSync('language');
    if (
      wx.getStorageSync('language') !== 'ZH' &&
      wx.getStorageSync('language') !== 'EN'
    ) {
      wx.redirectTo({
        url: 'chooseLanguage'
      });
    }
    if (wx.getStorageSync('language') == 'EN') {
      wx.setNavigationBarTitle({
        title: 'Or Rouge'
      });
      wx.setTabBarItem({
        index: 0,
        text: 'Home'
      });
      wx.setTabBarItem({
        index: 1,
        text: 'Course'
      });
      wx.setTabBarItem({
        index: 2,
        text: 'Activity'
      });
      wx.setTabBarItem({
        index: 3,
        text: 'Infomation'
      });
      wx.setTabBarItem({
        index: 4,
        text: 'Me'
      });
    } else {
      wx.setNavigationBarTitle({
        title: '中欧商道'
      });
      wx.setTabBarItem({
        index: 0,
        text: '首页'
      });
      wx.setTabBarItem({
        index: 1,
        text: '课程'
      });
      wx.setTabBarItem({
        index: 2,
        text: '活动'
      });
      wx.setTabBarItem({
        index: 3,
        text: '资讯'
      });
      wx.setTabBarItem({
        index: 4,
        text: '我的'
      });
    }
  }
  async getSwiper() {
    await swiper(this.language).then(res => {
      this.imgUrls = res.items;
    });
    this.$apply();
  }
  async getRecommended() {
    await recommended(this.language).then(res => {
      var courses = [];
      var activitys = [];
      var informations = [];
      var xw = [];
      if (res.online_course !== undefined) {
        for (var i = 0; i < res.online_course.child.length; i++) {
          if (res.online_course.child[i].extInfo) {
            courses.push(res.online_course.child[i].extInfo);
          }
        }
        for (var i = 0; i < courses.length; i++) {
          try {
            courses[i].introduction = JSON.parse(courses[i].introduction);
          } catch (err) {
            courses[i].introduction = [];
          }
        }
      }

      if (res.activity !== undefined) {
        for (var i = 0; i < res.activity.child.length; i++) {
          if (res.activity.child[i].extInfo) {
            activitys.push(res.activity.child[i].extInfo);
          }
        }
      }
      if (res.talent_show !== undefined) {
        for (var i = 0; i < res.talent_show.zixun_child.length; i++) {
          if (res.talent_show.zixun_child[i].extInfo) {
            informations.push(res.talent_show.zixun_child[i].extInfo);
          }
        }
        for (var i = 0; i < res.talent_show.xinwen_child.length; i++) {
          if (res.talent_show.xinwen_child[i].extInfo) {
            xw.push(res.talent_show.xinwen_child[i].extInfo);
          }
        }
      }
      if (courses.length == 0) {
        this.isCourses = false;
      }
      if (activitys.length == 0) {
        this.isActivitys = false;
      }
      if (informations.length == 0) {
        this.isInformations = false;
      }
      if (xw.length == 0) {
        this.isXw = false;
      }
      this.$broadcast('putCourse', courses, false);
      this.$broadcast('putActivity', activitys, false);
      this.$broadcast('putInformation', informations, false);
      this.$broadcast('putInformationXw', xw, false);
      this.$apply();
    });
  }
  async onShow() {
    this.$broadcast('CL', false);
    await this.init();
    // wx.showLoading({
    //   title: this.language == 'ZH' ? '数据加载中' : 'Loading',
    //   mask: true
    // });
    await this.getSwiper();
    await this.getRecommended();
    this.$broadcast('isIndex');
    this.$apply();
    // wx.hideLoading();
    this.$apply();
  }
  async onLoad() {}
}
</script>
