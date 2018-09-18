
<style lang="less">
page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.video {
  width: 100%;
  height: 500rpx;
}

.video-title {
  width: 600rpx;
  height: 48rpx;
  margin-left: 32rpx;
  margin-top: 20rpx;
  font-family: PingFangSC-Medium;
  font-size: 32rpx;
  color: #ffffff;
  float: left;
  left: 0;
}

.video-report {
  line-height: 48rpx;
  float: right;
  margin-right: 32rpx;
  margin-top: 20rpx;
  font-family: PingFangSC-Medium;
  font-size: 24rpx;
  color: #9b9b9b;
  right: 0;
}

.video-play {
  width: 130rpx;
  height: 130rpx;
  margin: auto;
  margin-top: 185rpx;
}

.list-box {
  width: 686rpx;
  height: 98rpx;
  border-bottom: 2rpx solid #e5e3e3;
  line-height: 98rpx;
  font-size: 30rpx;
  padding: 0 32rpx;
  display: flex;
  background: #ffffff;
  position: absolute;
  top: 684rpx;
  z-index: 9;
}

.list-box-video {
  width: 686rpx;
  height: 98rpx;
  border-bottom: 2rpx solid #e5e3e3;
  line-height: 98rpx;
  font-size: 30rpx;
  padding: 0 32rpx;
  display: flex;
  background: #ffffff;
  position: absolute;
  top: 697rpx;
  z-index: 9;
}

.detail-nav,
.news-nav {
  height: 96rpx;
  float: left;
  text-align: center;
  flex: 1;
  // border-bottom: 2rpx solid #A90202;
  border-bottom: 4rpx solid transparent;
}

.comment-nav {
  flex: 1;
  height: 96rpx;
  float: left;
  text-align: center;
  border-bottom: 4rpx solid transparent;
}

.select-red {
  color: #a90202;
  border-bottom: 2px solid #a90202;
}

.detail-nav text,
.comment-nav text,
.news-nav text {
  padding: 28rpx 20rpx;
  height: 96rpx;
}

.paly-number {
  width: 100%;
  height: 42rpx;
  line-height: 42rpx;
  font-family: PingFangSC-Medium;
  font-size: 30rpx;
  color: #9b9b9b;
  margin-top: 31rpx;
}

.detail-box {
  width: 686rpx;
  padding: 0 32rpx;
}

.detail-title-content {
  width: 100%;
  line-height: 48rpx;
  font-size: 28rpx;
  color: #4a4a4a;
}

.content-text {
  width: 100%;
  line-height: 48rpx;
  font-size: 28rpx;
  color: #4a4a4a;
  margin-bottom: 60rpx;
  display: block;
}

.content-text label {
  margin: 18rpx 0;
  width: 100%;
  float: left;
}

.content-text label image {
  width: 100%;
}

.content-frist {
  margin-top: -10rpx;
}

.course-list {
  margin-bottom: 28rpx;
}

.news-box {
  width: 718rpx;
  padding: 32rpx 0 0rpx 32rpx;
  float: left;
}

.news-top {
  width: 100%;
  height: 42rpx;
  line-height: 42rpx;
  font-family: PingFangSC-Medium;
  font-size: 32rpx;
  color: #4a4a4a;
}

.write-comment {
  float: right;
  color: #5aadff;
  padding-right: 32rpx;
}

.write-comment image {
  width: 52rpx;
  height: 52rpx;
  margin-top: -5rpx;
  margin-right: 8rpx;
  float: left;
}

.new-content {
  float: left;
  width: 100%;
}

.fixed-comment {
  width: 100%;
  height: 118rpx;
  position: fixed;
  bottom: 0;
  border-top: 2rpx solid #e5e3e3;
  background: #fff;
}

.fixed-comment-box {
  width: 686rpx;
  height: 76rpx;
  margin: 22rpx 0 0 32rpx;
  border-radius: 200rpx;
  background: #eff1f4;
  line-height: 76rpx;
  font-family: PingFangSC-Medium;
  font-size: 30rpx;
  color: #9b9b9b;
}

.put-comment {
  width: 52rpx;
  height: 52rpx;
  float: left;
  margin-left: 30rpx;
  margin-top: 12rpx;
  margin-right: 8rpx;
}

.my-audio {
  width: 100%;
  height: 0;
}

.audio-img {
  width: 280rpx;
  height: 280rpx;
  margin-left: 236rpx;
  border-radius: 10rpx;
  margin-top: 62rpx;
}

.audio-title {
  line-height: 48rpx;
  width: 100%;
  font-family: PingFangSC-Medium;
  font-size: 36rpx;
  color: #4a4a4a;
  text-align: center;
  margin-top: 36rpx;
}

