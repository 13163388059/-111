
<style lang="less">
page {
  height: 100%;
}

.container {
  width: 100%;
  height: 100%;
  overflow: scroll-y;
}
.information-top-img {
  width: 100%;
  height: 410rpx;
  float: left;
}

.information-content-box {
  width: 686rpx;
  padding: 36rpx 32rpx 44rpx 32rpx;
  border-bottom: 8rpx solid #f2f2f2;
  float: left;
}

.information-title {
  width: 100%;
  line-height: 42rpx;
  font-size: 32rpx;
  color: #333333;
}

.information-auther-box {
  width: 100%;
  font-size: 28rpx;
  color: #757575;
  line-height: 40rpx;
  margin: 30rpx 0 4rpx 0;
}

.read {
  float: right;
  font-size: 24rpx;
  color: #999999;
}

.read image {
  width: 32rpx;
  height: 26rpx;
  float: left;
  padding-right: 16rpx;
  margin-top: 7rpx;
}

.information-time-box {
  width: 100%;
  height: 62rpx;
  line-height: 62rpx;
  font-size: 24rpx;
  color: #757575;
}

.share-content-box {
  float: right;
}

.share {
  width: 44rpx;
  height: 38rpx;
  float: left;
  padding-left: 20rpx;
  padding-right: 20rpx;
  padding-top: 16rpx;
}

.sollect {
  width: 62rpx;
  height: 62rpx;
  float: left;
}

.favorite {
  width: 62rpx;
  height: 62rpx;
  float: left;
  padding-left: 14rpx;
}

.contents {
  width: 100%;
  float: left;
}

.contents label {
  margin-top: 46rpx;
  width: 100%;
  float: left;
}

.contents text {
  font-size: 32rpx;
  color: #333333;
  line-height: 52rpx;
}

.contents image {
  width: 100%;
}

.comment-box {
  width: 718rpx;
  padding: 32rpx 0 28rpx 32rpx;
  float: left;
}

