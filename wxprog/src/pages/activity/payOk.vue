
<style lang="less">
page {
  background: #f2f2f2;
}

.tip-box {
  background: #ffffff;
  width: 100%;
  height: 198rpx;
  border-bottom: 2rpx solid #ececec;
  text-align: center;
}

.tip-header {
  height: 50rpx;
  line-height: 50rpx;
  font-family: PingFangSC-Medium;
  font-size: 36rpx;
  color: #333333;
  margin-top: 42rpx;
  margin-bottom: 22rpx;
}

.tip-header image {
  width: 44rpx;
  height: 36rpx;
  margin-top: 7rpx;
  margin-right: 14rpx;
}

.tip-body {
  font-size: 32rpx;
  color: #9b9b9b;
  line-height: 28rpx;
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
  height: 100rpx;
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

.navigate {
  width: 100%;
  height: 40rpx;
  font-size: 28rpx;
  color: #000202;
  line-height: 40rpx;
  text-align: center;
  margin-top: 32rpx;
}

.regaid {
  color: #999999;
}

.fixed-box {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
}

.close-box {
  width: 100%;
  height: 100%;
}

.help-model {
  width: 632rpx;
  height: 350rpx;
  background: #ffffff;
  border-radius: 10rpx;
  position: fixed;
  top: 278rpx;
  left: 60rpx;
}

.call {
  width: 568rpx;
  height: 80rpx;
  background: #eeeeee;
  font-size: 26rpx;
  text-align: center;
  line-height: 80rpx;
  border-radius: 80rpx;
  margin-left: 32rpx;
  padding: 0;
  margin-top: 63rpx;
}

button::after {
  border: 0;
}

.content-left {
  text-align: left;
  width: 650rpx;
  padding: 0 50rpx;
}

.right {
  float: right;
}
</style>
<template>
  <view class="container">
    <view wx:if="{{status==''||status=='COMPLETE_PAYMENT'}}" class="tip-box">
        <view class="tip-header"><image mode="aspectFill" src="http://pc1u34h1m.bkt.clouddn.com/successful@3x.png"></image>{{language=='ZH'?'恭喜您付款成功':'Thank you for your payment!'}}</view>
        <view class="tip-body">{{language=='ZH'?'等待主办方审核…':'Please wait for the organizer to review...'}}</view>
    </view>
    <view wx:if="{{status=='FINISH'||status=='REFUND_REFUSED'}}" class="tip-box">
        <view class="tip-header"><image mode="aspectFill" src="http://pc1u34h1m.bkt.clouddn.com/successful@3x.png"></image>{{language=='ZH'?'订单已完成':'Order completed'}}</view>
        <view class="tip-body">{{language=='ZH'?'入场券号：'+ticketNumber:'Ticket number：'+ticketNumber}}</view>
    </view>
    <view wx:if="{{status=='APPROVED'}}" class="tip-box">
        <view class="tip-header"><image mode="aspectFill" src="http://pc1u34h1m.bkt.clouddn.com/successful@3x.png"></image>{{language=='ZH'?'审核通过':'Passed'}}</view>
        <view class="tip-body">{{language=='ZH'?'入场券号：'+ticketNumber:'Ticket number：'+ticketNumber}}</view>
    </view>
    <view wx:if="{{status=='REFUNDING'||status=='REFUND_APPROVED'}}" class="tip-box">
        <view class="tip-header content-left">{{language=='ZH'?'正在申请退票':'Thank you for your payment!'}}</view>
        <view class="tip-body content-left" >{{language=='ZH'?'您的退款申请已收到，正在审核中':'Please wait for the organizer to review...'}}</view>
    </view>
    <view wx:if="{{status=='REFUND_SUCCESS'||status=='APPROVED_REFUSE'}}" class="tip-box">
        <view class="tip-header content-left">{{language=='ZH'?'退票成功':'Thank you for your payment!'}}</view>
        <view class="tip-body content-left" ><view class="right">{{language=='ZH'?'已退回至原账户':'Refunds'}}</view></view>
    </view>
    <view class="oder-content">
        <image binderror="imgErr" mode="aspectFill" src="{{option.cover}}"></image>
        <view class="oder-content-right">
            <view class="oder-title">{{option.name}}</view>
            <view class="oder-time">{{language=='ZH'?'时间：':'Time：'}}{{option.activityStartTime}}</view>
            <view class="oder-area">{{language=='ZH'?'地址：':'Address：'}}{{option.naddress}}</view>
        </view>
    </view>
    <view class="information-list information-list-content">{{option.offlineActivityTicketResps[index].name!==undefinde?option.offlineActivityTicketResps[index].name:language=='ZH'?'免费票':'Free'}}<text class="red price">¥{{price*number/100}}</text><text class="last-text">x{{number}}</text></view>
    <view wx:if="{{status==''||status=='COMPLETE_PAYMENT'}}" class="navigate" catchtap="navigateTo">{{language=='ZH'?'进入':'Enter'}}<text class="red">{{language=='ZH'?'我的活动':'My Activities'}}</text>{{language=='ZH'?'查看':'to see more'}}</view>
    <view wx:if="{{status!==''&&status!=='COMPLETE_PAYMENT'}}" class="navigate" catchtap="contactHelp"><text class="regaid">{{language=='ZH'?'如有其他问题，请 ':'If there are other questions, please '}}</text>{{language=='ZH'?'联系客服':'Contact Customer Service'}}</view>
    <view wx:if="{{isHelp}}" class="fixed-box">
       <view catchtap="closeModel" class="close-box"></view>
       <view class="help-model">
         <button catchtap="chat" class="call" open-type="contact">{{language=='ZH'?'在线咨询':'Contact Customer Service'}}</button>
         <view catchtap="call" class="call">{{language=='ZH'?'电话咨询 ':'Call '}}400 800 8820</view>
       </view>
    </view>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import { activityDetail, activityOderDetail } from '../../api/index';
import { getTime } from '../../utils/filter.js';
export default class payOk extends wepy.page {
  config = {};
  components = {};

  data = {
    language: 'ZH',
    activityId: 0,
    number: 1,
    price: 0,
    option: {},
    ticketId: '',
    index: 0,
    status: '',
    isHelp: false,
    ticketNumber: '',
    orderId: '',
    overTime: ''
  };

  computed = {};

  methods = {
    navigateTo() {
      wx.navigateTo({
        url: '/pages/me/meActivity'
      });
    },
    contactHelp() {
      this.isHelp = true;
    },
    closeModel() {
      this.isHelp = false;
    },
    call() {
      wx.makePhoneCall({
        phoneNumber: '4008008820'
      });
      this.isHelp = false;
    },
    chat() {
      this.isHelp = false;
    },
    imgErr(e) {
      this.option.cover = 'http://pc1u34h1m.bkt.clouddn.com/defult.png';
    }
  };

  events = {};

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
      if (this.price > 0) {
        if (this.option.ticketInfos !== undefined) {
          for (var i = 0; i < this.option.ticketInfos.length; i++) {
            if (this.option.offlineActivityTicketResps[i].price == this.price) {
              this.ticketId = this.option.offlineActivityTicketResps[
                i
              ].offlineActivityTicketId;
            }
          }
        }
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
    });
    await activityOderDetail(this.orderId, this.language).then(res => {
      try {
        this.ticketNumber = res.orderNo;
      } catch (err) {
        this.ticketNumber = '';
      }
      if (this.language == 'ZH') {
        this.overTime = getTime.getZHymd(res.orderTime);
      } else {
        this.overTime = getTime.getENymd(res.orderTime);
      }
    });
    this.$apply();
  }

  async onShow() {}

  async onLoad(e) {
    this.activityId = e.activityId;
    this.number = Number(e.number);
    if (e.ticketId) {
      this.ticketId = e.ticketId;
    }

    if (e.totalPrice) {
      this.price = e.totalPrice / this.number;
    }
    if (e.orderStatus) {
      this.status = e.orderStatus;
    }
    if (e.orderId) {
      this.orderId = e.orderId;
    }
    this.language = wx.getStorageSync('language');
    if (this.language == 'ZH') {
      wx.setNavigationBarTitle({
        title: '报名成功'
      });
    } else {
      wx.setNavigationBarTitle({
        title: 'Book Success'
      });
    }
    await this.getData();
  }
}
</script>