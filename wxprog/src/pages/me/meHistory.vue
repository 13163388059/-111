
<style lang="less">
.history-nav {
  width: 100%;
  height: 88rpx;
  border-bottom: 2rpx solid #e5e3e3;
  display: flex;
}

.nav-box {
  flex: 1;
  height: 86rpx;
}

.nav-content {
  width: 84rpx;
  height: 100%;
  line-height: 86rpx;
  font-family: PingFangSC-Medium;
  font-size: 26rpx;
  color: #4a4a4a;
  text-align: center;
  margin: auto;
}

.is-sollect {
  border-bottom: 2px solid #a90202;
}

.courseItem {
  width: 718rpx;
  padding: 48rpx 0 40rpx 0;
  border-bottom: 2rpx solid #e5e3e3;
  position: relative;
  margin-left: 32rpx;
  float: left;
}

.courseItem:last-child {
  border: 0;
}

.courseItem image {
  width: 156rpx;
  height: 156rpx;
  border-radius: 8rpx;
  float: left;
}

.content-right {
  float: left;
  margin-left: 36rpx;
  height: 100%;
  width: 494rpx;
}

.content-title {
  font-size: 28rpx;
  line-height: 40rpx;
  height: 80rpx;
  overflow: hidden;
}

.content-name {
  font-size: 26rpx;
  line-height: 36rpx;
  height: 36rpx;
  overflow: hidden;
  margin: 6rpx 0 8rpx 0;
}

.content-detail {
  font-size: 24rpx;
  line-height: 34rpx;
  height: 34rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999999;
  margin-bottom: 4rpx;
}

