
<style lang="less">
page {
  background: #f2f2f2;
}

.pay-content {
  width: 100%;
  height: 242rpx;
  text-align: center;
}

.pay-name {
  height: 44rpx;
  font-size: 32rpx;
  color: #4a4a4a;
  margin-top: 32rpx;
}

.pay-money {
  line-height: 100rpx;
  font-family: PingFangSC-Medium;
  font-size: 72rpx;
  color: #000000;
  margin-top: 26rpx;
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
  color: #757575;
  background: #ffffff;
}

.last-text {
  float: right;
  color: #333333;
}

.wx-pay {
  width: 686rpx;
  height: 96rpx;
  margin: 36rpx 32rpx 0 32rpx;
  line-height: 96rpx;
  text-align: center;
  background: #46c01b;
  border-radius: 10rpx;
  color: #ffffff;
  font-size: 32rpx;
}
</style>
<template>
  <view class="container">
    <view class="pay-content">
        <view class="pay-name">{{option.name}}</view>
        <view class="pay-money">¥{{price*number/100}}</view>
    </view>
    <view class="information-list information-list-content">{{language=='ZH'?'收款方':'Payee'}}<text class="last-text">{{language=='ZH'?'中欧商道':'Or Rouge'}}</text></view>
    <view class="wx-pay" catchtap="navigateTo">{{language=='ZH'?'微信支付':'Wechat Pay'}}</view>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import { activityDetail, putOder, pay } from '../../api/index';

export default class oderPay extends wepy.page {
  config = {};
  components = {};

  data = {
    language: 'ZH',
    ticketId: '',
    number: 1,
    activityId: 0,
    price: 0,
    index: 0,
    option: [],
    userInfo: [],
    orderNo: '',
    isPayOk: false,
    pageNumber: 0
  };

  computed = {};

  methods = {
    navigateTo() {
      var that = this;
      if (this.orderNo == '') {
        putOder(
          {
            goodsId: this.activityId,
            goodsType: 'ACTIVITY',
            couponOrNot: 'no',
            // paymentType: 'wechat_self',
            paymentType: 'WX_MINI',
            quantity: this.number,
            ticketId: this.ticketId,
            remark1: this.userInfo.remark1,
            remark2: this.userInfo.remark2,
            remark3: this.userInfo.remark3,
            remark4: this.userInfo.remark4,
            remark5: this.userInfo.remark5,
            apply_phone: this.userInfo.apply_phone
          },
          that.language
        ).then(res => {
          if (res.orderNo) {
            pay(
              {
                order_no: res.orderNo,
                channel: 'wx_mini'
              },
              that.language
            ).then(res => {
              if (res.status == true) {
                that.isPayOk = true;
                wx.showToast({
                  title: that.language == 'ZH' ? '购买成功' : 'Payment success',
                  icon: 'success',
                  duration: 1000,
                  mask: true
                });
                setTimeout(() => {
                  wx.navigateTo({
                    url:
                      '/pages/activity/payOk?activityId=' +
                      this.activityId +
                      '&number=' +
                      this.number +
                      '&ticketId=' +
                      this.ticketId
                  });
                }, 1000);
              }
              if (res.failureMsg == '成功') {
                wx.requestPayment({
                  timeStamp: res.credential.wx.timeStamp,
                  nonceStr: res.credential.wx.nonceStr,
                  package: res.credential.wx.package,
                  signType: res.credential.wx.signType,
                  paySign: res.credential.wx.paySign,
                  success: function(res) {
                    if (res.errMsg == 'requestPayment:ok') {
                      that.isPayOk = true;
                      wx.showToast({
                        title:
                          that.language == 'ZH'
                            ? '购买成功'
                            : 'Payment success',
                        icon: 'success',
                        duration: 1000,
                        mask: true
                      });
                      setTimeout(() => {
                        wx.navigateTo({
                          url:
                            '/pages/activity/payOk?activityId=' +
                            that.activityId +
                            '&number=' +
                            that.number +
                            '&ticketId=' +
                            that.ticketId
                        });
                      }, 1000);
                    }
                  },
                  fail: function(res) {
                    console.log(res);
                  }
                });
              }
            });
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none',
              duration: 1000,
              mask: true
            });
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/activity'
              });
            }, 1000);
          }
        });
      } else {
        pay(
          {
            order_no: this.orderNo,
            channel: 'wx_mini'
          },
          that.language
        ).then(res => {
          if (res.status == true) {
            that.isPayOk = true;
            wx.showToast({
              title: that.language == 'ZH' ? '购买成功' : 'Payment success',
              icon: 'success',
              duration: 1000,
              mask: true
            });
            setTimeout(() => {
              wx.navigateTo({
                url:
                  '/pages/activity/payOk?activityId=' +
                  that.activityId +
                  '&number=' +
                  that.number +
                  '&ticketId=' +
                  that.ticketId
              });
            }, 1000);
          }
          if (res.failureMsg == '成功') {
            wx.requestPayment({
              timeStamp: res.credential.wx.timeStamp,
              nonceStr: res.credential.wx.nonceStr,
              package: res.credential.wx.package,
              signType: res.credential.wx.signType,
              paySign: res.credential.wx.paySign,
              success: function(res) {
                if (res.errMsg == 'requestPayment:ok') {
                  that.isPayOk = true;
                  wx.showToast({
                    title:
                      that.language == 'ZH' ? '购买成功' : 'Payment success',
                    icon: 'success',
                    duration: 1000,
                    mask: true
                  });
                  setTimeout(() => {
                    wx.navigateTo({
                      url:
                        '/pages/activity/payOk?activityId=' +
                        this.activityId +
                        '&number=' +
                        this.number +
                        '&ticketId=' +
                        this.ticketId
                    });
                  }, 1000);
                }
              },
              fail: function(res) {
                console.log(res);
              }
            });
          }
        });
      }
    }
  };

  events = {};
  async getData() {
    await activityDetail(this.activityId, this.language).then(res => {
      this.option = res;
      if (this.price > 0) {
        if (this.option.ticketInfos !== undefined) {
          for (var i = 0; i < this.option.ticketInfos.length; i++) {
            if (this.option.ticketInfos[i].price == this.price) {
              this.ticketId = this.option.ticketInfos[i].ticketId;
            }
          }
        }
      }
      if (this.option.ticketInfos !== undefined) {
        for (var i = 0; i < this.option.ticketInfos.length; i++) {
          if (this.option.ticketInfos[i].ticketId == this.ticketId) {
            this.price = this.option.ticketInfos[i].price;
            this.index = i;
          }
        }
      }
      this.$apply();
    });
  }
  async onShow() {
    this.pageNumber++;
    if (this.isPayOk == true && this.pageNumber == 3) {
      var pages = getCurrentPages();
      wx.navigateBack({
        delta: pages.length - 1
      });
    }
  }

  async onLoad(e) {
    this.pageNumber = 0;
    this.activityId = e.activityId;
    this.number = Number(e.number);
    if (e.ticketId) {
      this.ticketId = e.ticketId;
    }
    if (e.orderNo) {
      this.orderNo = e.orderNo;
    }
    if (e.totalPrice) {
      this.totalPrice = e.totalPrice;
      this.price = this.totalPrice / this.number;
    }
    this.language = wx.getStorageSync('language');
    this.userInfo = wx.getStorageSync('userInfo');
    if (this.language == 'ZH') {
      wx.setNavigationBarTitle({
        title: '确认交易'
      });
    } else {
      wx.setNavigationBarTitle({
        title: 'Confirm Payment'
      });
    }
    await this.getData();
  }
}
</script>