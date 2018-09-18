
<style lang="less">
.login {
  width: 100%;
  height: 100%;
  background: #ffffff;
}

.logo {
  width: 259rpx;
  height: 164rpx;
  margin: 163rpx 0 137rpx 248rpx;
}

.email-login {
  width: 430rpx;
  height: 92rpx;
  background-image: linear-gradient(-237deg, #db3069 0%, #a90202 100%);
  border-radius: 6rpx;
  color: #ffffff;
  text-align: center;
  line-height: 92rpx;
  font-family: PingFangSC-Medium;
  font-size: 32rpx;
  margin-left: 160rpx;
}

.wx-login {
  width: 430rpx;
  height: 88rpx;
  border-radius: 6rpx;
  text-align: center;
  line-height: 88rpx;
  font-family: PingFangSC-Medium;
  font-size: 32rpx;
  color: #a90202;
  border: 2rpx solid #a90202;
  margin-left: 160rpx;
  margin-top: 50rpx;
  padding: 0;
  background: #ffffff;
}

button ::after {
  border: 0;
}

.language-change {
  width: 686rpx;
  padding: 0 32rpx;
  font-size: 28rpx;
  text-align: right;
  margin-top: 70rpx;
  line-height: 40rpx;
  color: #000000;
}

.red {
  color: #a90202;
}
</style>
<template>
  <view class="container">
    <view  class="login">
        <image mode="aspectFill" class="logo" src="http://pc1u34h1m.bkt.clouddn.com/orrouge-logo-cn.png"></image>
        <view catchtap="emailLogin" class="email-login">{{language=='ZH'?'邮箱登录':'Email'}}</view>
        <!-- <button class="wx-login" catchtap="getAuth" >微信登录/注册</button> -->
        <!-- <button class="wx-login" open-type="getPhoneNumber" bindgetphonenumber="wxLogin">微信登录/注册</button> -->
        <view catchtap="phoneLogin" class="wx-login">{{language=='ZH'?'手机号注册':'WeChat'}}</view>
        
    </view>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';

export default class Login extends wepy.page {
  config = {};
  components = {};

  data = {
    isRed: false,
    language: 'EN'
  };

  computed = {};

  methods = {
    emailLogin() {
      wx.navigateTo({
        url: 'emailLogin'
      });
    },
    phoneLogin() {
      wx.navigateTo({
        url: 'phoneLogin'
      });
    },
    wxLogin(e) {
      // console.log(e);
    },
    getAuth() {
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {
            wx.authorize({
              scope: 'scope.userInfo',
              success() {
                // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                wx.getUserInfo();
              }
            });
          }
        }
      });
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
  }
  onLoad() {
    // wx.login({
    //   success: function(res) {
    //     if (res.code) {
    //       wx.request({
    //         url:
    //           'https://api.weixin.qq.com/sns/jscode2session?appid=wx983e758432f96ee3&secret=34540955d87d081013eeb3340c000d82&js_code=' +
    //           res.code +
    //           '&grant_type=authorization_code',
    //         success: data => {
    //           console.log(data);
    //         }
    //       });
    //     } else {
    //       console.log('登录失败！' + res.errMsg);
    //     }
    //   }
    // });
  }
}
</script>