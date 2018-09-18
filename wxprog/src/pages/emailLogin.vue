
<style lang="less">
.logo {
  width: 294rpx;
  height: 210rpx;
  margin: 80rpx 0 79rpx 230rpx;
  line-height: 210rpx;
  float: left;
}

.email-login {
  width: 100%;
  height: 100%;
  background: #fff;
}

.input {
  width: 718rpx;
  height: 92rpx;
  font-size: 28rpx;
  color: #9b9b9b;
  border-top: 2rpx solid #ececec;
  padding-left: 32rpx;
}

.password {
  border-bottom: 2rpx solid #ececec;
}

.is-sollect {
  width: 100%;
  font-size: 28rpx;
  color: #4a4a4a;
  line-height: 48rpx;
  margin-top: 54rpx;
  float: left;
}

.radio {
  width: 58rpx;
  height: 48rpx;
  margin-left: 32rpx;
  margin-right: 20rpx;
  float: left;
}

.login-btn {
  width: 670rpx;
  height: 92rpx;
  margin-left: 40rpx;
  background-image: linear-gradient(-237deg, #db3069 0%, #a90202 100%);
  border-radius: 6rpx;
  text-align: center;
  line-height: 92rpx;
  color: #fff;
  margin-top: 44rpx;
  float: left;
  padding: 0;
}

.miss-password {
  line-height: 40rpx;
  font-size: 28rpx;
  color: #9b9b9b;
  float: right;
  padding-right: 40rpx;
  padding-top: 20rpx;
}

.login-tip {
  width: 640rpx;
  float: left;
}

button::after {
  border: 0;
}
</style>
<template>
  <view class="container">
    <view class="email-login">
      <image  mode="aspectFill" class="logo" src="http://pc1u34h1m.bkt.clouddn.com/orrouge-logo-cn.png"></image>
      <input class="input" bindblur="putEmail" placeholder="{{language=='ZH'?'请输入邮箱':'Email'}}"/>
      <input class="input password" bindblur="putPassword" type="password" placeholder="{{language=='ZH'?'请输入密码':'Password'}}"/>
      <label class="is-sollect"><radio catchtap="isRead" class="radio" color="#A90202" checked="{{isRead}}"/><view class="login-tip">{{language=='ZH'?'我已阅读并同意《中欧用户协议》':'I have read and agree with《China Inroads user agreement》'}}</view></label>
      <!-- <view catchtap="login" class=" ">{{language=='ZH'?'登录':'Log In'}}</view> -->
      <button catchtap="login" class="login-btn" disabled="{{!isRead}}" >{{language=='ZH'?'登录':'Log In'}}</button>
      <view catchtap="navTo" class="miss-password">{{language=='ZH'?'忘记密码':'Forgot Password?'}}</view>
    </view> 
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import { emailLogin } from '../api/index.js';
export default class EmailLogin extends wepy.page {
  config = {};
  components = {};

  data = {
    isRead: false,
    language: 'ZH',
    email: '',
    password: ''
  };

  computed = {};

  methods = {
    isRead() {
      if (this.isRead == true) {
        this.isRead = false;
      } else {
        this.isRead = true;
      }
    },
    navTo() {
      wx.navigateTo({
        url: 'missPassword'
      });
    },
    async login() {
      var that = this;
      var myreg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (!myreg.test(this.email)) {
        wx.showToast({
          title:
            that.language == 'ZH'
              ? '邮箱错误'
              : 'Please enter valid Email address',
          icon: 'none',
          duration: 1000,
          mask: true
        });
        return;
      }
      wx.login({
        success: function(res) {
          if (res.code) {
            emailLogin(
              {
                jsCode: res.code,
                username: that.email,
                password: that.password
              },
              that.language
            ).then(res => {
              if (res.message == '登录错误,请检查验证码或密码') {
                wx.showToast({
                  title:
                    that.language == 'ZH'
                      ? '密码错误,登录失败'
                      : 'Password error, login failed',
                  icon: 'none',
                  duration: 1000,
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
              } else if (res.status == 500) {
                wx.showToast({
                  title: that.language == 'ZH' ? '登录失败' : 'Login fail',
                  icon: 'none',
                  duration: 500,
                  mask: true
                });
                return;
              }
              if (res.token !== '' && res.token !== undefined) {
                wx.setStorageSync('importantInfo', res);
                wx.setStorageSync('isEmailLogin', true);
                wx.navigateBack({
                  delta: 2
                });
              }
            });
          }
        }
      });
    },
    putEmail(e) {
      this.email = e.detail.value;
    },
    putPassword(e) {
      this.password = e.detail.value;
    }
  };

  events = {};
  init() {
    this.language = wx.getStorageSync('language');
    if (this.language == 'EN') {
      wx.setNavigationBarTitle({
        title: 'Log In'
      });
    } else {
      wx.setNavigationBarTitle({
        title: '登录'
      });
    }
  }
  onShow() {
    this.init();
    this.isRead = false;
  }
  onLoad() {}
}
</script>