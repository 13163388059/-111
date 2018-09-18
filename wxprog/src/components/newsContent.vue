<style lang="less">
.comment-list {
  padding-top: 27rpx;
  float: left;
}

.people-img {
  width: 74rpx;
  height: 74rpx;
  border-radius: 50%;
  float: left;
}

.comment-right {
  width: 600rpx;
  padding-right: 32rpx;
  float: left;
  margin-left: 12rpx;
  border-bottom: 2rpx solid #e5e3e3;
  margin-top: 12rpx;
  padding-bottom: 29rpx;
}

.people-name {
  font-family: PingFangSC-Medium;
  font-size: 26rpx;
  color: #6c6c6d;
}

.comment-contents {
  width: 100%;
  font-family: PingFangSC-Medium;
  font-size: 28rpx;
  color: #000000;
  letter-spacing: 0;
  line-height: 42rpx;
  margin: 6rpx 0 8rpx 0;
}

.comment-tip {
  width: 100%;
  height: 36rpx;
  font-family: PingFangSC-Medium;
  font-size: 26rpx;
  color: #9b9b9b;
  line-height: 36rpx;
}

.comment-tip view {
  float: left;
}

.round {
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  background: #9b9b9b;
  margin: 14rpx 16rpx;
}

.comment-tip .get-good {
  float: right;
}

.get-good image {
  width: 34rpx;
  height: 34rpx;
  float: left;
  padding-right: 6rpx;
  padding-left: 26rpx;
}

.comment-reply {
  width: 100%;
  margin: 4rpx 0 0rpx 0;
  position: relative;
  float: left;
}

.triangular {
  width: 0;
  height: 0;
  border-top: 20rpx solid transparent;
  border-left: 20rpx solid transparent;
  border-right: 20rpx solid transparent;
  border-bottom: 20rpx solid #f2f2f2;
  position: absolute;
  top: -18rpx;
  left: 40rpx;
}

.comment-news {
  width: 544rpx;
  background: #f2f2f2;
  margin-top: 20rpx;
  border-radius: 8rpx;
  padding: 28rpx;
  float: left;
}

.owner {
  width: 74rpx;
  height: 30rpx;
  border: 2rpx solid #a90202;
  border-radius: 6rpx;
  text-align: center;
  line-height: 30rpx;
  font-size: 22rpx;
  color: #a90202;
  margin-right: 14rpx;
}

.all-name {
  font-size: 14px;
  color: #5aadff;
  text-align: left;
  line-height: 40rpx;
}

.news-li {
  width: 100%;
  margin-bottom: 14rpx;
  float: left;
}

.more-news {
  font-family: PingFangSC-Medium;
  font-size: 22rpx;
  color: #007aff;
  line-height: 22rpx;
  float: left;
}

.main-take {
  font-size: 28rpx;
}

.comment-list:last-child .comment-right {
  border: 0;
}

.point {
  padding: 0 8rpx;
}

