
<style lang="less">
.activity-nav {
  width: 100%;
  height: 88rpx;
  border-bottom: 2rpx solid #e5e3e3;
  display: flex;
}

.nav-box {
  height: 86rpx;
  text-align: center;
  margin-left: 32rpx;
}

.english {
  margin-left: 20rpx;
}

.nav-content {
  height: 100%;
  line-height: 86rpx;
  font-family: PingFangSC-Medium;
  font-size: 26rpx;
  color: #4a4a4a;
  text-align: center;
  padding: 0 20rpx;
}

.is-sollect {
  border-bottom: 2px solid #a90202;
}

.empty {
  width: 242rpx;
  height: 228rpx;
  margin: 140rpx 0 18rpx 318rpx;
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
    <view class="activity-nav">
      <view data-set="{{1}}" catchtap="sollectNav" class="nav-box {{language=='ZH'?'':'english'}}"><view class="nav-content {{isSollect==1?'is-sollect':''}}">{{language=='ZH'?'全部':'All'}}</view></view>
      <view data-set="{{2}}" catchtap="sollectNav" class="nav-box {{language=='ZH'?'':'english'}}"><view class="nav-content {{isSollect==2?'is-sollect':''}}">{{language=='ZH'?'待付款':'Pay'}}</view></view>
      <view data-set="{{3}}" catchtap="sollectNav" class="nav-box {{language=='ZH'?'':'english'}}"><view class="nav-content {{isSollect==3?'is-sollect':''}}">{{language=='ZH'?'待审核':'In Review'}}</view></view>
      <view data-set="{{4}}" catchtap="sollectNav" class="nav-box {{language=='ZH'?'':'english'}}"><view class="nav-content {{isSollect==4?'is-sollect':''}}">{{language=='ZH'?'待参加':'Participate'}}</view></view>
      <view data-set="{{5}}" catchtap="sollectNav" class="nav-box {{language=='ZH'?'':'english'}}"><view class="nav-content {{isSollect==5?'is-sollect':''}}">{{language=='ZH'?'已退款':'Refunded'}}</view></view>
    </view>
    <view wx:if="{{noOrder}}" class="empty-box">
      <image class="empty" src="http://pc1u34h1m.bkt.clouddn.com/my-activity-empty.png"></image>
      <view class="empty-tip">{{language=='ZH'?'暂时没有该活动':'No activities are booked'}}</view>  
    </view>
    <oderActivity></oderActivity>
    <noMore wx:if="{{!noOrder}}"></noMore>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import oderActivity from '../../components/oderActivity';
import noMore from '../../components/noMore';
import { activityOders } from '../../api/index';

export default class MeActivity extends wepy.page {
  config = {
    navigationBarTitleText: '我的活动'
  };
  components = {
    oderActivity: oderActivity,
    noMore: noMore
  };

  data = {
    isSollect: 1,
    language: 'ZH',
    noOrder: false,
    allData: [],
    toPayData: [],
    payOkData: [],
    cancelData: [],
    toJoinData: [],

    allPage: 1,
    toPayPage: 1,
    payOkPage: 1,
    cancelPage: 1,
    toJoinPage: 1,
    toRefundPage: 1,
    refundOkPage: 1,
    refundingPage: 1,
    refundFailPage: 1,
    approvedRefusePage: 1,

    allOffset: 0,
    toPayOffset: 0,
    payOkOffset: 0,
    cancelOffset: 0,
    toJoinOffset: 0,
    toRefundOffset: 0,
    refundOkOffset: 0,
    refundingOffset: 0,
    refundFailOffset: 0,
    approvedRefuseOffset: 0,

    allMore: true,
    toPayMore: true,
    payOkMore: true,
    cancelMore: true,
    toJoinMore: true,
    toRefundMore: true,
    refundOkMore: true,
    refundingMore: true,
    refundFailMore: true,
    approvedRefuseMore: true,
    limit: 12
  };

  computed = {};

  methods = {
    async sollectNav(e) {
      this.isSollect = e.currentTarget.dataset.set;
      this.$broadcast('changeState');
      if (this.isSollect == 1) {
        this.$broadcast('getData', this.allData);
      } else if (this.isSollect == 2) {
        if (this.toPayData.length == 0) {
          await this.getToPayData();
        }
        this.$broadcast('getData', this.toPayData);
      } else if (this.isSollect == 3) {
        if (this.payOkData.length == 0) {
          await this.getPayOkData();
        }
        this.$broadcast('getData', this.payOkData);
      } else if (this.isSollect == 4) {
        if (this.toJoinData.length == 0) {
          await this.getToJoinData();
        }
        this.$broadcast('getData', this.toJoinData);
      } else if (this.isSollect == 5) {
        if (this.cancelData.length == 0) {
          await this.getCancelData();
        }
        this.$broadcast('getData', this.cancelData);
      }
    }
  };

  events = {
    changeStatus(status) {
      this.noOrder = status;
    }
  };

  async getAllData() {
    if (this.allMore == false) return;
    wx.showLoading({
      title: this.language == 'ZH' ? '数据加载中' : 'Loading',
      mask: true
    });
    await activityOders(
      { limit: this.limit, page: this.allPage, offset: this.allOffset },
      this.language
    ).then(res => {
      this.allPage++;
      this.allOffset += res.items.length;
      if (res.items < this.limit) {
        this.allMore = false;
      }
      this.allData = this.allData.concat(res.items);
      this.$broadcast('getData', this.allData);
      this.$apply();
    });
    wx.hideLoading();
    this.$apply();
  }

  async getToJoinData() {
    wx.showLoading({
      title: this.language == 'ZH' ? '数据加载中' : 'Loading',
      mask: true
    });
    if (this.toJoinMore == true) {
      await activityOders(
        {
          limit: this.limit,
          page: this.toJoinPage,
          offset: this.toJoinOffset,
          orderStatus: 'APPROVED'
        },
        this.language
      ).then(res => {
        this.toJoinPage++;
        this.toJoinOffset += res.items.length;
        if (res.items < this.limit) {
          this.toJoinMore = false;
        }
        this.toJoinData = this.toJoinData.concat(res.items);
      });
    }
    if (this.toRefundMore == true) {
      await activityOders(
        {
          limit: this.limit,
          page: this.toRefundPage,
          offset: this.toRefundOffset,
          orderStatus: 'REFUNDING'
        },
        this.language
      ).then(res => {
        this.toRefundPage++;
        this.toRefundOffset += res.items.length;
        if (res.items < this.limit) {
          this.toRefundMore = false;
        }
        this.toJoinData = this.toJoinData.concat(res.items);
      });
    }
    if (this.refundingMore == true) {
      await activityOders(
        {
          limit: this.limit,
          page: this.refundingPage,
          offset: this.refundingOffset,
          orderStatus: 'REFUND_APPROVED'
        },
        this.language
      ).then(res => {
        this.refundOkPage++;
        this.refundingOffset += res.items.length;
        if (res.items < this.limit) {
          this.refundingMore = false;
        }
        this.toJoinData = this.toJoinData.concat(res.items);
      });
    }
    if (this.refundFailMore == true) {
      await activityOders(
        {
          limit: this.limit,
          page: this.refundFailPage,
          offset: this.refundFailOffset,
          orderStatus: 'REFUND_REFUSED'
        },
        this.language
      ).then(res => {
        this.refundFailPage++;
        this.refundFailOffset += res.items.length;
        if (res.items < this.limit) {
          this.refundFailMore = false;
        }
        this.toJoinData = this.toJoinData.concat(res.items);
      });
    }
    this.$broadcast('getData', this.toJoinData);
    wx.hideLoading();
    this.$apply();
  }

  async getCancelData() {
    wx.showLoading({
      title: this.language == 'ZH' ? '数据加载中' : 'Loading',
      mask: true
    });
    if (this.cancelMore == true) {
      await activityOders(
        {
          limit: this.limit,
          page: this.cancelPage,
          offset: this.cancelOffset,
          orderStatus: 'CANCEL'
        },
        this.language
      ).then(res => {
        this.cancelPage++;
        this.cancelOffset += res.items.length;
        if (res.items < this.limit) {
          this.cancelMore = false;
        }
        this.cancelData = this.cancelData.concat(res.items);
      });
    }
    if (this.refundOkMore == true) {
      await activityOders(
        {
          limit: this.limit,
          page: this.refundOkPage,
          offset: this.refundOkOffset,
          orderStatus: 'REFUND_SUCCESS'
        },
        this.language
      ).then(res => {
        this.refundOkPage++;
        this.refundOkOffset += res.items.length;
        if (res.items < this.limit) {
          this.refundOkMore = false;
        }
        this.cancelData = this.cancelData.concat(res.items);
      });
    }
    if (this.approvedRefuseMore == true) {
      await activityOders(
        {
          limit: this.limit,
          page: this.approvedRefusePage,
          offset: this.approvedRefuseOffset,
          orderStatus: 'APPROVED_REFUSE'
        },
        this.language
      ).then(res => {
        this.approvedRefusePage++;
        this.approvedRefuseOffset += res.items.length;
        if (res.items < this.limit) {
          this.approvedRefuseMore = false;
        }
        this.cancelData = this.cancelData.concat(res.items);
      });
    }
    this.$broadcast('getData', this.cancelData);
    wx.hideLoading();
    this.$apply();
  }

  async getToPayData() {
    if (this.toPayMore == false) return;
    wx.showLoading({
      title: this.language == 'ZH' ? '数据加载中' : 'Loading',
      mask: true
    });
    await activityOders(
      {
        limit: this.limit,
        page: this.toPayPage,
        offset: this.toPayOffset,
        orderStatus: 'WAITING_PAYMENT'
      },
      this.language
    ).then(res => {
      this.toPayPage++;
      this.toPayOffset += res.items.length;
      if (res.items < this.limit) {
        this.toPayMore = false;
      }
      this.toPayData = this.toPayData.concat(res.items);
      this.$broadcast('getData', this.toPayData);
      this.$apply();
    });
    wx.hideLoading();
    this.$apply();
  }

  async getPayOkData() {
    if (this.payOkMore == false) return;
    wx.showLoading({
      title: this.language == 'ZH' ? '数据加载中' : 'Loading',
      mask: true
    });
    await activityOders(
      {
        limit: this.limit,
        page: this.payOkPage,
        offset: this.payOkOffset,
        orderStatus: 'COMPLETE_PAYMENT'
      },
      this.language
    ).then(res => {
      this.payOkPage++;
      this.payOkOffset += res.items.length;
      if (res.items < this.limit) {
        this.payOkMore = false;
      }
      this.payOkData = this.payOkData.concat(res.items);
      this.$broadcast('getData', this.payOkData);
    });
    wx.hideLoading();
    this.$apply();
  }

  async init() {
    var language = wx.getStorageSync('language');
    await this.getAllData();
  }
  async onReachBottom() {
    if (this.isSollect == 1) {
      await this.getAllData();
    } else if (this.isSollect == 2) {
      await this.getToPayData();
    } else if (this.isSollect == 3) {
      await this.getPayOkData();
    } else if (this.isSollect == 4) {
      await this.getToJoinData();
    } else if (this.isSollect == 5) {
      await this.getCancelData();
    }
  }

  async onShow() {}
  async onLoad() {
    this.language = wx.getStorageSync('language');
    if (this.language == 'ZH') {
      wx.setNavigationBarTitle({
        title: '我的活动'
      });
    } else {
      wx.setNavigationBarTitle({
        title: 'My Activities'
      });
    }
    this.$broadcast('CL', true);
    await this.init();
  }
}
</script>