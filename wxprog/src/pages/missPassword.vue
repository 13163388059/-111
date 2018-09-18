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
}

.miss-password {
  line-height: 40rpx;
  font-size: 28rpx;
  color: #9b9b9b;
  float: right;
  padding-right: 40rpx;
  padding-top: 20rpx;
}

.yanzhen {
  width: 462rpx;
  float: left;
}

.get-yanzhen {
  float: left;
  width: 258rpx;
  height: 96rpx;
  border: 2rpx solid #ececec;
  border-right: 0;
  border-bottom: 0;
  font-size: 28rpx;
  color: #333333;
  line-height: 96rpx;
  position: absolute;
  right: 0;
  top: 0;
  text-align: center;
}

.yanzhen-box {
  width: 100%;
  height: 100rpx;
  position: relative;
}
</style>
<template>
  <view class="container">
    <view class="email-login">
      <image  mode="aspectFill" class="logo" src="http://pc1u34h1m.bkt.clouddn.com/orrouge-logo-cn.png"></image>
      <input class="input" bindblur="emailInput" placeholder="{{language=='ZH'?'请输入邮箱账号':'Email'}}"/>
      <view class="yanzhen-box"><input class="input yanzhen" bindblur="yanzhenma" placeholder="{{language=='ZH'?'请输入验证码':'Anthentication Code'}}"/><view catchtap="getYanzhen" class="get-yanzhen">{{getYanzhen}}</view></view>
      <input class="input password" bindblur="newPassword" placeholder="{{language=='ZH'?'请输入新密码':'New Password'}}"/>
      <view catchtap="navTo" class="login-btn">{{language=='ZH'?'确认修改':'Reset Password'}}</view>
    </view>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import { findPassword, emailCode } from '../api/index.js';
export default class MissPassword extends wepy.page {
  config = {};
  components = {};

  data = {
    isRead: false,
    language: 'ZH',
    getYanzhen: '',
    email: '',
    newGetYanzhen: true,
    newPassword: '',
    rightYanzhenma: ''
  };

  computed = {};

  methods = {
    isRead() {
      this.isRead = !this.isRead;
    },
    async navTo() {
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
      if (this.newPassword == '') {
        wx.showToast({
          title:
            that.language == 'ZH'
              ? '新密码不能为空'
              : 'New password can not be empty',
          icon: 'none',
          duration: 1000,
          mask: true
        });
        return;
      }
      if (this.rightYanzhenma.length == 0) {
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
      await findPassword(
        {
          username: this.email,
          validateCode: this.rightYanzhenma,
          password: this.newPassword
        },
        this.language
      ).then(res => {
        if (res.status == true) {
          wx.showToast({
            title: that.language == 'ZH' ? '修改成功' : 'Amend the success',
            icon: 'success',
            duration: 1000,
            mask: true
          });
          setTimeout(res => {
            wx.navigateBack({
              delta: 1
            });
          }, 1000);
        } else {
          if (res.message == '验证码错误') {
            wx.showToast({
              title:
                that.language == 'ZH'
                  ? '验证码错误'
                  : 'Verification code error',
              icon: 'none',
              duration: 1000,
              mask: true
            });
          }
        }
      });
    },
    emailInput(e) {
      this.email = e.detail.value;
    },
    async getYanzhen() {
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
      await emailCode(this.email, this.language).then(res => {
        console.log(res);
      });
      if (this.newGetYanzhen == false) return;
      this.newGetYanzhen = false;
      var number = 60;
      // await phoneCode(this.cellPhone, this.language).then(res => {
      //   console.log(res);
      // });
      var time = () => {
        setTimeout(() => {
          if (number < 0) {
            this.newGetYanzhen = true;
            if (this.language == 'ZH') {
              this.getYanzhen = '发送验证码到邮箱';
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
    newPassword(e) {
      this.newPassword = e.detail.value;
    },
    yanzhenma(e) {
      this.rightYanzhenma = e.detail.value;
    }
  };

  events = {};
  onShow() {
    this.language = wx.getStorageSync('language');
    this.email = '';
    this.newPassword = '';
    this.rightYanzhenma = '';
    if (this.language == 'EN') {
      wx.setNavigationBarTitle({
        title: 'Reset Password'
      });
      this.getYanzhen = 'Send';
    } else {
      wx.setNavigationBarTitle({
        title: '修改密码'
      });
      this.getYanzhen = '发送验证码到邮箱';
    }
  }
  onLoad() {}
}
</script>