.progress {
  width: 634rpx;
  padding: 8rpx 0;
  margin: auto;
  margin-top: 10rpx;
}
.progress-time {
  width: 634rpx;
  margin: auto;
  line-height: 28rpx;
  color: #a90202;
  font-size: 20rpx;
  position: absolute;
  top: 27rpx;
  left: 56rpx;
}

.all-time {
  float: right;
}

.red-line {
  width: 80rpx;
  height: 80rpx;
  position: absolute;
  top: -21rpx;
  left: -20rpx;
}

.center-line {
  width: 12rpx;
  height: 12rpx;
  margin: 34rpx;
  background: #a90202;
  border-radius: 50%;
}
.play-contrls {
  width: 100%;
  padding-bottom: 22rpx;
  float: left;
}

.play-left {
  width: 52rpx;
  height: 32rpx;
  float: left;
  margin: 14rpx 0rpx 0 148rpx;
  padding: 50rpx;
}

.play {
  width: 152rpx;
  height: 152rpx;
  float: left;
}

.play-right {
  width: 52rpx;
  height: 32rpx;
  float: left;
  margin: 14rpx 0 0 0rpx;
  padding: 50rpx;
}

.input {
  position: fixed;
  bottom: 0;
}

.isbig {
  margin-top: 310rpx;
}

.audio-box {
  width: 100%;
  position: relative;
  top: 0;
  // transition: all 0.2s ease 0;
}

.video-box {
  width: 100%;
  height: 500rpx;
  position: relative;
  top: 0;
}

.progre {
  width: 100%;
  height: 80rpx;
  position: relative;
  float: left;
}

.video cover-view,
.video cover-image {
  position: absolute;
  z-index: 9;
}

.video .video-play {
  position: static;
}

.contral-box {
  position: absolute;
  width: 100%;
  top: 0;
  float: left;
}

.contrel-model {
  width: 100%;
  position: absolute;
  top: 436rpx;
  border-bottom: 6rpx solid #f2f2f2;
  background: #ffffff;
}

.isVideo {
  top: 500rpx;
  // transition: all 0.2s ease 0;
}

.is-top {
  top: -360rpx;
}

.is-top-nav {
  top: 324rpx;
}

.scroll-box {
  margin-top: 100rpx;
}

.box1,
.box2 {
  position: relative;
  width: 100%;
}

.video-top {
  margin-top: 745rpx;
}

.audio-detail-box {
  float: left;
}

.isfixed {
  position: fixed;
  top: 260rpx;
  background: #fff;
}

.isfixed-model {
  position: fixed;
  top: 0;
  z-index: 6;
  height: 360rpx;
  width: 100%;
  background: #fff;
}

.no-more {
  width: 686rpx;
  height: 32rpx;
  padding: 36rpx 32rpx 48rpx 32rpx;
  float: left;
}

.no-more text {
  width: 100%;
  height: 2rpx;
  float: left;
  background: #e5e3e3;
  margin-top: 15rpx;
}

.no-more-content {
  font-size: 22rpx;
  color: #9b9b9b;
  width: 220rpx;
  line-height: 32rpx;
  position: absolute;
  background: #ffffff;
  top: 35rpx;
  left: 275rpx;
  text-align: center;
}

.video-detail-header-fixed {
  padding-bottom: 100rpx;
}

.isfixed-contrel-model {
  top: 0;
}

.isfixed-list-box-model {
  top: 260rpx;
}

