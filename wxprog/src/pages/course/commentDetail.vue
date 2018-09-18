
<style lang="less">
.comment-list {
  padding-top: 28rpx;
  float: left;
  padding-left: 32rpx;
  border-bottom: 8rpx solid #f2f2f2;
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
}

.comment-right:last-child {
  border: 0;
}

.people-name {
  font-family: PingFangSC-Medium;
  font-size: 26rpx;
  color: #6c6c6d;
}

.comment-contents {
  width: 100%;
  font-family: PingFangSC-Medium;
  font-size: 26rpx;
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
  padding-bottom: 34rpx;
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
  margin-right: 6rpx;
}

.all-comment {
  padding-left: 32rpx;
  width: 718rpx;
  font-family: PingFangSC-Medium;
  font-size: 30rpx;
  color: #4a4a4a;
  line-height: 30rpx;
  margin-top: 40rpx;
  float: left;
}

.comments {
  border: 0;
  margin-top: 24rpx;
}

.comments .comment-right {
  border-bottom: 2rpx solid #e5e3e3;
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
  margin-left: 14rpx;
}

.all-name {
  font-size: 14px;
  color: #007aff;
  text-align: left;
  line-height: 40rpx;
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

.comments:last-child .comment-right {
  border: 0;
}

.is-delete {
  margin-left: 16rpx;
}
</style>
<template>
  <view class="container">
    <scroll-view scroll-y="true" bindscroll="scroll"  style="height: 100vh;" >
    <view class="comment-list">
        <image  mode="aspectFill"  class="people-img" src="{{option.photo==undefined?'http://pc1u34h1m.bkt.clouddn.com/headerImg.png':option.photo}}"></image>
        <view class="comment-right">
            <view class="people-name">{{option.author}}</view>
            <view style="word-wrap:break-word" class="comment-contents" data-set="{{[option.id,option.description]}}" bindlongpress="report">{{option.description}}</view>
            <view class="comment-tip">
                <view>{{option.createTime}}</view>
                <view class="round"></view>
                <view catchtap="openReplay" data-set="{{[option.id,option.author]}}">{{language=='ZH'?'回复':'reply'}}</view>
                <view wx:if="{{option.userId==userId}}" catchtap="deleteComment" data-set="{{option.id}}" class="is-delete">{{language=='ZH'?'删除':'delete'}}</view>
                <view class="get-good" data-set="{{[option.relationType,option.relationId,option.id,option.click]}}" catchtap="getGood">
                  <image wx:if="{{!option.click}}" mode="aspectFill" src="http://pc1u34h1m.bkt.clouddn.com/like.png"></image>
                  <image wx:if="{{option.click}}" mode="aspectFill" src="http://pc1u34h1m.bkt.clouddn.com/like-red.png"></image>
                  {{option.priseNum}}</view>
            </view>
        </view>
    </view>
    <view class="all-comment">{{language=='ZH'?'全部回复':'All reply'}}({{option.replyReviewResp.length}})</view>
    <view wx:for="{{option.replyReviewResp}}" wx:key="{{index}}" class="comment-list comments">
        <image  mode="aspectFill" class="people-img" src="{{item.photo==undefined?'http://pc1u34h1m.bkt.clouddn.com/headerImg.png':item.photo}}"></image>
        <view class="comment-right">
            <view class="people-name">{{item.author}}</view>
            <view style="word-wrap:break-word" class="comment-contents"><text data-set="{{[item.id,item.description]}}"  bindlongpress="report">{{item.description}}</text></view>
            <view class="comment-tip">
                <view>{{item.createTime}}</view>
                <view class="get-good" data-set="{{[item.relationType,item.parentId,item.id,item.click]}}" catchtap="getGood">
                  <image wx:if="{{!item.click}}" mode="aspectFill" src="http://pc1u34h1m.bkt.clouddn.com/like.png"></image>
                  <image wx:if="{{item.click}}" mode="aspectFill" src="http://pc1u34h1m.bkt.clouddn.com/like-red.png"></image>
                  {{item.priseNum}}</view>
            </view>
        </view>
    </view>
    <!-- <view wx:if="{{isPut}}" class="fixed-comment">
        <view class="fixed-comment-box" catchtap="openReplay">
            <image  mode="aspectFill" class="put-comment" src="http://pc1u34h1m.bkt.clouddn.com/edit-grey.png"></image>{{language=='ZH'?'发表评论':'Add a comment'}}
        </view>
    </view> -->
    <writeComment :commentData.sync="commentData" wx:if="{{isWriteComment}}"></writeComment>
    <report wx:if="{{isReportOpen}}"></report>
    </scroll-view>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import writeComment from '../../components/writeComment';
import report from '../../components/report';
import {
  relationDetail,
  deleteComment,
  getGood,
  cancelGetGood
} from '../../api/index';
import { getTime } from '../../utils/filter';

export default class CommentDetail extends wepy.page {
  config = {};
  components = {
    writeComment: writeComment,
    report: report
  };

  data = {
    comments: [1, 2, 3, 4, 5, 6],
    isWriteComment: false,
    isReportOpen: false,
    isPut: true,
    language: 'ZH',
    option: {},
    commentData: {},
    commentId: 0,
    userId: 0
  };

  computed = {};

  methods = {
    openReplay(e) {
      if (
        wx.getStorageSync('importantInfo') == '' ||
        wx.getStorageSync('importantInfo') == undefined
      ) {
        wx.navigateTo({
          url: '/pages/login'
        });
        return;
      }
      this.commentData = {
        nickName: e.currentTarget.dataset.set[1],
        parent_id: e.currentTarget.dataset.set[0],
        relationType: 'review',
        production: '',
        relationId: this.option.relationId
      };
      this.isWriteComment = true;
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
      this.$broadcast(
        'reportReview',
        e.currentTarget.dataset.set[0],
        e.currentTarget.dataset.set[1]
      );
      this.isReportOpen = true;
    },
    scroll(e) {
      if (e.detail.deltaY <= 0) {
        this.isPut = false;
      } else {
        this.isPut = true;
      }
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
          wx.navigateBack({
            delta: 1
          });
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
      if (!e.currentTarget.dataset.set[3]) {
        await getGood(
          {
            relationType:
              e.currentTarget.dataset.set[0] == 'review'
                ? 'review'
                : e.currentTarget.dataset.set[0] + '_review',
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
            relationType:
              e.currentTarget.dataset.set[0] == 'review'
                ? 'review'
                : e.currentTarget.dataset.set[0] + '_review',
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
      await this.getData();
      this.$apply();
    }
  };

  events = {
    closeReplay(status) {
      this.isReplay = false;
    },
    async closeComment(status) {
      this.isWriteComment = false;
      if (status == false) return;
      await this.getData(false);
    },
    closeReport() {
      this.isReportOpen = false;
    }
  };

  async getData() {
    await relationDetail(this.commentId, this.language).then(res => {
      this.option = res;
      if (this.language == 'ZH') {
        this.option.createTime = getTime.getZHymd(this.option.createTime);
      } else {
        this.option.createTime = getTime.getENymd(this.option.createTime);
      }
      try {
        for (var i = 0; i < this.option.replyReviewResp.length; i++) {
          if (this.language == 'ZH') {
            this.option.replyReviewResp[i].createTime = getTime.getZHymd(
              this.option.replyReviewResp[i].createTime
            );
          } else {
            this.option.replyReviewResp[i].createTime = getTime.getENymd(
              this.option.replyReviewResp[i].createTime
            );
          }
        }
      } catch (err) {
        this.option.replyReviewResp = [];
      }
    });
    this.$apply();
  }
  async onLoad(e) {
    console.log(e);
    this.userId = wx.getStorageSync('importantInfo').userId;
    this.language = wx.getStorageSync('language');
    if (this.language == 'ZH') {
      wx.setNavigationBarTitle({
        title: '评论详情'
      });
    } else {
      wx.setNavigationBarTitle({
        title: 'Comment details'
      });
    }
    this.commentId = e.id;
    await this.getData();
  }
}
</script>