.comment-top {
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

.comment-content {
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

.friend-share {
  width: 64rpx;
  height: 62rpx;
  padding: 0;
  background: #fff;
  margin: 0;
  float: left;
  border-radius: 0;
  padding-right: 20rpx;
  padding-top: 12rpx;
  padding-bottom: 12rpx;
}

.friend-share image {
  width: 44rpx;
  height: 38rpx;
  float: left;
}

button::after {
  border: 0;
}

.no-more {
  width: 686rpx;
  height: 32rpx;
  padding: 36rpx 32rpx 48rpx 32rpx;
  float: left;
  position: relative;
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

.pause-more {
  float: left;
}
</style>
<template>
  <view class="container">
   <scroll-view scroll-y="true" bindscroll="scroll" bindscrolltolower="scrollBottom" style="height: 100vh;" >
      <image binderror="imgErr" mode="aspectFill" class="information-top-img" src="{{option.cover}}"></image>
      <view class="information-content-box">
          <view class="information-title">{{option.title}}</view>
          <view class="information-auther-box">
              {{language=='ZH'?'作者：':'By'}}{{option.name}}<view class="read"><image src="http://pc1u34h1m.bkt.clouddn.com/see%403x.png"></image>{{option.pageViews}}</view>
          </view>
          <view class="information-time-box">
              {{option.createTime}}
              <view class="share-content-box">
                  <button open-type="share" class="friend-share"><image  mode="aspectFill" src="http://pc1u34h1m.bkt.clouddn.com/share%402x.png"></image></button>
                  <view class="favorite" catchtap="sollect"><image wx:if="{{!isSollect}}"  class="sollect" src="http://pc1u34h1m.bkt.clouddn.com/collection%402x.png"/>
                  <image wx:if="{{isSollect}}" class="sollect" src="http://pc1u34h1m.bkt.clouddn.com/collected.png"/></view>
                  {{option.favoriteNumber}}
              </view>
          </view>
          <view class="contents">
              <label wx:for="{{option.introduction}}" wx:key="{{index}}">
                <view style="word-wrap:break-word" wx:if="{{item.type=='text'}}">{{item.content}}</view>
                <image binderror="imgsErr" data-set="{{index}}" wx:if="{{item.type=='img'}}" mode="aspectFill" src="{{item.content}}"></image>
              </label>
              <!-- <image mode="aspectFill" src="http://pc1u34h1m.bkt.clouddn.com/013.jpg"></image>
              <text>今年是中国改革开放40周年，又恰逢中欧全面战略伙伴关系建立15周年和中欧领导人会晤机制成立20周年，中欧经贸合作面临新的历史机遇，在此重要时刻召开中欧经贸高层对话具有重要意义。中欧经贸高层对话是中欧间最高级别的经贸对话机制，是双方进行经贸政策沟通协调的重要平台。自2007年成立以来，已经成功举办6次，为深化双边互利合作，推动解决重大经贸关注发挥了重要作用。本次高层对话将继续就双方共同关注的全球经济治理，贸易和投资、创新驱动发展、互联互通等议题展开讨论，推动双边经贸合作不断迈上新台阶，为中欧全面战略伙伴关系注入新动力，发出中欧携手反对单边主义和保护主义，支持多边贸易体制的积极信号。</text>
              <image mode="aspectFill" src="http://pc1u34h1m.bkt.clouddn.com/014.jpg"></image> -->
          </view>
      </view>
      <view class="pause-more" style="min-height:{{minHeight+'rpx'}}">
          <view class="comment-box">
                <view class="comment-top">{{language=='ZH'?'评论：':'Comment'}}({{newsOption.total}})<view class="write-comment" catchtap="openReplay"><image src="http://pc1u34h1m.bkt.clouddn.com/edit%402x.png"></image>{{language=='ZH'?'发表评论':'Add a comment'}}</view></view>
                <view class="comment-content">
                  <newsContent :newsContentOption.sync="newsOptionItems"></newsContent>
                </view>
          </view>
          <view wx:if="{{!isMore}}" class="no-more">
                  <text></text>
                  <view class="no-more-content">{{language=="ZH"?'没有更多评论了':'No more comments'}}</view>
                </view>
      </view>
      <view wx:if="{{isUp}}" class="fixed-comment">
        <view class="fixed-comment-box" catchtap="openReplay">
          <image mode="aspectFill" class="put-comment" src="http://pc1u34h1m.bkt.clouddn.com/edit-grey.png"></image>{{language=='ZH'?'发表评论':'Comment'}}
        </view>
      </view>
    <report wx:if="{{isReportOpen}}"></report>
    <writeReplay :replayData.sync='replayData' wx:if="{{isReplay}}"></writeReplay>
    <writeComment :commentData.sync="commentData" wx:if="{{isWriteComment}}"></writeComment>
  </scroll-view>
  </view>
  
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import newsContent from '../../components/newsContent';
import writeReplay from '../../components/writeReplay';
import writeComment from '../../components/writeComment';
import report from '../../components/report';
import {
  newDetail,
  collection,
  cancelCollection,
  relationList
} from '../../api/index';
import { getTime } from '../../utils/filter.js';

export default class CourseSearch extends wepy.page {
  config = {};
  components = {
    newsContent: newsContent,
    writeReplay: writeReplay,
    report: report,
    writeComment: writeComment
  };

  data = {
    isOpenShare: false,
    isReplay: false,
    isUp: true,
    isReportOpen: false,
    language: 'ZH',
    newId: 0,
    isSollect: false,
    option: {},
    isWriteComment: false,
    replayData: {},
    commentData: {},
    newsOptionItems: [],
    newsOption: 0,
    isMore: true,
    offset: 0,
    limit: 8,
    isBottom: false,
    minHeight: 0
  };

  computed = {};

  methods = {
    scroll(e) {
      if (e.detail.deltaY < 0) {
        this.isUp = false;
      } else {
        this.isUp = true;
      }
    },
    openReplay() {
      if (
        wx.getStorageSync('importantInfo') == '' ||
        wx.getStorageSync('importantInfo') == undefined
      ) {
        wx.navigateTo({
          url: '/pages/login'
        });
        return;
      }
      this.replayData = {
        parent_id: '',
        relationType: 'show',
        production: this.option.title,
        relationId: this.newId
      };
      this.isReplay = true;
    },
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
            relationId: this.newId,
            relationType: 'show',
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
            relationId: this.newId,
            relationType: 'show',
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
    imgErr(e) {
      this.option.cover = 'http://pc1u34h1m.bkt.clouddn.com/defult.png';
    },
    imgsErr(e) {
      this.option.introduction[e.currentTarget.dataset.set].content =
        'http://pc1u34h1m.bkt.clouddn.com/defult.png';
    },
    async scrollBottom() {
      this.isBottom = true;
      if (this.isMore == false) return;
      await this.getRelation(true);
    }
  };

  events = {
    closeShare() {
      this.isOpenShare = false;
    },
    async closeReplay(status) {
      this.isReplay = false;
      if (status == false) return;
      await this.getRelation(false);
    },
    closeReport() {
      this.isReportOpen = false;
    },
    openCommentReplay(id, title) {
      this.$broadcast('reportReview', id, title);
      this.isReportOpen = true;
    },
    openComment(arr) {
      this.commentData = {
        nickName: arr[1],
        parent_id: arr[0],
        relationType: 'review',
        production: this.option.title,
        relationId: this.newId
      };
      this.isWriteComment = true;
    },
    async closeComment(status) {
      this.isWriteComment = false;
      if (status == false) return;
      await this.getRelation(false);
    }
  };
  onShareAppMessage() {
    // if (res.from === 'button') {
    //   // 来自页面内转发按钮
    // }
    return {
      title: this.option.title,
      path: '/pages/information/informationDetail?id=' + this.newId
    };
  }
  async getData() {
    var language = wx.getStorageSync('language');

    await newDetail(this.newId, language).then(res => {
      this.option = res;
      try {
        this.option.introduction = JSON.parse(this.option.introduction);
      } catch (err) {
        this.option.introduction = [];
      }
      if (this.language == 'ZH') {
        this.option.createTime = getTime.getZHymd(res.createTime);
      } else {
        this.option.createTime = getTime.getENymd(res.createTime);
      }
      wx.setNavigationBarTitle({
        title: this.option.title
      });
      if (this.option.favoriteId > 0) {
        this.isSollect = true;
      } else {
        this.isSollect = false;
      }
    });
    this.$apply();
  }

  async getRelation(status) {
    await relationList(
      {
        relationType: 'show',
        relationId: this.newId,
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
      if (this.limit > res.items.length) {
        this.isMore = false;
      } else {
        this.isMore = true;
      }
      if (this.offset <= 0) {
        this.newsOptionItems = res.items;
      } else {
        this.newsOptionItems = this.newsOptionItems.concat(res.items);
      }
      this.newsOption = res;
      this.$apply();
    });
  }

  async onShow() {
    await this.getRelation(false);
    await this.getData();
  }

  async onLoad(e) {
    var that = this;
    this.newId = e.id;
    this.language = wx.getStorageSync('language');
    this.$broadcast('CL', true);
    wx.getSystemInfo({
      success: res => {
        var system = res.system.slice(0, 3);
        if (system == 'iOS') {
          wx.getSystemInfo({
            success: function(res) {
              that.minHeight = res.windowHeight * 750 / res.windowWidth - 676;
            }
          });
        }
      }
    });
  }
}
</script>