.is-ios {
  margin-top: 181rpx;
}
</style>
<template>
  <view class="container">
       <view class="box1" wx:if="{{item.resourceType=='VIDEO'}}">
        <view class="video-box"  >
          <image mode="aspectFill" binderror="imgErr" wx:if="{{!isShowVideo}}" src="{{item.cover}}" class="video"></image>
          <video catchtap="isOut" wx:if="{{isShowVideo}}" id="myVideo" src="{{item.link}}" bindplay="playVideo" bindpause="pauseVideo" poster="{{item.cover}}" class="video" page-gesture="{{true}}" bindfullscreenchange="isFull" bindpause="pause" direction="90" controls="{{true}}" >
            <cover-view class="video-title">{{item.name}}</cover-view>
            <cover-view class="video-report" data-set="{{[item.onlineCourseResourceId,item.name]}}" catchtap="reportV">{{language=='ZH'?isReport==false?'举报':'已举报':isReport==true?'Report':'Reported'}}</cover-view>
            <cover-image catchtap="play" wx:if="{{isPlay===false}}" class="video-play {{isBig?'isbig':''}} {{isIos?'is-ios':''}}" src="http://pc1u34h1m.bkt.clouddn.com/video-play%403x.png"></cover-image>
            <cover-image catchtap="pause" wx:if="{{isOut===true}}" class="video-play {{isBig?'isbig':''}}" src="http://pc1u34h1m.bkt.clouddn.com/video-stop%402x.png"></cover-image>
          </video>
        </view>
        <view class="list-box {{resourceType=='video'?'isVideo':''}} {{isTop?'':'is-top-nav'}}">
                <view catchtap="selectContent" data-set="comment" class="comment-nav"><text class="{{isRed=='comment'?'select-red':''}}">{{language=='ZH'?'课时':'Chapters'}}({{option.resourceResps.length}})</text></view>
                <view catchtap="selectContent" data-set="detail" class="detail-nav"><text class="{{isRed=='detail'?'select-red':''}}">{{language=='ZH'?'详情':'Overview'}}</text></view>
                <view catchtap="selectContent" data-set="news" class="news-nav"><text class="{{isRed=='news'?'select-red':''}}">{{language=='ZH'?'讨论':'Discussion'}}</text></view>
        </view>
        <scroll-view scroll-y="true" scroll-top="1" wx:if="{{isRed=='detail'}}" upper-threshold="0"  bindscrolltoupper="scrollTop" bindscroll="scroll" style="height: {{scrollHeight+'rpx'}};" class="scroll-box">
          <view class="detail-box" >
              <view class="paly-number">{{option.playCardinalityNumber+option.playNumber}}{{language=='ZH'?'次播放':'times play'}}</view>
                <titleLineTitle class="content-frist" :titleLineOption.sync="titleLineTitle"></titleLineTitle>
                <text style="word-wrap:break-word" class="detail-title-content">{{option.artist.name}}：{{option.artist.introduction}}</text>
                <titleLineContent :titleLineOption.sync="titleLineContent"></titleLineContent>
                <view class="content-text">
                  <label wx:for="{{option.introduction}}" wx:key="{{index}}">
                    <view style="word-wrap:break-word" wx:if="{{item.type=='text'}}">{{item.content}}</view>
                    <image binderror="imgsErr" data-set="{{index}}" wx:if="{{item.type=='img'}}" mode="aspectFill" src="{{item.content}}"></image>
                  </label>
                  </view>
          </view>
          </scroll-view>
          <scroll-view scroll-y="true" scroll-top="1" wx:if="{{isRed=='comment'}}" upper-threshold="0"  bindscrolltoupper="scrollTop" bindscroll="scroll" style="height: {{scrollHeight+'rpx'}};" class="scroll-box" >
          <view class="course-list">
              <courseList :courseListOption="courses"></courseList> 
          </view>
          </scroll-view>
          <scroll-view scroll-top="1" scroll-y="true" wx:if="{{isRed=='news'}}" upper-threshold="0" bindscrolltoupper="scrollTop" bindscrolltolower="scrolltolower" bindscroll="scroll" style="height: {{scrollHeight+'rpx'}};" class="scroll-box" >
          <view  class="news-box {{isMore?'':'scroll-bottom'}}">
            <view class="news-top">{{language=='ZH'?'评论':'Comments'}}({{total}})<view class="write-comment" catchtap="openReplay"><image src="http://pc1u34h1m.bkt.clouddn.com/edit%402x.png"></image>{{language=='ZH'?'发表评论':'Add a comment'}}</view></view>
                <view class="news-content">
               <newsContent :newsContentOption.sync="newsOptionItems"></newsContent>
                </view> 
          </view>
          <view wx:if="{{!isMore&&isRed=='news'}}" class="no-more">
            <text></text>
            <view class="no-more-content">{{language=="ZH"?'没有更多评论了':'No more comments'}}</view>
          </view>
          <view wx:if="{{isRed=='news'&&isPut}}" class="fixed-comment">
              <view class="fixed-comment-box" catchtap="openReplay">
                  <image mode="aspectFill" class="put-comment" src="http://pc1u34h1m.bkt.clouddn.com/edit-grey.png"></image>{{language=='ZH'?'发表评论':'Comment'}}
              </view>
          </view>
          </scroll-view>
      </view>

      <!--视频音频分割线-->

      <scroll-view  wx:if="{{item.resourceType=='AUDIO'}}" scroll-y="true" bindscrolltoupper="scrollTop"  bindscrolltolower="scrolltolower" bindscroll="scroll" style="height: 100vh" class="box2" scroll-top="{{top}}" >
          <view class="audio-box {{isTop?'':'is-top'}}" >
            <audio id="myAudio" class="my-audio" src="{{item.link}}">
            </audio>
            <view class="contral-box">
              <view class="video-report" data-set="{{[item.onlineCourseResourceId,item.name]}}" catchtap="reportV">{{language=='ZH'?isReport==false?'举报':'已举报':isReport==true?'Report':'Reported'}}</view>
              <image mode="aspectFill" binderror="imgErr"  class="audio-img" src="{{item.cover}}"></image>
              <view class="audio-title">{{item.name}}</view>
            </view>
          </view>
          <view class="{{isFixed?'isfixed-model':''}}">
              <view class="contrel-model {{isFixed?'isfixed-contrel-model':''}}">
                    <view class="progre" catchtap="click" bindtouchstart="moveStart" bindtouchmove="moveIng" ><progress class="progress"  percent="{{playTime}}" stroke-width="2" activeColor="#A90202" backgroundColor="#E5E3E3" />
                      <view class="red-line" bindtouchstart="move" bindtouchend="moveEnd" style="left:{{left+'rpx'}}"><view class="center-line"></view></view>
                    </view>
                      <view class="progress-time">{{newTime}}<view class="all-time">{{endTime}}</view></view>
                      <view class="play-contrls">
                          <image class="play-left" catchtap="playLeft" src="http://pc1u34h1m.bkt.clouddn.com/rew%402x.png"></image>
                          <image wx:if="{{!isAudioPlay}}" class="play" catchtap="play" src="http://pc1u34h1m.bkt.clouddn.com/play-light%403x.png"></image>
                          <image wx:if="{{isAudioPlay}}" class="play" catchtap="pause" src="http://pc1u34h1m.bkt.clouddn.com/video-stop%402x.png"></image>
                          <image class="play-right" catchtap="playRight" src="http://pc1u34h1m.bkt.clouddn.com/for%402x.png"></image>
                      </view>
                </view>
              <view class="list-box-video {{resourceType=='video'?'isVideo':''}} {{isTop?'':'is-top-nav'}} {{isFixed?'isfixed-list-box-model':''}}">
                    <view catchtap="selectContent" data-set="comment" class="comment-nav"><text class="{{isRed=='comment'?'select-red':''}}">{{language=='ZH'?'课时':'Chapters'}}({{option.resourceResps.length}})</text></view>
                    <view catchtap="selectContent" data-set="detail" class="detail-nav"><text class="{{isRed=='detail'?'select-red':''}}">{{language=='ZH'?'详情':'Overview'}}</text></view>
                    <view catchtap="selectContent" data-set="news" class="news-nav"><text class="{{isRed=='news'?'select-red':''}}">{{language=='ZH'?'讨论':'Discussion'}}</text></view>
              </view>
          </view>
          <view wx:if="{{isRed=='detail'}}" class="detail-box video-top audio-detail-box" >
              <view class="paly-number">{{option.playCardinalityNumber+option.playNumber}}{{language=='ZH'?'次播放':'times play'}}</view>
                <titleLineTitle  class="content-frist" :titleLineOption.sync="titleLineTitle"></titleLineTitle>
                <text style="word-wrap:break-word" class="detail-title-content">{{option.artist.name}}：{{option.artist.introduction}}</text>
                <titleLineContent :titleLineOption.sync="titleLineContent"></titleLineContent>
                <view class="content-text">
                  <label wx:for="{{option.introduction}}" wx:key="{{index}}">
                      <view style="word-wrap:break-word" wx:if="{{item.type=='text'}}">{{item.content}}</view>
                    <image binderror="imgsErr" data-set="{{index}}" wx:if="{{item.type=='img'}}" mode="aspectFill" src="{{item.content}}"></image>
                  </label>
                  </view>
          </view>
          <view wx:if="{{isRed=='comment'}}" class="course-list video-top">
              <courseList :courseListOption="courses"></courseList> 
          </view>
          <view wx:if="{{isRed=='news'}}" style="min-height:{{minHeight}}rpx" class="news-box video-top {{newsOptionItems.length==0?'no-news':''}}">
            <view class="news-top">{{language=='ZH'?'评论':'Comments'}}({{total}})<view class="write-comment" catchtap="openReplay"><image src="http://pc1u34h1m.bkt.clouddn.com/edit%402x.png"></image>{{language=='ZH'?'发表评论':'Add a comment'}}</view></view>
                <view class="news-content">
                  <newsContent :newsContentOption.sync="newsOptionItems"></newsContent>
                </view> 
          </view>
          <view wx:if="{{!isMore&&isRed=='news'}}" class="no-more">
            <text></text>
            <view class="no-more-content">{{language=="ZH"?'没有更多评论了':'No more comments'}}</view>
          </view>
          <view wx:if="{{isRed=='news'&&isPut}}" class="fixed-comment">
              <view class="fixed-comment-box" catchtap="openReplay">
                  <image mode="aspectFill" class="put-comment" src="http://pc1u34h1m.bkt.clouddn.com/edit-grey.png"></image>{{language=='ZH'?'发表评论':'Comment'}}
              </view>
          </view>
       </scroll-view>
      <writeReplay :replayData.sync="replayData" wx:if="{{isReplay}}"></writeReplay>
      <report wx:if="{{isReportOpen}}"></report>
      <reportVideo wx:if="{{isReportOpenVideo}}"></reportVideo>
      <writeComment :commentData.sync="commentData" wx:if="{{isComment}}"></writeComment>
  </view>
  
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import titleLine from '../../components/titleLine';
import courseList from '../../components/courseList';
import newsContent from '../../components/newsContent';
import writeReplay from '../../components/writeReplay';
import writeComment from '../../components/writeComment';
import report from '../../components/report';
import reportVideo from '../../components/reportVideo';
import { courseDetail, addVAs, relationList } from '../../api/index';
import { getTime } from '../../utils/filter';
import noMore from '../../components/noMore';
export default class courseVideo extends wepy.page {
  config = {};
  components = {
    titleLineTitle: titleLine,
    titleLineContent: titleLine,
    newsContent: newsContent,
    courseList: courseList,
    writeReplay: writeReplay,
    report: report,
    writeComment: writeComment,
    reportVideo: reportVideo,
    noMore: noMore
  };