.is-delete {
  margin-left: 16rpx;
}
</style>
<template>
  <view class="comment-list" wx:for="{{newsContentOption}}" wx:key="{{index}}">
    <image catchtap="navTo" data-set="{{[item.id,item.description]}}"  class="people-img" src="{{item.photo==undefined?'http://pc1u34h1m.bkt.clouddn.com/headerImg.png':item.photo}}"></image>
    <view class="comment-right">
    <view class="people-name">{{item.author}}</view>
    <view style="word-wrap:break-word" class="comment-contents" catchtap="navTo" data-set="{{[item.id,item.description]}}" bindlongpress="report">{{item.description}}</view>
    <view class="comment-tip"><view>{{item.createTime}}</view><view class="round"></view><view data-set="{{[item.id,item.author]}}" catchtap="writeComment">{{language=='ZH'?'回复':'reply'}}</view><view wx:if="{{item.userId==userId}}" catchtap="deleteComment" data-set="{{item.id}}" class="is-delete">{{language=='ZH'?'删除':'delete'}}</view>
        <view class="get-good" data-set="{{[item.relationType,item.relationId,item.id,item.click]}}" catchtap="getGood">
          <image wx:if="{{!item.click}}" mode="aspectFill" src="http://pc1u34h1m.bkt.clouddn.com/like.png"></image>
          <image wx:if="{{item.click}}" mode="aspectFill" src="http://pc1u34h1m.bkt.clouddn.com/like-red.png"></image>
          {{item.priseNum}}</view>
    </view>
    <view class="comment-reply" wx:if="{{item.replyReviewResp.length>=1}}">
        <view class="triangular"></view>
        <view class="comment-news">
        <view class="news-li" wx:for="{{item.replyReviewResp}}" wx:key="{{index}}" wx:if="{{index<3}}"><text class="all-name">{{item.author}}</text><text class="main-take" data-set="{{[item.id,item.description]}}" style="word-wrap:break-word" bindlongpress="report">: {{item.description}}</text></view>
        <!-- <view class="news-li"><text class="all-name">摩卡小镇</text> <text class="point">@</text><text class="owner">{{language=='ZH'?'主办方':'Instructor'}}</text><text class="all-name">程志武</text><text bindlongpress="report" class="main-take">: 每周更新一次哦！谢谢关注!速度发货啦</text></view>
            <view class="news-li"><text class="all-name">摩卡小镇</text><text class="point">@</text><text class="owner">{{language=='ZH'?'主办方':'Instructor'}}</text><text class="all-name">程志武</text><text bindlongpress="report" class="main-take">: 每周更新一次哦！谢谢关注!速度发货啦</text></view> -->
        <view wx:if="{{item.replyReviewResp.length>3}}" catchtap="navTo" data-set="{{item.id}}" class="more-news">{{language=='ZH'?'查看全部':'See more'}} {{item.replyReviewResp.length-3}} {{language=='ZH'?'条回复':'replies'}}</view>
        </view>
    </view>
    </view>
  </view>
</template>
<script>
import wepy from 'wepy';
import { deleteComment, getGood, cancelGetGood } from '../api/index';
export default class newsContent extends wepy.component {
  props = {
    newsContentOption: Object
  };

  data = {
    language: 'ZH',
    userId: 0
  };
  events = {
    CL(status) {
      this.language = wx.getStorageSync('language');
      this.userId = wx.getStorageSync('importantInfo').userId;
    }
  };

  watch = {};

  methods = {
    navTo(e) {
      wx.navigateTo({
        url: '/pages/course/commentDetail?id=' + e.currentTarget.dataset.set[0]
      });
    },
    writeComment(e) {
      if (
        wx.getStorageSync('importantInfo') == '' ||
        wx.getStorageSync('importantInfo') == undefined
      ) {
        wx.navigateTo({
          url: '/pages/login'
        });
        return;
      }
      this.$emit('openComment', e.currentTarget.dataset.set);
    },
    report(e) {
      if (
        wx.getStorageSync('importantInfo') == '' ||
        wx.getStorageSync('importantInfo') == undefined
      ) {
        wx.navigateTo({
          url: '/pages/login'
        });
        return;
      }
      this.$emit(
        'openCommentReplay',
        e.currentTarget.dataset.set[0],
        e.currentTarget.dataset.set[1]
      );
    },
    async deleteComment(e) {
      if (
        wx.getStorageSync('importantInfo') == '' ||
        wx.getStorageSync('importantInfo') == undefined
      ) {
        wx.navigateTo({
          url: '/pages/login'
        });
        return;
      }
      await deleteComment(
        {
          id: e.currentTarget.dataset.set
        },
        this.language
      ).then(res => {
        if (res.status == true) {
          this.$emit('closeReplay');
        }
      });
    },
    async getGood(e) {
      if (
        wx.getStorageSync('importantInfo') == '' ||
        wx.getStorageSync('importantInfo') == undefined
      ) {
        wx.navigateTo({
          url: '/pages/login'
        });
        return;
      }
      if (e.currentTarget.dataset.set[3] == false) {
        await getGood(
          {
            relationType: e.currentTarget.dataset.set[0] + '_review',
            userId: this.userId,
            relationId: e.currentTarget.dataset.set[2],
            masterId: e.currentTarget.dataset.set[1]
          },
          this.language
        ).then(res => {
          if (res.status == 'ADD_PRAISE') {
            this.$emit('closeReplay');
          }
        });
      } else {
        await cancelGetGood(
          {
            relationType: e.currentTarget.dataset.set[0] + '_review',
            userId: this.userId,
            relationId: e.currentTarget.dataset.set[2],
            masterId: e.currentTarget.dataset.set[1]
          },
          this.language
        ).then(res => {
          if (res.status == true) {
            this.$emit('closeReplay');
          }
        });
      }
    }
  };
}
</script>