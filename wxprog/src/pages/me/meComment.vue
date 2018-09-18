
<style lang="less">
.comment-nav {
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
  text-align: center;
  padding: 22rpx 20rpx;
}

.is-sollect {
  border-bottom: 2px solid #a90202;
}

.empty {
  width: 172rpx;
  height: 186rpx;
  margin: 181rpx 0 18rpx 290rpx;
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

.delete-comment {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  top: 0;
}

.delete-box {
  width: 632rpx;
  height: 362rpx;
  margin: 338rpx 0 0 60rpx;
  background: #fff;
  border-radius: 10rpx;
}

.delete-tip {
  width: 100%;
  line-height: 50rpx;
  font-size: 36rpx;
  color: #4a4a4a;
  text-align: center;
  margin: 52rpx 0 22rpx 0;
  float: left;
}

.delete-tip-t {
  width: 100%;
  line-height: 40rpx;
  width: 400rpx;
  margin-left: 116rpx;
  font-size: 28rpx;
  color: #9b9b9b;
  text-align: center;
  float: left;
  margin-bottom: 66rpx;
}

.delete-confirm {
  width: 100%;
  height: 74rpx;
  float: left;
}

.cancel {
  width: 162rpx;
  line-height: 70rpx;
  border: 2rpx solid #9b9b9b;
  border-radius: 10rpx;
  float: left;
  font-family: PingFangSC-Medium;
  font-size: 30rpx;
  color: #9b9b9b;
  text-align: center;
  margin: 0 78rpx 0 112rpx;
}

.confirm {
  width: 166rpx;
  line-height: 74rpx;
  border-radius: 10rpx;
  float: left;
  font-family: PingFangSC-Medium;
  font-size: 30rpx;
  color: #ffffff;
  text-align: center;
  background: #a90202;
}

.comment:last-child {
  border: 0;
}
</style>
<template>
  <view class="container">
     <view class="comment-nav">
      <view data-set="{{1}}" catchtap="sollectNav" class="nav-box"><text class="nav-content {{isSollect==1?'is-sollect':''}}">{{language=='ZH'?'课程':'Courses'}}</text></view>
      <view data-set="{{2}}" catchtap="sollectNav" class="nav-box"><text class="nav-content {{isSollect==2?'is-sollect':''}}">{{language=='ZH'?'活动':'Activitys'}}</text></view>
      <view data-set="{{3}}" catchtap="sollectNav" class="nav-box"><text class="nav-content {{isSollect==3?'is-sollect':''}}">{{language=='ZH'?'资讯':'Informations'}}</text></view>
    </view>
    <commentList :commentListOption.sync="option"></commentList>
    <view wx:if="{{isEmpty}}" class="empty-box">
        <image src="http://pc1u34h1m.bkt.clouddn.com/my-comments-empty.png" class="empty"></image>
        <view class="empty-tip">{{language=='ZH'?'暂时没有评论':'No comments'}}</view>
    </view>
    <noMore wx:if="{{!isEmpty}}"></noMore>
    <view wx:if="{{isPause}}" class="delete-comment">
        <view class="delete-box">
            <view class="delete-tip">{{language=='ZH'?'确定要删除此条评论吗':'Delete Comment'}}</view>
            <view class="delete-tip-t">{{language=='ZH'?'评论被删除后将不可恢复':'This comment will not be restored after being deleted'}}</view>
            <view class="delete-confirm">
                <view catchtap="cancel"  class="cancel">{{language=='ZH'?'取消':'Cancel'}}</view>
                <view catchtap="confirm"  class="confirm">{{language=='ZH'?'确认':'Confirm'}}</view>
            </view>
        </view>
    </view>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import commentList from '../../components/commentList';
import noMore from '../../components/noMore';
import { relationList, deleteComment } from '../../api/index';
import { getTime } from '../../utils/filter.js';

export default class MeComment extends wepy.page {
  config = {};
  components = {
    commentList: commentList,
    noMore: noMore
  };

  data = {
    isSollect: 1,
    isPause: false,
    language: 'ZH',
    userId: 0,
    courseData: [],
    activityData: [],
    showData: [],
    limit: 8,
    courseOffset: 0,
    activityOffset: 0,
    showOffset: 0,
    courseMore: true,
    activityMore: true,
    showMore: true,
    option: [],
    isEmpty: false,
    id: 0,
    index: 0
  };

  computed = {};

  methods = {
    sollectNav(e) {
      if (this.isSollect == e.currentTarget.dataset.set) return;
      this.isEmpty = false;
      this.isSollect = e.currentTarget.dataset.set;
      if (this.isSollect == 1) {
        this.option = this.courseData;
      } else if (this.isSollect == 2) {
        this.option = this.activityData;
      } else if (this.isSollect == 3) {
        this.option = this.showData;
      }
      if (this.option.length == 0) {
        this.isEmpty = true;
      }
      for (var i = 0; i < this.option.length; i++) {
        try {
          this.option[i].extInfo.introduction = JSON.parse(
            this.option[i].extInfo.introduction
          );
        } catch (err) {
          this.option[i].extInfo.introduction = [];
        }
      }
      //   this.$broadcast('changeState', this.isSollect);
    },
    cancel() {
      this.isPause = false;
    },
    async confirm() {
      this.isPause = false;
      await deleteComment({ id: this.id }, this.language).then(res => {
        if (this.isSollect == 1) {
          this.courseData.splice(this.index, 1);
          this.option = this.courseData;
        } else if (this.isSollect == 2) {
          this.activityData.splice(this.index, 1);
          this.option = this.activityData;
        } else if (this.isSollect == 3) {
          this.showData.splice(this.index, 1);
          this.option = this.showData;
        }
      });
      this.$apply();
    }
  };

  events = {
    deleteOneComment(id, index) {
      this.id = id;
      this.index = index;
      this.isPause = true;
      console.log(this.isPause);
    }
  };

  async getCourseData() {
    if (this.courseMore == false) return;
    await relationList(
      {
        userId: this.userId,
        relationType: 'course',
        limit: this.limit,
        offset: this.courseOffset
      },
      this.language
    ).then(res => {
      this.courseOffset += res.items.length;
      for (var i = 0; i < res.items.length; i++) {
        if (this.language == 'ZH') {
          res.items[i].createTime = getTime.getZHymd(res.items[i].createTime);
        } else {
          res.items[i].createTime = getTime.getENymd(res.items[i].createTime);
        }
      }
      if (this.limit > res.items.length) {
        this.courseMore = false;
      }
      this.courseData = this.courseData.concat(res.items);
    });
    this.$apply();
  }

  async getActivityData() {
    if (this.activityMore == false) return;
    await relationList(
      {
        userId: this.userId,
        relationType: 'activity',
        limit: this.limit,
        offset: this.activityOffset
      },
      this.language
    ).then(res => {
      this.activityOffset += res.items.length;
      for (var i = 0; i < res.items.length; i++) {
        if (this.language == 'ZH') {
          res.items[i].createTime = getTime.getZHymd(res.items[i].createTime);
        } else {
          res.items[i].createTime = getTime.getENymd(res.items[i].createTime);
        }
      }
      if (this.limit > res.items.length) {
        this.activityMore = false;
      }
      this.activityData = this.activityData.concat(res.items);
    });
    this.$apply();
  }

  async getShowData() {
    if (this.showMore == false) return;
    await relationList(
      {
        userId: this.userId,
        relationType: 'show',
        limit: this.limit,
        offset: this.showOffset
      },
      this.language
    ).then(res => {
      this.showOffset += res.items.length;
      for (var i = 0; i < res.items.length; i++) {
        if (this.language == 'ZH') {
          res.items[i].createTime = getTime.getZHymd(res.items[i].createTime);
        } else {
          res.items[i].createTime = getTime.getENymd(res.items[i].createTime);
        }
      }
      if (this.limit > res.items.length) {
        this.showMore = false;
      }
      this.showData = this.showData.concat(res.items);
    });
    this.$apply();
  }

  async getData() {
    wx.showLoading({
      title: this.language == 'ZH' ? '数据加载中' : 'Loading',
      mask: true
    });
    await this.getCourseData();
    await this.getActivityData();
    await this.getShowData();
    this.option = this.courseData;
    if (this.option.length == 0) {
      this.isEmpty = true;
    }
    for (var i = 0; i < this.option.length; i++) {
      try {
        this.option[i].extInfo.introduction = JSON.parse(
          this.option[i].extInfo.introduction
        );
      } catch (err) {
        this.option[i].extInfo.introduction = [];
      }
    }
    this.$apply();
    wx.hideLoading();
  }

  async onReachBottom() {
    if (this.isSollect == 1) {
      await this.getCourseData();
    } else if (this.isSollect == 2) {
      await this.getActivityData();
    } else if (this.isSollect == 3) {
      await this.getShowData();
    }
  }

  async onShow() {
    this.language = wx.getStorageSync('language');
    this.$broadcast('CL');
    if (this.language == 'ZH') {
      wx.setNavigationBarTitle({
        title: '我的讨论'
      });
    } else {
      wx.setNavigationBarTitle({
        title: 'My Comments'
      });
    }
  }
  async onLoad() {
    this.userId = wx.getStorageSync('importantInfo').userId;
    await this.getData();
  }
}
</script>