  data = {
    isPlay: false,
    isAudioPlay: false,
    isRed: 'comment',
    isReplay: false,
    isComment: false,
    isReport: false,
    isReportOpen: false,
    isReportOpenVideo: false,
    isReportOk: false,
    isOut: false,
    isBig: false,
    titleLineTitle: '主讲人',
    titleLineContent: '内容简介',
    courses: [],
    language: 'ZH',
    courseId: 40,
    option: [],
    item: [],
    startTime: 0,
    endTime: 0,
    getNewTime: false,
    newTime: '00:00',
    allTime: 0,
    playTime: 0,
    left: 24,
    move: false,
    start: 0,
    end: 0,
    clickStart: 31,
    clickEnd: 31,
    isPut: true,
    index: 0,
    VAid: 0,
    resourceType: '',
    isShowVideo: true,
    scrollHeight: '600',
    onlineCourseResourceId: '',
    isTop: true,
    fristScroll: 1,
    isClick: true,
    replayData: {},
    commentData: {},
    isFixed: false,
    top: 0,
    total: 0,
    newsOptionItems: [],
    isMore: true,
    limit: 8,
    offset: 0,
    isBottom: false,
    isIos: false,
    minHeight: 0
  };

  computed = {};

  methods = {
    selectContent(e) {
      var notop = 0;
      wx.getSystemInfo({
        success: function(res) {
          notop = 450 / 750 * res.windowWidth;
        }
      });
      if (e.currentTarget.dataset.set == 'detail') {
        this.isRed = 'detail';
        if (this.isFixed == true) {
          this.top = notop;
        }
      } else if (e.currentTarget.dataset.set == 'comment') {
        this.isRed = 'comment';
        if (this.isFixed == true) {
          this.top = notop + 0.1;
        }
      } else {
        this.isRed = 'news';
        this.isPut = true;
        if (this.isFixed == true) {
          this.top = notop + 0.2;
        }
      }
    },
    openReplay() {
      this.isShowVideo = false;
      this.isReplay = true;
      this.replayData = {
        parent_id: '',
        relationType: 'course',
        production: this.option.name,
        relationId: this.courseId
      };
    },
    reportV(e) {
      if (this.isReportOk == false) {
        this.isShowVideo = false;
        this.isReportOpenVideo = true;
        this.$broadcast(
          'reportVideo',
          e.currentTarget.dataset.set[0],
          e.currentTarget.dataset.set[1]
        );
      }
    },
    isOut() {
      if (this.isPlay == true) {
        this.isOut = !this.isOut;
      }
    },
    async play() {
      if (this.isPlay == false) {
        await addVAs(
          {
            extId: this.VAid,
            playType:
              this.resourceType == 'video' ? 'course_video' : 'course_audio'
          },
          this.language
        ).then(res => {
          this.option.playNumber++;
          this.$broadcast('playNumberAdd', this.index);
        });
      }
      this.isPlay = true;
      this.isOut = false;
      this.videoContext.play();
      this.audioCtx.play();
      this.audioCtx.seek(this.startTime / 1000);
      this.isAudioPlay = true;
      this.getNewTime = true;
      this.setTime();
    },
    playVideo() {
      this.isPlay = true;
      this.isOut = false;
      this.videoContext.play();
      this.audioCtx.play();
      this.audioCtx.seek(this.startTime / 1000);
      this.isAudioPlay = true;
      this.getNewTime = true;
      this.setTime();
    },
    pauseVideo() {
      this.getNewTime = false;
      this.isPlay = false;
      this.isOut = false;
      this.audioCtx.pause();
      this.videoContext.pause();
      this.isAudioPlay = false;
    },
    pause() {
      this.getNewTime = false;
      this.isPlay = false;
      this.isOut = false;
      this.audioCtx.pause();
      this.videoContext.pause();
      this.isAudioPlay = false;
    },
    isFull(e) {
      this.isBig = !this.isBig;
    },
    moveStart(e) {
      if (this.move == true) {
        this.start = e.changedTouches[0].pageX;
      }
    },
    moveIng(e) {
      if (this.move == true) {
        this.end = e.changedTouches[0].pageX;
        this.startTime =
          this.startTime + (this.end - this.start) * 2 / 634 * this.allTime;
        if (this.startTime <= 0) {
          this.startTime = 0;
        } else if (this.startTime >= this.allTime) {
          this.startTime = this.allTime;
        }
        this.start = this.end;
        this.left = 634 * this.startTime / this.allTime + 24;
        this.playTime = 100 * this.startTime / this.allTime;
      }
    },
    move(e) {
      this.move = true;
      this.getNewTime = false;
      this.isPlay = false;
      this.isOut = false;
      this.audioCtx.pause();
      this.videoContext.pause();
      this.isAudioPlay = false;
    },
    moveEnd() {
      this.move = false;
      this.isPlay = true;
      this.isOut = false;
      this.videoContext.play();
      this.audioCtx.play();
      this.audioCtx.seek(this.startTime / 1000);
      this.isAudioPlay = true;
      this.getNewTime = true;
      this.setTime();
    },
    click(e) {
      this.clickEnd = e.changedTouches[0].pageX;
      this.startTime =
        (this.clickEnd - this.clickStart) * 2 / 634 * this.allTime;
      if (this.startTime <= 0) {
        this.startTime = 0;
      } else if (this.startTime >= this.allTime) {
        this.startTime = this.allTime;
      }
      this.left = 634 * this.startTime / this.allTime + 24;
      this.playTime = 100 * this.startTime / this.allTime;
      this.move = false;
      this.videoContext.play();
      this.audioCtx.play();
      this.audioCtx.seek(this.startTime / 1000);
      if (this.isAudioPlay == true) {
      } else {
        this.getNewTime = true;
        this.setTime();
      }
      this.isAudioPlay = true;
      this.isPlay = true;
      this.isOut = false;
    },
    scroll(e) {
      var that = this;
      if (e.detail.deltaY < 0) {
        this.isPut = false;
      } else {
        this.isPut = true;
      }
      if (this.resourceType == 'audio') {
        var system;

        if (e.detail.scrollTop >= this.scrollHeight) {
          this.isFixed = true;
        } else {
          this.isBottom = false;
          this.isFixed = false;
        }
      }
    },
    async scrolltolower() {
      this.isBottom = true;
      if (this.isMore == false || this.isRed !== 'news') return;
      await this.getRelation(true);
    },
    imgsErr(e) {
      this.option.introduction[e.currentTarget.dataset.set].content =
        'http://pc1u34h1m.bkt.clouddn.com/defult.png';
    },
    imgErr(e) {
      this.item.cover = 'http://pc1u34h1m.bkt.clouddn.com/defult.png';
    },
    playLeft() {
      if (this.index > 0) {
        this.index--;
        if (
          this.option.resourceResps[this.index].freeTrailOrNot == 'NO' &&
          this.option.buyOrNot == 'NO'
        ) {
          this.index++;
          return;
        }
        var that = this;
        this.item = this.option.resourceResps[this.index];
        this.VAid = this.item.onlineCourseResourceId;
        if (this.item.resourceType == 'VIDEO') {
          this.resourceType = 'video';
          wx.getSystemInfo({
            success: function(res) {
              that.scrollHeight =
                res.windowHeight * 750 / res.windowWidth - 600;
            }
          });
        } else if (this.item.resourceType == 'AUDIO') {
          this.resourceType = 'audio';
          wx.getSystemInfo({
            success: function(res) {
              that.scrollHeight = 448 * res.windowWidth / 750;
            }
          });
        }
        wx.setNavigationBarTitle({
          title: this.item.name
        });
        this.endTime = this.getPro(this.item.resourceDuration);
        this.allTime = this.item.resourceDuration;
        this.startTime = 0;
        this.left = 634 * this.startTime / this.allTime + 24;
        this.playTime = 100 * this.startTime / this.allTime;
        this.newTime = this.getPro(this.startTime);
        this.getNewTime = false;
        this.isPlay = false;
        this.isOut = false;
        this.audioCtx.pause();
        this.videoContext.pause();
        this.isAudioPlay = false;
      }
    },
    playRight() {
      if (this.index < this.option.resourceResps.length - 1) {
        this.index++;
        if (
          this.option.resourceResps[this.index].freeTrailOrNot == 'NO' &&
          this.option.buyOrNot == 'NO'
        ) {
          this.index--;
          return;
        }
        var that = this;
        this.item = this.option.resourceResps[this.index];
        this.VAid = this.item.onlineCourseResourceId;
        if (this.item.resourceType == 'VIDEO') {
          this.resourceType = 'video';
          wx.getSystemInfo({
            success: function(res) {
              that.scrollHeight =
                res.windowHeight * 750 / res.windowWidth - 600;
            }
          });
        } else if (this.item.resourceType == 'AUDIO') {
          this.resourceType = 'audio';
          wx.getSystemInfo({
            success: function(res) {
              that.scrollHeight = 448 * res.windowWidth / 750;
            }
          });
        }
        wx.setNavigationBarTitle({
          title: this.item.name
        });
        this.endTime = this.getPro(this.item.resourceDuration);
        this.allTime = this.item.resourceDuration;
        this.startTime = 0;
        this.left = 634 * this.startTime / this.allTime + 24;
        this.playTime = 100 * this.startTime / this.allTime;
        this.newTime = this.getPro(this.startTime);
        this.getNewTime = false;
        this.isPlay = false;
        this.isOut = false;
        this.audioCtx.pause();
        this.videoContext.pause();
        this.isAudioPlay = false;
      }
    }
  };

