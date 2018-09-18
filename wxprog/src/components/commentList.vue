<style lang="less">
.comment {
  width: 686rpx;
  padding: 32rpx 32rpx 26rpx 32rpx;
  border-bottom: 2px solid #e5e3e3;
  float: left;
}

.header {
  width: 100%;
  height: 70rpx;
  line-height: 70rpx;
  font-family: PingFangSC-Medium;
  font-size: 28rpx;
  color: #757575;
}

.user-img {
  width: 70rpx;
  height: 70rpx;
  float: left;
  border-radius: 50%;
  margin-right: 14rpx;
}

.header text {
  color: #4a4a4a;
}
.header view {
  float: left;
}

.time {
  font-size: 24rpx;
  color: #9b9b9b;
  line-height: 34rpx;
  margin: 16rpx 0 12rpx 0;
}

.comment-content {
  width: 100%;
  line-height: 42rpx;
  font-family: PingFangSC-Medium;
  font-size: 28rpx;
  color: #000000;
}

.comment-from {
  width: 100%;
  height: 156rpx;
  background: #f7f8fa;
  overflow: hidden;
  margin: 26rpx 0 16rpx 0;
}

.comment-from image {
  width: 156rpx;
  height: 156rpx;
  float: left;
}

.comment-right {
  width: 484rpx;
  margin-left: 36rpx;
  float: left;
}

.content-title {
  width: 100%;
  height: 80rpx;
  line-height: 40rpx;
  overflow: hidden;
  font-size: 28rpx;
  color: #000000;
  margin: 14rpx 0;
  word-wrap: break-word;
}

.price {
  width: 100%;
  line-height: 36rpx;
  font-size: 26rpx;
  color: #9b9b9b;
}

.footer {
  width: 100%;
  line-height: 32rpx;
  font-size: 22rpx;
  color: #9b9b9b;
}

.footer text {
  margin-left: 32rpx;
}

.deleteComment {
  color: #4a4a4a;
  float: right;
  padding-left: 40rpx;
}

.comment-last {
  border: 0;
}
</style>
<template>
  <view wx:for="{{commentListOption}}" wx:key="{{index}}" class="comment {{index==commentListOption.length-1?'comment-last':''}}" >
    <view class="header">
        <image  mode="aspectFill" src="{{item.photo==undefined?'http://pc1u34h1m.bkt.clouddn.com/headerImg.png':item.photo}}" class="user-img"></image>
        <view><text>{{language=='ZH'?'我':'Me '}}</text>{{language=='ZH'?'发表了评论':'replied '}}<text></text>{{language=='ZH'?'':'comment'}}</view>
    </view>
    <view class="time">{{item.createTime}}</view>
    <view class="comment-content">{{item.description}}</view>
    <view class="comment-from" data-set="{{[item.relationType,item.relationId]}}" catchtap="toDetail">
        <image  mode="aspectFill" src="{{item.extInfo.cover}}"></image>
        <view class="comment-right">
            <view class="content-title">{{item.extInfo.name}}</view>
            <view wx:if="{{item.relationType=='course'}}" class="price"><text wx:if="{{item.extInfo.price!=='免费'}}">¥</text>{{item.extInfo.price=='免费'?language=='ZH'?'免费':'Free':item.extInfo.price/100}}</view>
            <view wx:if="{{item.relationType=='activity'}}" class="price"><text wx:if="{{item.extInfo.priceRange!=='免费'}}">¥</text>{{item.extInfo.priceRange=='免费'?language=='ZH'?'免费':'Free':item.extInfo.priceRange}}</view>
        </view>
    </view>
    <view class="footer">{{language=='ZH'?'点赞':''}}{{item.priseNum}}{{language=='ZH'?'次':' likes'}}<text>{{language=='ZH'?'评论':''}}{{item.replyReviewResp.length||0}}{{language=='ZH'?'次':' comments'}}</text><view data-set="{{[item.id,index]}}" catchtap="deleteComment" class="deleteComment">{{language=='ZH'?'删除':'Delete'}}</view>
    </view>
  </view>
</template>
<script>
import wepy from 'wepy';

export default class CommentList extends wepy.component {
  props = {
    commentListOption: Object
  };

  data = {
    language: 'ZH'
  };
  events = {
    CL(status) {
      this.language = wx.getStorageSync('language');
    }
  };

  watch = {};

  methods = {
    deleteComment(e) {
      this.$emit(
        'deleteOneComment',
        e.currentTarget.dataset.set[0],
        e.currentTarget.dataset.set[1]
      );
    },
    toDetail(e) {
      if (e.currentTarget.dataset.set[0] == 'activity') {
        wx.navigateTo({
          url:
            '/pages/activity/activityDetail?id=' +
            e.currentTarget.dataset.set[1]
        });
      } else if (e.currentTarget.dataset.set[0] == 'course') {
        wx.navigateTo({
          url:
            '/pages/course/courseVideoDetail?id=' +
            e.currentTarget.dataset.set[1]
        });
      } else if (e.currentTarget.dataset.set[0] == 'show') {
        wx.navigateTo({
          url:
            '/pages/information/informationDetail?id=' +
            e.currentTarget.dataset.set[1]
        });
      }
    }
  };
}
</script>