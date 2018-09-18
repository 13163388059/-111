
<style lang="less">
.login-box {
  width: 750rpx;
}

.logo {
  width: 294rpx;
  height: 210rpx;
  margin: 80rpx 0 78rpx 230rpx;
}

.logo image {
  width: 100%;
  height: 100%;
}

.phone {
  width: 100%;
  height: 96rpx;
  line-height: 96rpx;
  border-top: 2rpx solid #ececec;
  border-bottom: 2rpx solid #ececec;
}

.phone input {
  height: 96rpx;
  width: 500rpx;
  margin-left: 32rpx;
  font-size: 28rpx;
}

.yanzhen-box {
  width: 100%;
  height: 96rpx;
  border-bottom: 2rpx solid #ececec;
}

.yanzhenma {
  width: 462rpx;
  height: 96rpx;
  padding-left: 32rpx;
  border-right: 2rpx solid #ececec;
  float: left;
}

.yanzhenma input {
  height: 96rpx;
  width: 400rpx;
  line-height: 96rpx;
  font-size: 28rpx;
}

.get-yanzhenma {
  float: left;
  width: 254rpx;
  height: 96rpx;
  line-height: 96rpx;
  font-size: 28rpx;
  color: #333333;
  text-align: center;
}

.radio-group {
  width: 100%;
  font-size: 28rpx;
  color: #4a4a4a;
  line-height: 48rpx;
  margin: 40rpx 0;
  float: left;
}

.radio {
  width: 58rpx;
  height: 48rpx;
  margin-left: 32rpx;
  margin-right: 20rpx;
  float: left;
}