.empty {
  width: 160rpx;
  height: 182rpx;
  margin: 194rpx 0 10rpx 296rpx;
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
</style>
<template>
  <view class="container">
    <view class="history-nav">
      <view data-set="{{1}}" catchtap="sollectNav" class="nav-box"><view class="nav-content {{isSollect==1?'is-sollect':''}}">{{language=='ZH'?'视频':'Video'}}</view></view>
      <view data-set="{{2}}" catchtap="sollectNav" class="nav-box"><view class="nav-content {{isSollect==2?'is-sollect':''}}">{{language=='ZH'?'音频':'Audio'}}</view></view>
    </view>
    <view>
        <view class="courseItem" wx:for="{{courseItemOption}}" wx:key="{{index}}" data-set="{{[item.extInfo.onlineCourseId,item.extInfo.onlineCourseResourceId]}}" catchtap="navTo">
            <image mode="aspectFill" binderror="imgErr" data-set="{{index}}" src="{{item.extInfo.cover}}"/>
            <view class="content-right">
                <view class="content-title">{{item.extInfo.name}}</view>
                <view class="content-name">{{item.extInfo.masterCourse.artistName}}</view>
                <view class="content-detail">
                    <label wx:for="{{item.extInfo.masterCourse.introduction}}" wx:key="{{index}}">
                        <text wx:if="{{item.type=='text'}}">{{item.content}}</text>
                    </label>
                </view>
            </view>
       </view>
    </view>
    <noMore wx:if="{{isSollect==1&&!noVideo}}"></noMore>
    <noMore wx:if="{{isSollect==2&&!noAudio}}"></noMore>
    <view wx:if="{{isSollect==1&&noVideo}}" class="empty-box">
        <image mode="aspectFill" src="http://pc1u34h1m.bkt.clouddn.com/play-history-empty.png" class="empty"></image>
        <view class="empty-tip">{{language=='ZH'?'暂时没有播放历史':'No play history'}}</view>
    </view>
    <view wx:if="{{isSollect==2&&noAudio}}" class="empty-box">
        <image mode="aspectFill" src="http://pc1u34h1m.bkt.clouddn.com/play-history-empty.png" class="empty"></image>
        <view class="empty-tip">{{language=='ZH'?'暂时没有播放历史':'No play history'}}</view>
    </view>
    
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import noMore from '../../components/noMore';
import { historyVideo, historyAudio } from '../../api/index.js';

export default class MeHistory extends wepy.page {
  config = {};
  components = {
    noMore: noMore
  };

  data = {
    isSollect: 1,
    courseItemOption: [],
    language: 'ZH',
    videos: [],
    audios: [],
    noVideo: false,
    noAudio: false,
    limit: 12,
    videoPage: 1,
    audioPage: 1,

    videoMore: true,
    audioMore: true,

    videoOffset: 0,
    audioOffset: 0
  };

  computed = {};

  methods = {
    sollectNav(e) {
      if (this.isSollect == e.currentTarget.dataset.set) {
        return;
      }
      this.isSollect = e.currentTarget.dataset.set;
      if (this.isSollect == 1) {
        this.courseItemOption = this.videos;
      } else {
        this.courseItemOption = this.audios;
      }
    },
    navTo(e) {
      wx.navigateTo({
        url:
          '/pages/course/courseVideo?courseId=' +
          e.currentTarget.dataset.set[0] +
          '&onlineCourseResourceId=' +
          e.currentTarget.dataset.set[1]
      });
    },
    imgErr(e) {
      this.courseItemOption[e.currentTarget.dataset.set].extInfo.cover =
        'http://pc1u34h1m.bkt.clouddn.com/defult.png';
    }
  };

  events = {};

  async getVideo() {
    if (this.videoMore == false) {
      return;
    }
    wx.showLoading({
      title: this.language == 'ZH' ? '数据加载中' : 'Loading',
      mask: true
    });
    await historyVideo(
      { limit: this.limit, page: this.videoPage, offset: this.videoOffset },
      this.language
    ).then(res => {
      var data = [];
      for (var i = 0; i < res.items.length; i++) {
        if (res.items[i].extInfo !== undefined) {
          data = data.concat(res.items[i]);
        }
      }
      res.items = data;
      for (var i = 0; i < res.items.length; i++) {
        try {
          res.items[i].extInfo.masterCourse.introduction = JSON.parse(
            res.items[i].extInfo.masterCourse.introduction
          );
        } catch (err) {
          res.items[i].extInfo.masterCourse.introduction = [];
        }
      }
      this.videos = this.videos.concat(res.items);
      this.videoOffset += res.items.length;
      if (res.items.length < this.limit) {
        this.videoMore = false;
      }
      if (this.videoPage == 1 && this.videos.length == 0) {
        this.noVideo = true;
      }
      this.videoPage++;
    });
    wx.hideLoading();
    this.$apply();
  }

  async getAudio() {
    if (this.audioMore == false) {
      return;
    }
    wx.showLoading({
      title: this.language == 'ZH' ? '数据加载中' : 'Loading',
      mask: true
    });
    await historyAudio(
      { limit: this.limit, page: this.audioPage, offset: this.audioOffset },
      this.language
    ).then(res => {
      var data = [];
      for (var i = 0; i < res.items.length; i++) {
        if (res.items[i].extInfo !== undefined) {
          data = data.concat(res.items[i]);
        }
      }
      res.items = data;
      for (var i = 0; i < res.items.length; i++) {
        try {
          res.items[i].extInfo.masterCourse.introduction = JSON.parse(
            res.items[i].extInfo.masterCourse.introduction
          );
        } catch (err) {
          res.items[i].extInfo.masterCourse.introduction = [];
        }
      }
      this.audios = this.audios.concat(res.items);
      this.audioOffset += res.items.length;
      if (res.items.length < this.limit) {
        this.audioMore = false;
      }
      if (this.audioPage == 1 && this.audios.length == 0) {
        this.noAudio = true;
      }
      this.audioPage++;
    });
    wx.hideLoading();
    this.$apply();
  }

  async onReachBottom() {
    if (this.isSollect == 1) {
      await this.getVideo();
    } else {
      await this.getAudio();
    }
  }
  async getData() {
    await this.getAudio();
    await this.getVideo();
    this.courseItemOption = this.videos;
    this.$apply();
  }
  async onShow() {}
  async onLoad() {
    this.language = wx.getStorageSync('language');
    if (this.language == 'ZH') {
      wx.setNavigationBarTitle({
        title: '播放历史'
      });
    } else {
      wx.setNavigationBarTitle({
        title: 'Play Histories'
      });
    }
    await this.getData();
  }
}
</script>