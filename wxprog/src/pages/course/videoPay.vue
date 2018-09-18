
<style lang="less">
page {
  background: #f2f2f2;
}
.information-list {
  width: 670rpx;
  height: 108rpx;
  padding: 0 40rpx;
  background: #f2f2f2;
  border-bottom: 2rpx solid #ececec;
  line-height: 108rpx;
  font-size: 30rpx;
  color: #9b9b9b;
  background: #ffffff;
}

.information-list-content {
  color: #757575;
  background: #ffffff;
}

.last-text {
  float: right;
  color: #4a4a4a;
}

.pay-tip {
  width: 686rpx;
  padding: 38rpx 32rpx 38rpx 32rpx;
}

.tip-title {
  width: 100%;
  line-height: 44rpx;
  margin-bottom: 16rpx;
  font-size: 32rpx;
  color: #9b9b9b;
}

.tip-content {
  line-height: 54rpx;
  color: #9b9b9b;
  font-size: 24rpx;
}

.to-pay {
  position: fixed;
  width: 100%;
  height: 96rpx;
  background: #a90202;
  color: #ffffff;
  line-height: 96rpx;
  text-align: center;
  bottom: 0;
}
</style>
<template>
  <view class="container">
    <view class="information-list information-list-content">{{language=='ZH'?'课程':'Course'}}<text class="last-text">{{option.name}}</text></view>
    <view class="information-list information-list-content">{{language=='ZH'?'课时':'Time'}}
      <view class="last-text text-time">{{language=='ZH'?'预计更新'+option.allResourceDuration+'个小时(已更新'+nowTime+'小时)':'Expected '+option.allResourceDuration+' hours ('+nowTime+' hours updated)'}}</view></view>
    <view class="information-list information-list-content">{{language=='ZH'?'价格':'Price'}}<text class="last-text" style="color:#007AFF;">{{option.price/100}}</text></view>
    <view class="information-list information-list-content">{{language=='ZH'?'付款方式':'Payment Method'}}<text class="last-text" style="color:#4DD964;">{{language=='ZH'?'微信支付':'WeChat Payment'}}</text></view>
    <view class="pay-tip">
        <view class="tip-title">{{language=='ZH'?'温馨提示':'Tips'}}:</view>
        <view class="tip-content">啊来看房活动撒了都快放假了爱上了；的风景啊是；阿什顿飞啊；就；拉上的纠纷；啊睡觉地方；啊手机发的；安静；啊介绍的；垃圾啊说说</view>
    </view>
    <view catchtap="toPay" class="to-pay">{{language=='ZH'?'去支付':'Pay'}}</view>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import { courseDetail, pay, putOder } from '../../api/index';
export default class videoPay extends wepy.page {
  config = {};
  components = {};

  data = {
    courseId: '',
    option: {},
    orderNo: '',
    language: 'ZH',
    courseId: '',
    nowTime: 0
  };

  computed = {};

  methods = {
    toPay() {
      var that = this;
      if (this.orderNo == '') {
        putOder(
          {
            goodsId: this.courseId,
            goodsType: 'course',
            couponOrNot: 'no',
            // paymentType: 'wechat_self',
            paymentType: 'WX_MINI'
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
                wx.showToast({
                  title: that.language == 'ZH' ? '购买成功' : 'Payment success',
                  icon: 'success',
                  duration: 1000,
                  mask: true
                });
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 1
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
                        wx.navigateBack({
                          delta: 1
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
        });
      } else {
        pay(
          {
            order_no: this.orderNo,
            channel: 'wx_mini'
          },
          that.language
        ).then(res => {
          if (res.failureMsg == '成功') {
            wx.requestPayment({
              timeStamp: res.credential.wx.timeStamp,
              nonceStr: res.credential.wx.nonceStr,
              package: res.credential.wx.package,
              signType: res.credential.wx.signType,
              paySign: res.credential.wx.paySign,
              success: function(res) {
                if (res.errMsg == 'requestPayment:ok') {
                  wx.showToast({
                    title:
                      that.language == 'ZH' ? '购买成功' : 'Payment success',
                    icon: 'success',
                    duration: 1000,
                    mask: true
                  });
                  setTimeout(() => {
                    wx.redirectTo({
                      url: '/pages/course/courseVideoDetail?id=' + this.courseId
                    });
                  }, 1000);
                }
                console.log(res);
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
  async init() {
    this.language = wx.getStorageSync('language');
    await courseDetail(this.courseId, this.language).then(res => {
      var time = 0;
      this.option = res;
      this.option.allResourceDuration = (
        this.option.allResourceDuration /
        1000 /
        60 /
        60
      ).toFixed(1);
      for (var i = 0; i < this.option.resourceResps.length; i++) {
        time += this.option.resourceResps[i].resourceDuration;
      }
      this.nowTime = (time / 1000 / 60 / 60).toFixed(1);
    });
    wx.setNavigationBarTitle({
      title: this.language == 'ZH' ? '确认支付' : 'Confirm Payment'
    });
    this.$apply();
  }
  async onShow() {}
  async onLoad(e) {
    if (e.id) {
      this.courseId = e.id;
    }
    if (e.orderNo) {
      this.orderNo = e.orderNo;
    }
    await this.init();
  }
}
</script>