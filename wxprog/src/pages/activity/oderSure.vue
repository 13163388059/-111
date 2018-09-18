
<style lang="less">
page {
  background: #f2f2f2;
}
.oder-content {
  width: 670rpx;
  padding: 44rpx 40rpx 32rpx 40rpx;
  border-bottom: 2rpx solid #ececec;
  background: #ffffff;
}

.oder-content image {
  width: 280rpx;
  height: 170rpx;
  border-radius: 8rpx;
  float: left;
}

.oder-content-right {
  width: 366rpx;
  height: 100%;
  margin-left: 24rpx;
  float: left;
}

.oder-title {
  width: 100%;
  font-family: PingFangSC-Medium;
  font-size: 32rpx;
  color: #333333;
  line-height: 48rpx;
}

.oder-time,
.oder-area {
  width: 100%;
  height: 34rpx;
  line-height: 34rpx;
  font-size: 24rpx;
  color: #9b9b9b;
}

.oder-time {
  margin-top: 18rpx;
  margin-bottom: 8rpx;
}

.information-list {
  width: 670rpx;
  min-height: 100rpx;
  padding: 0 40rpx;
  background: #f2f2f2;
  border-bottom: 2rpx solid #ececec;
  line-height: 100rpx;
  font-size: 28rpx;
  color: #9b9b9b;
}

.information-list-content {
  color: #333333;
  background: #ffffff;
}

.red {
  color: #a90202;
}

.last-text {
  float: right;
}

.price {
  margin-left: 20rpx;
}

.information-list-content-tip {
  min-height: 102rpx;
  line-height: 40rpx;
  padding-top: 32rpx;
  padding-bottom: 32rpx;
}

.pay {
  width: 100%;
  height: 96rpx;
  line-height: 96rpx;
  text-align: center;
  background: #a90202;
  color: #ffffff;
  font-family: PingFangSC-Medium;
  font-size: 32rpx;
  position: fixed;
  bottom: 0;
}

.tip-last {
  margin-bottom: 172rpx;
  line-height: 40rpx;
  padding-top: 32rpx;
  padding-bottom: 32rpx;
}
</style>
<template>
  <view class="container">
    <view class="oder-content">
        <image binderror="imgErr"   mode="aspectFill" src="{{option.cover}}"></image>
        <view class="oder-content-right">
            <view class="oder-title">{{option.name}}</view>
            <view class="oder-time">{{language=='ZH'?'时间：':'Time：'}}{{option.activityStartTime}}</view>
            <view class="oder-area">{{language=='ZH'?'地址：':'Address：'}}{{option.naddress}}</view>
        </view>
    </view>
    <view class="information-list information-list-content">{{option.offlineActivityTicketResps[index].name!==undefinde?option.offlineActivityTicketResps[index].name:language=='ZH'?'免费票':'Free'}}<text class="red price">¥{{price*number/100}}</text><text class="last-text">x{{number}}</text></view>
    <view class="information-list ">{{language=='ZH'?'报名人信息':'Registration'}}</view>
    <view class="information-list information-list-content" catchtap="editInfo">{{userInfo.remark1}}<text class="last-text">{{userInfo.apply_phone+' '+userInfo.remark2}}</text></view>
    <view class="information-list ">{{language=='ZH'?'付款须知':'Payment Instruction'}}</view>
    <view class="information-list information-list-content information-list-content-tip">{{language=='ZH'?'付款后，需后台审核通过才有入场券，请确认信息真实有效':'After payment, you need to pass the examination to get the tickets. Please confirm that the information is ture and valid.'}}</view>
    <view class="information-list ">{{language=='ZH'?'退款需知':'Refund Instruction'}}</view>
    <view class="information-list information-list-content tip-last">{{language=='ZH'?'活动开始前24小时申请退款者，收取票面价10%':'A refund of 24 hours before the start of the event requires an additional charge of 10%.'}}</view>
    <view class="pay" catchtap="navigateTo">{{language=='ZH'?'微信支付':'Pay'}}</view>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import { activityDetail } from '../../api/index';
import { getTime } from '../../utils/filter.js';

export default class OderSure extends wepy.page {
  config = {};
  components = {};

  data = {
    language: 'ZH',
    ticketId: 0,
    price: 0,
    number: 1,
    activityId: 0,
    option: [],
    index: 0,
    userInfo: {}
  };

  computed = {};

  methods = {
    navigateTo() {
      wx.navigateTo({
        url:
          'oderPay?activityId=' +
          this.activityId +
          '&number=' +
          this.number +
          '&ticketId=' +
          this.ticketId
      });
    },
    editInfo() {
      wx.navigateTo({
        url:
          'oderMan?activityId=' +
          this.activityId +
          '&number=' +
          this.number +
          '&ticketId=' +
          this.ticketId
      });
    },
    imgErr(e) {
      this.option.cover = 'http://pc1u34h1m.bkt.clouddn.com/defult.png';
    }
  };
  async getData() {
    await activityDetail(this.activityId, this.language).then(res => {
      this.option = res;
      if (this.language == 'ZH') {
        this.option.activityStartTime = getTime.getZHymd(
          this.option.activityStartTime,
          false
        );
      } else {
        this.option.activityStartTime = getTime.getENymd(
          this.option.activityStartTime,
          false
        );
      }
      if (this.option.ticketInfos !== undefined) {
        for (var i = 0; i < this.option.ticketInfos.length; i++) {
          if (
            this.option.offlineActivityTicketResps[i].offlineActivityTicketId ==
            this.ticketId
          ) {
            this.price = this.option.offlineActivityTicketResps[i].price;
            this.index = i;
          }
        }
      }
      this.$apply();
    });
  }
  events = {};
  async onShow() {}
  async onLoad(e) {
    console.log(e);
    this.activityId = e.activityId;
    this.number = Number(e.number);
    this.ticketId = e.ticketId;
    this.language = wx.getStorageSync('language');
    this.userInfo = wx.getStorageSync('userInfo');
    if (this.language == 'ZH') {
      wx.setNavigationBarTitle({
        title: '订单确认'
      });
    } else {
      wx.setNavigationBarTitle({
        title: 'Order confirmation'
      });
    }
    await this.getData();
  }
}
</script>