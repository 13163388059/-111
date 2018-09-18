<style lang="less">
.news-detail-header {
  width: 686rpx;
  height: 90rpx;
  padding: 40rpx 32rpx 37rpx 32rpx;
  border-bottom: 2rpx solid #9b9b9b;
}

.new-icon {
  width: 90rpx;
  height: 90rpx;
  float: left;
}

.detail-right {
  width: 560rpx;
  height: 100%;
  margin-left: 36rpx;
  float: left;
}

.detail-title {
  width: 100%;
  line-height: 44rpx;
  font-size: 32rpx;
  color: #000000;
}

.delete-icon {
  width: 36rpx;
  height: 36rpx;
  float: right;
  padding-top: 4rpx;
}

.detail-time {
  font-size: 24rpx;
  color: #adadad;
  width: 100%;
  margin-top: 12rpx;
  line-height: 34rpx;
}

.news-content {
  width: 686rpx;
  padding: 0 32rpx;
  float: left;
}

.news-content image {
  margin-bottom: 14rpx;
  width: 100%;
  float: left;
}

.news-content text {
  margin-top: 40rpx;
  margin-bottom: 28rpx;
  width: 100%;
  line-height: 52rpx;
  font-size: 28rpx;
  color: #4a4a4a;
  float: left;
}
</style>
<template>
  <view class="container">
    <view class="news-detail-header">
        <image class="new-icon" wx:if="{{item.notifyType=='ACTIVITY_NOTIFY'}}" mode="aspectFill" src="{{iconImgs[0]}}"></image>
        <image class="new-icon" wx:if="{{item.notifyType=='COUPONS_NOTIFY'}}" mode="aspectFill" src="{{iconImgs[1]}}"></image>
        <image class="new-icon" wx:if="{{item.notifyType=='SYSTEM_NOTIFY'}}" mode="aspectFill" src="{{iconImgs[2]}}"></image>
        <view class="detail-right">
            <view class="detail-title">
              {{item.notifyType=='ACTIVITY_NOTIFY'?language=='ZH'?'参与活动':'Participate Activities':''}}
              {{item.notifyType=='COUPONS_NOTIFY'?language=='ZH'?'课程提醒':'Course Remind':''}}
              {{item.notifyType=='SYSTEM_NOTIFY'?language=='ZH'?'系统通知':'System':''}}
              <image data-set="{{item.id}}" catchtap="deleteNew" src="http://pc1u34h1m.bkt.clouddn.com/delete.png" class="delete-icon"></image></view>
            <view class="detail-time">{{item.createTime}}</view>
        </view>
    </view>
    <view class="news-content">
        <text>{{item.description}}</text>
        <!-- <image  mode="aspectFill" src="http://pc1u34h1m.bkt.clouddn.com/008.jpg"></image>
        <text>恭喜您已成功订阅了武志红老师的“团队管理、商业模式、网络营销”课程</text> -->
    </view>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import { feedBackDetail, deleteNew } from '../../api/index';
import { getTime } from '../../utils/filter';

export default class newsDetail extends wepy.page {
  config = {};
  components = {};

  data = {
    item: {},
    iconImgs: [
      'http://pc1u34h1m.bkt.clouddn.com/activity.png',
      'http://pc1u34h1m.bkt.clouddn.com/course-remind.png',
      'http://pc1u34h1m.bkt.clouddn.com/system-message.png'
    ],
    language: 'ZH'
  };

  computed = {};

  methods = {
    async deleteNew(e) {
      await deleteNew(e.currentTarget.dataset.set, this.language).then(res => {
        if (res == '') {
          wx.navigateBack({
            delta: 1
          });
          this.$apply();
        }
      });
    }
  };

  events = {};
  async getData() {
    wx.showLoading({
      title: this.language == 'ZH' ? '数据加载中' : 'Loading',
      mask: true
    });
    await feedBackDetail(this.newId, this.language).then(res => {
      this.item = res;
      this.item.createTime =
        this.language == 'ZH'
          ? getTime.getZHymd(this.item.createTime) +
            ' ' +
            getTime.getZHhm(this.item.createTime)
          : getTime.getENymd(this.item.createTime) +
            ' ' +
            getTime.getZHhm(this.item.createTime);
    });
    wx.hideLoading();
    this.$apply();
  }
  async onShow() {}
  async onLoad(e) {
    this.newId = e.id;
    this.language = wx.getStorageSync('language');
    if (this.language == 'ZH') {
      wx.setNavigationBarTitle({
        title: '消息详情'
      });
    } else {
      wx.setNavigationBarTitle({
        title: 'Message Detail'
      });
    }
    this.$broadcast('CL', true);
    await this.getData();
  }
}
</script>