.login {
  width: 670rpx;
  line-height: 92rpx;
  text-align: center;
  color: #ffffff;
  font-size: 32rpx;
  background-image: linear-gradient(-237deg, #db3069 0%, #a90202 100%);
  border-radius: 6rpx;
}

.login-tip {
  width: 640rpx;
  float: left;
}

.phone-number {
  width: 650rpx;
  float: left;
}

.picker-box {
  width: 100rpx;
  height: 96rpx;
  float: left;
  line-height: 96rpx;
  text-align: center;
  font-size: 28rpx;
  color: #9b9b9b;
}

.picker {
  width: 100rpx;
  height: 96rpx;
}
</style>
<template>
  <view class="container">
    <view class="login-box">
        <view class="logo"><image src="http://pc1u34h1m.bkt.clouddn.com/orrouge-logo-cn.png"></image></view>
        <view class="phone">
          <picker class="picker-box" bindchange="bindPickerChange" value="{{index}}" range="{{array}}">
             <view class="picker">{{array[index]}}</view>
          </picker>
          <input  class="phone-number" maxlength="11" bindblur="getPhoneData" placeholder="{{language=='ZH'?'请输入手机号':'Phone Number'}}"/></view>
        <view class="yanzhen-box">
            <view class="yanzhenma"><input maxlength="6" bindblur="getYanZhenData" placeholder="{{language=='ZH'?'请输入验证码':'Anthentication Code'}}"/></view>
            <view catchtap="getYanzhen" class="get-yanzhenma">{{getYanzhen}}</view>
        </view>
        <label class="radio-group"><radio catchtap="radioChange" class="radio" color="#A90202" checked="{{check}}"/><view class="login-tip">{{language=='ZH'?'我已阅读并同意《中欧用户协议》':'I have read and agree with《China Inroads user agreement》'}}</view></label>
        <button class="login" disabled="{{!check}}" open-type="getUserInfo" bindgetuserinfo="login">{{language=='ZH'?'登录':'Log In'}}</button>
    </view>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import { login, phoneCode } from '../api/index';

export default class phoneLogin extends wepy.page {
  config = {};
  components = {};

  data = {
    check: false,
    cellPhone: 0,
    getYanzhen: '获取验证码',
    newGetYanzhen: true,
    yanzhenma: '',
    language: 'ZH',
    correctCode: '',
    array: [
      '086',
      '030',
      '031',
      '032',
      '033',
      '034',
      '039',
      '040',
      '041',
      '043',
      '044',
      '045',
      '0223',
      '0336',
      '0338',
      '0349',
      '0350',
      '0351',
      '0352',
      '0353',
      '0354',
      '0355',
      '0356',
      '0357',
      '0358',
      '0359',
      '0396',
      '04175'
    ],
    index: 0
  };

  computed = {};

  methods = {
    login(e) {
      var that = this;
      var userInfo = e.detail.userInfo;
      var myreg = /^[1][0-9]{10}$/;
      if (!myreg.test(that.cellPhone)) {
        wx.showToast({
          title:
            that.language == 'ZH'
              ? '手机号错误'
              : 'please enter the right phone number',
          icon: 'none',
          duration: 500,
          mask: true
        });
        return;
      }
      wx.login({
        success: function(res) {
          if (that.yanzhenma.length == 0) {
            wx.showToast({
              title:
                that.language == 'ZH'
                  ? '验证码不能为空'
                  : 'The verification code can not be empty',
              icon: 'none',
              duration: 1000,
              mask: true
            });
            return;
          }
          if (res.code) {
            if (wx.getStorageSync('isPhoneLogin') == true) {
              login({
                jsCode: res.code,
                cellphone: that.cellPhone,
                phoneCode: that.yanzhenma,
                apply_phone: that.array[that.index]
              }).then(res => {
                if (res.message == '该手机号已经注册过了，请直接登录') {
                  wx.showToast({
                    title:
                      that.language == 'ZH'
                        ? '手机号已被绑定'
                        : 'The phone number has been bound',
                    icon: 'none',
                    duration: 1000,
                    mask: true
                  });
                  return;
                } else if (res.message == '手机验证码错误') {
                  wx.showToast({
                    title:
                      that.language == 'ZH'
                        ? '验证码错误'
                        : 'Verification code error',
                    icon: 'none',
                    duration: 500,
                    mask: true
                  });
                  return;
                } else if (res.message == '用户不存在') {
                  wx.showToast({
                    title:
                      that.language == 'ZH'
                        ? '用户不存在'
                        : 'user does not exist',
                    icon: 'none',
                    duration: 500,
                    mask: true
                  });
                  return;
                }
                wx.setStorageSync('importantInfo', res);
                wx.navigateBack({
                  delta: 2
                });
              });
            } else {
              login({
                jsCode: res.code,
                nickname: userInfo.nickName,
                sex: userInfo.gender,
                country:
                  that.language == 'ZH'
                    ? userInfo.country == 'China' ? '中国' : userInfo.country
                    : userInfo.country,
                cellphone: that.cellPhone,
                company: '',
                position: '',
                headImgUrl: userInfo.avatarUrl,
                phoneCode: that.yanzhenma,
                apply_phone: that.array[that.index]
              }).then(res => {
                if (res.message == '该手机号已经注册过了，请直接登录') {
                  wx.showToast({
                    title:
                      that.language == 'ZH'
                        ? '手机号已被绑定'
                        : 'The phone number has been bound',
                    icon: 'none',
                    duration: 1000,
                    mask: true
                  });
                  return;
                } else if (res.message == '手机验证码错误') {
                  wx.showToast({
                    title:
                      that.language == 'ZH'
                        ? '验证码错误'
                        : 'Verification code error',
                    icon: 'none',
                    duration: 500,
                    mask: true
                  });
                  return;
                }
                if (res.message) {
                  return;
                }
                wx.setStorageSync('importantInfo', res);
                wx.setStorageSync('isPhoneLogin', true);
                wx.navigateBack({
                  delta: 2
                });
              });
            }
          } else {
            wx.showToast({
              title: that.language == 'ZH' ? '登录失败' : 'Log fail',
              icon: 'none',
              duration: 1000,
              mask: true
            });
          }
        }
      });
    },
    radioChange(e) {
      if (this.check == true) {
        this.check = false;
      } else {
        this.check = true;
      }
    },
    getPhoneData(e) {
      this.cellPhone = e.detail.value;
    },
    getYanZhenData(e) {
      this.yanzhenma = e.detail.value;
    },
    async getYanzhen() {
      if (this.newGetYanzhen == false) return;
      this.newGetYanzhen = false;
      var number = 60;
      await phoneCode(
        this.array[this.index],
        this.cellPhone,
        this.language
      ).then(res => {
        console.log(res);
      });
      var time = () => {
        setTimeout(() => {
          if (number < 0) {
            this.newGetYanzhen = true;
            if (this.language == 'ZH') {
              this.getYanzhen = '获取验证码';
            } else {
              this.getYanzhen = 'Send';
            }
            this.$apply();
            return;
          }
          this.getYanzhen = number + 's';
          this.$apply();
          number--;
          time();
        }, 1000);
      };
      time();
    },
    bindPickerChange(e) {
      this.index = e.detail.value;
    }
  };

  events = {};

  init() {
    this.language = wx.getStorageSync('language');
    if (this.language == 'EN') {
      wx.setNavigationBarTitle({
        title: 'Log In'
      });
      this.getYanzhen = 'Send';
    } else {
      wx.setNavigationBarTitle({
        title: '登录'
      });
      this.getYanzhen = '获取验证码';
    }
    this.yanzhenma = '';
    this.cellPhone = '';
    this.check = false;
  }
  onShow() {
    this.init();
  }
  onLoad() {}
}
</script>