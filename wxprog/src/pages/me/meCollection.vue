
<style lang="less">
.collection-nav {
  width: 100%;
  height: 88rpx;
  border-bottom: 2rpx solid #e5e3e3;
  display: flex;
}

.nav-box {
  flex: 1;
  height: 86rpx;
  text-align: center;
  line-height: 86rpx;
}

.nav-content {
  height: 100%;
  font-family: PingFangSC-Medium;
  font-size: 26rpx;
  color: #4a4a4a;
  padding: 22rpx 20rpx;
}

.is-sollect {
  border-bottom: 2px solid #a90202;
}

.empty {
  width: 258rpx;
  height: 200rpx;
  margin: 151rpx 0 10rpx 270rpx;
  float: left;
}

.empty-box {
  width: 100%;
}

.empty-tip {
  width: 100%;
  line-height: 32rpx;
  font-size: 22rpx;
  color: #909aac;
  float: left;
  text-align: center;
}

.courseItem-box {
  padding-left: 32rpx;
  width: 718rpx;
}

.informationItem-box {
  width: 718rpx;
  padding-left: 32rpx;
}
</style>
<template>
  <view class="container">
    <view class="collection-nav">
      <view data-set="{{1}}" catchtap="sollectNav" class="nav-box"><text class="nav-content {{isSollect==1?'is-sollect':''}}">{{language=='ZH'?'课程':'Courses'}}</text></view>
      <view data-set="{{2}}" catchtap="sollectNav" class="nav-box"><text class="nav-content {{isSollect==2?'is-sollect':''}}">{{language=='ZH'?'活动':'Activities'}}</text></view>
      <view data-set="{{3}}" catchtap="sollectNav" class="nav-box"><text class="nav-content {{isSollect==3?'is-sollect':''}}">{{language=='ZH'?'资讯':'Informations'}}</text></view>
    </view>
    
    <view wx:if="{{isSollect==1}}" class="courseItem-box">
      <courseItem ></courseItem>
    </view>
    <activityContent wx:if="{{isSollect==2}}" ></activityContent>
    <view wx:if="{{isSollect==3}}" class="informationItem-box">
      <informationItem></informationItem>
    </view>
    <noMore wx:if="{{isSollect==1&&!noCourse}}"></noMore>
    <noMore wx:if="{{isSollect==2&&!noActivity}}"></noMore>
    <noMore wx:if="{{isSollect==3&&!noInformation}}"></noMore>
    <view wx:if="{{isSollect==1&&noCourse}}" class="empty-box">
        <image src="http://pc1u34h1m.bkt.clouddn.com/my-favorite-empty.png" class="empty"></image>
        <view class="empty-tip">{{language=='ZH'?'暂时没有收藏的课程':'No favorites'}}</view>
    </view>
    <view wx:if="{{isSollect==2&&noActivity}}" class="empty-box">
        <image src="http://pc1u34h1m.bkt.clouddn.com/my-favorite-empty.png" class="empty"></image>
        <view class="empty-tip">{{language=='ZH'?'暂时没有收藏的活动':'No favorites'}}</view>
    </view>
    <view wx:if="{{isSollect==3&&noInformation}}" class="empty-box">
        <image src="http://pc1u34h1m.bkt.clouddn.com/my-favorite-empty.png" class="empty"></image>
        <view class="empty-tip">{{language=='ZH'?'暂时没有收藏的资讯':'No favorites'}}</view>
    </view>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import activityContent from '../../components/activityContent';
import courseItem from '../../components/courseItem';
import noMore from '../../components/noMore';
import informationItem from '../../components/informationItem';
import { favoriteList } from '../../api/index.js';

export default class MeCollection extends wepy.page {
  config = {};
  components = {
    activityContent: activityContent,
    courseItem: courseItem,
    noMore: noMore,
    informationItem: informationItem
  };

  data = {
    isSollect: 1,
    activityContentOption: [],
    courseItemOption: [],
    informationItemOption: [],
    language: 'ZH',
    limit: 12,
    noCourse: false,
    noActivity: false,
    noInformation: false,
    showPage: 1,
    activityPage: 1,
    coursePage: 1,

    showOffset: 0,
    activityOffset: 0,
    courseOffset: 0,

    showMore: true,
    activityMore: true,
    courseMore: true
  };

  computed = {};

  methods = {
    sollectNav(e) {
      this.isSollect = e.currentTarget.dataset.set;
      //   this.$broadcast('changeState', this.isSollect);
    }
  };