  events = {
    async closeReplay(status) {
      this.isShowVideo = true;
      this.isReplay = false;
      if (status == false) return;
      await this.getRelation(false);
    },
    closeReportVideo(isOk) {
      this.isShowVideo = true;
      this.isReportOpenVideo = false;
      if (isOk == true) {
        this.isReportOK = true;
      }
    },
    closeReport() {
      this.isShowVideo = true;
      this.isReportOpen = false;
    },
    async closeComment(status) {
      this.isComment = false;
      this.isShowVideo = true;
      if (status == false) return;
      await this.getRelation(false);
      this.$apply();
    },
    openComment(arr) {
      this.commentData = {
        nickName: arr[1],
        parent_id: arr[0],
        relationType: 'review',
        production: this.option.name,
        relationId: this.courseId
      };
      this.isShowVideo = false;
      this.isComment = true;
    },
    openCommentReplay(id, title) {
      this.$broadcast('reportReview', id, title);
      this.isReportOpen = true;
      this.isShowVideo = false;
    },
    newData(index) {
      var that = this;
      this.index = index;
      this.item = this.option.resourceResps[this.index];
      this.VAid = this.item.onlineCourseResourceId;
      if (this.item.resourceType == 'VIDEO') {
        this.resourceType = 'video';
        wx.getSystemInfo({
          success: function(res) {
            that.scrollHeight = res.windowHeight * 750 / res.windowWidth - 600;
          }
        });
      } else if (this.item.resourceType == 'AUDIO') {
        this.resourceType = 'audio';
        wx.getSystemInfo({
          success: function(res) {
            that.scrollHeight = 448 * res.windowWidth / 750;
          }
        });
      }
      wx.setNavigationBarTitle({
        title: this.item.name
      });
      this.endTime = this.getPro(this.item.resourceDuration);
      this.allTime = this.item.resourceDuration;
      this.startTime = 0;
      this.left = 634 * this.startTime / this.allTime + 24;
      this.playTime = 100 * this.startTime / this.allTime;
      this.newTime = this.getPro(this.startTime);
      this.getNewTime = false;
      this.isPlay = false;
      this.isOut = false;
      this.audioCtx.pause();
      this.videoContext.pause();
      this.isAudioPlay = false;
    }
  };
  setTime() {
    setTimeout(() => {
      this.newTime = this.getPro(this.startTime);
      if (this.getNewTime == true && this.resourceType == 'audio') {
        if (this.startTime > this.allTime) {
          this.getNewTime = false;
          this.isPlay = false;
          this.isOut = false;
          this.audioCtx.pause();
          this.isAudioPlay = false;
          this.startTime = 0;
          this.newTime = this.getPro(this.startTime);
          this.playTime = 100 * this.startTime / this.allTime;
          this.left = 634 * this.startTime / this.allTime + 24;
          this.$apply();
          return;
        }
        this.startTime += 1000;
        this.playTime = 100 * this.startTime / this.allTime;
        this.left = 634 * this.startTime / this.allTime + 24;
        this.$apply();
        this.setTime();
      } else {
        return;
      }
    }, 1000);
  }