  events = {};
  async getShow() {
    if (this.showMore == false) {
      return;
    }
    wx.showLoading({
      title: this.language == 'ZH' ? '数据加载中' : 'Loading',
      mask: true
    });
    await favoriteList(
      {
        limit: this.limit,
        page: this.showPage,
        offset: this.showOffset,
        relationType: 'show'
      },
      this.language
    ).then(res => {
      if (res.items.length < this.limit) {
        this.showMore = false;
      }
      if (this.showPage == 1 && res.items.length == 0) {
        this.noInformation = true;
      }
      this.showPage++;
      this.showOffset += res.items.length;
      for (var i = 0; i < res.items.length; i++) {
        try {
          res.items[i].introduction = JSON.parse(res.items[i].introduction);
        } catch (err) {
          res.items[i].introduction = [];
        }
        if (res.items[i].extInfo) {
          this.informationItemOption.push(res.items[i].extInfo);
        }
      }
      this.$broadcast('putInformation', this.informationItemOption, true);
    });
    wx.hideLoading();
    this.$apply();
  }

  async getActivity() {
    if (this.activityMore == false) {
      return;
    }
    wx.showLoading({
      title: this.language == 'ZH' ? '数据加载中' : 'Loading',
      mask: true
    });
    await favoriteList(
      {
        limit: this.limit,
        page: this.activityPage,
        offset: this.activityOffset,
        relationType: 'activity'
      },
      this.language
    ).then(res => {
      if (res.items.length < this.limit) {
        this.activityMore = false;
      }

      this.activityOffset += res.items.length;
      if (this.activityPage == 1 && res.items.length == 0) {
        this.noActivity = true;
      }
      this.activityPage++;
      for (var i = 0; i < res.items.length; i++) {
        try {
          res.items[i].introduction = JSON.parse(res.items[i].introduction);
        } catch (err) {
          res.items[i].introduction = [];
        }
        if (res.items[i].extInfo) {
          if (res.items[i].extInfo.priceRangeO) {
            res.items[i].extInfo.priceRange =
              res.items[i].extInfo.priceRangeO.minPrice ==
              res.items[i].extInfo.priceRangeO.maxPrice
                ? res.items[i].extInfo.priceRangeO.minPrice / 100 +
                  '-' +
                  res.items[i].extInfo.priceRangeO.maxPrice / 100
                : res.items[i].extInfo.priceRangeO.minPrice / 100;
          } else {
            res.items[i].extInfo.priceRange =
              this.language == 'ZH' ? '免费' : 'Free';
          }
          this.activityContentOption.push(res.items[i].extInfo);
        }
      }
      this.$broadcast('putActivity', this.activityContentOption, true);
    });
    wx.hideLoading();
    this.$apply();
  }

  async getCourse() {
    if (this.courseMore == false) {
      return;
    }
    wx.showLoading({
      title: this.language == 'ZH' ? '数据加载中' : 'Loading',
      mask: true
    });
    await favoriteList(
      {
        limit: this.limit,
        page: this.coursePage,
        offset: this.courseOffset,
        relationType: 'online'
      },
      this.language
    ).then(res => {
      if (res.items.length < this.limit) {
        this.courseMore = false;
      }
      this.courseOffset += res.items.length;
      if (this.coursePage == 1 && res.items.length == 0) {
        this.noCourse = true;
      }
      this.coursePage++;
      for (var i = 0; i < res.items.length; i++) {
        try {
          res.items[i].extInfo.introduction = JSON.parse(
            res.items[i].extInfo.introduction
          );
        } catch (err) {
          res.items[i].extInfo.introduction = [];
        }
        if (res.items[i].extInfo) {
          this.courseItemOption.push(res.items[i].extInfo);
        }
      }
      this.$broadcast('putCourse', this.courseItemOption, true);
    });
    wx.hideLoading();
    this.$apply();
  }
  async getData() {
    await this.getShow();
    await this.getActivity();
    await this.getCourse();
  }

  async onReachBottom() {
    if (this.isSollect == 1) {
      this.getCourse();
    } else if (this.isSollect == 2) {
      this.getActivity();
    } else if (this.isSollect == 3) {
      this.getShow();
    }
  }
  async onShow() {
    this.$broadcast('collection');
  }
  async onLoad() {
    this.language = wx.getStorageSync('language');
    if (this.language == 'ZH') {
      wx.setNavigationBarTitle({
        title: '我的收藏'
      });
    } else {
      wx.setNavigationBarTitle({
        title: 'My Favorites'
      });
    }
    this.$broadcast('CL', true);
    await this.getData();
  }
}
</script>