  async getRelation(status) {
    await relationList(
      {
        relationType: 'course',
        relationId: this.courseId,
        limit: this.limit,
        offset: this.offset
      },
      this.language
    ).then(res => {
      for (var i = 0; i < res.items.length; i++) {
        if (this.language == 'ZH') {
          res.items[i].createTime = getTime.getZHymd(res.items[i].createTime);
        } else {
          res.items[i].createTime = getTime.getENymd(res.items[i].createTime);
        }
      }
      if (status == true) {
        this.offset += res.items.length;
      }
      if (this.offset == 0 && status == true) {
        status = false;
      }
      if (this.limit > res.items.length) {
        this.isMore = false;
      } else {
        this.isMore = true;
      }
      if (this.offset <= 8) {
        this.newsOptionItems = res.items;
      } else {
        this.newsOptionItems = this.newsOptionItems.concat(res.items);
      }
      this.total = res.total;
      this.$apply();
    });
  }
  async init() {
    var that = this;
    var language = wx.getStorageSync('language');
    await courseDetail(this.courseId, language).then(res => {
      this.option = res;
      try {
        this.option.introduction = JSON.parse(this.option.introduction);
      } catch (err) {
        this.option.introduction = [];
      }
      if (this.option.buyOrNot == 'YES') {
        this.$broadcast('isBuy');
      }
      if (this.onlineCourseResourceId !== '') {
        for (var i = 0; i < this.option.resourceResps.length; i++) {
          if (
            this.option.resourceResps[i].onlineCourseResourceId ==
            this.onlineCourseResourceId
          ) {
            this.index = i;
          }
        }
      }
      this.item = this.option.resourceResps[this.index];
      this.VAid = this.item.onlineCourseResourceId;
      if (this.item.resourceType == 'VIDEO') {
        this.resourceType = 'video';
        wx.getSystemInfo({
          success: function(res) {
            that.scrollHeight = res.windowHeight * 750 / res.windowWidth - 600;
          }
        });
      } else if (this.item.resourceType == 'AUDIO') {
        this.resourceType = 'audio';
        wx.getSystemInfo({
          success: function(res) {
            that.scrollHeight = 448 * res.windowWidth / 750;
          }
        });
      }
      wx.setNavigationBarTitle({
        title: this.item.name
      });
      this.endTime = this.getPro(this.item.resourceDuration);
      this.allTime = this.item.resourceDuration;
      for (var i = 0; i < this.option.resourceResps.length; i++) {
        if (this.option.resourceResps[i].freeTrailOrNot == 'YES') {
          this.isFree = true;
        } else {
          this.isFree = false;
        }
      }
      if (this.language == 'ZH') {
        this.time = getTime.getZHymd(this.option.createTime);
      } else {
        this.time = getTime.getENymd(this.option.createTime);
      }
      this.$broadcast('getCourseList', this.option.resourceResps);
      if (this.option.favoriteId > 0) {
        this.isSollect = true;
      } else {
        this.isSollect = false;
      }
    });
    this.$apply();
  }
  getPro(time) {
    if (typeof time !== 'number') {
      return time;
    }
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
  getObj() {
    var that = this;
    this.language = wx.getStorageSync('language');
    if (this.language == 'ZH') {
      this.titleLineTitle = '主讲人';
      this.titleLineContent = '内容简介';
    } else {
      this.titleLineTitle = 'Keynote speaker';
      this.titleLineContent = 'Requirements';
    }
    wx.getSystemInfo({
      success: res => {
        that.minHeight = res.windowHeight * 750 / res.windowWidth - 802;
        var system = res.system.slice(0, 3);
        if (system == 'iOS') {
          this.isIos = true;
        } else {
          this.isIos = false;
        }
      }
    });
  }

  async onShow() {
    this.fristScroll = 1;
    await this.getRelation(false);
  }

  async onLoad(e) {
    this.courseId = e.courseId;
    if (e.listId !== undefined) {
      this.index = e.listId;
    } else {
      this.index = 0;
    }
    if (e.onlineCourseResourceId !== undefined) {
      this.onlineCourseResourceId = e.onlineCourseResourceId;
    } else {
      this.onlineCourseResourceId = '';
    }
    this.videoContext = wx.createVideoContext('myVideo');
    this.audioCtx = wx.createAudioContext('myAudio');
    this.getObj();
    this.$broadcast('CL', true);
    wx.showLoading({
      title: this.language == 'ZH' ? '数据加载中' : 'Loading',
      mask: true
    });
    await this.init();
    await this.getRelation(false);
    this.$broadcast('linkData', this.total, this.option.playCardinalityNumber);
    wx.hideLoading();
  }
}
</script>