<style lang="less">
page {
  background: #f2f2f2;
}
.phone-box {
  width: 660rpx;
  height: 96rpx;
  line-height: 96rpx;
  padding: 0 50rpx 0 40rpx;
  font-size: 28rpx;
  color: #333333;
  background: #ffffff;
  border-bottom: 2rpx solid #ececec;
}

.phone-box text {
  float: right;
  color: #666666;
}

.yanzhengma-box {
  width: 428rpx;
  height: 96rpx;
  line-height: 96rpx;
  padding: 0 26rpx 0 40rpx;
  font-size: 28rpx;
  color: #333333;
  background: #ffffff;
  border-bottom: 2rpx solid #ececec;
  float: left;
}

.get-yanzhengma {
  width: 254rpx;
  height: 96rpx;
  float: left;
  border-bottom: 2rpx solid #ececec;
  border-left: 2rpx solid #ececec;
  font-size: 28rpx;
  color: #333333;
  line-height: 96rpx;
  text-align: center;
  background: #ffffff;
}

.input {
  width: 100%;
  height: 96rpx;
  float: left;
  text-align: right;
}

.next-btn {
  width: 670rpx;
  height: 92rpx;
  line-height: 92rpx;
  text-align: center;
  background-image: linear-gradient(-237deg, #db3069 0%, #a90202 100%);
  border-radius: 6rpx;
  font-size: 32rpx;
  color: #ffffff;
  margin: auto;
  margin-top: 40rpx;
  color: #ffffff;
}

.phone-input {
  width: 450rpx;
  float: right;
  text-align: right;
  height: 96rpx;
}
</style>
<template>
  <view class="container">
    <view class="phone-box">{{language=='ZH'?'邮箱':'Email'}}
      <input class="phone-input" bindblur="getEmail" maxlength='30' placeholder="{{language=='ZH'?'请输入邮箱':'Enter the email'}}" value="{{importantInfo.userName}}"/>
      </view>
    <view><view class="yanzhengma-box"><input bindblur="getCode" maxlength='6' placeholder="{{language=='ZH'?'请输入验证码':'Verification code'}}" class="input"/></view><view catchtap="getYanzhen" class="get-yanzhengma">{{getYanzhen}}</view></view>
    <view catchtap="modify" class="next-btn">{{language=='ZH'?'确认修改':'Reset email'}}</view>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import { bind, emailCode } from '../../api/index.js';
export default class GetPhone extends wepy.page {
  config = {};
  components = {};

  data = {
    language: 'ZH',
    newGetYanzhen: true,
    getYanzhen: '',
    email: '',
    emailCode: '',
    importantInfo: '',
  };

  computed = {};

  methods = {
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
      if (this.newGetYanzhen == false) return;
      this.newGetYanzhen = false;
      var number = 60;
      await emailCode(this.email, this.language).then(res => {
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
    getEmail(e) {
      this.email = e.detail.value;
    },
    getCode(e) {
      this.emailCode = e.detail.value;
    },
    async modify() {
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
      if (that.emailCode.length == 0) {
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
      await bind(
        {
          username: that.email,
          validateCode: that.emailCode
        },
        this.language
      ).then(res => {
        if (res.message == '该账号已经被绑定了,请确认!') {
          wx.showToast({
            title:
              that.language == 'ZH' ? '邮箱已绑定' : 'The email has been bound',
            icon: 'none',
            duration: 1000,
            mask: true
          });
          return;
        }
        if (res.message == '登录错误,请检查验证码或密码') {
          wx.showToast({
            title:
              that.language == 'ZH' ? '验证码错误' : 'Verification code error',
            icon: 'none',
            duration: 1000,
            mask: true
          });
          return;
        }
        wx.showToast({
          title: that.language == 'ZH' ? '绑定成功' : 'Bound success',
          icon: 'success',
          duration: 500,
          mask: true
        });
        that.importantInfo.userName = that.email;
        wx.setStorageSync('importantInfo', that.importantInfo);
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          });
        }, 500);
      });
    }
  };

  events = {};
  async onShow() {
    this.language = wx.getStorageSync('language');
    if (this.language == 'ZH') {
      wx.setNavigationBarTitle({
        title: '绑定邮箱'
      });
      this.getYanzhen = '获取验证码';
    } else {
      wx.setNavigationBarTitle({
        title: 'Bind Email'
      });
      this.getYanzhen = 'Send';
    }
    this.importantInfo = wx.getStorageSync('importantInfo');
    var myreg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    if (!myreg.test(this.importantInfo.userName)) {
      this.importantInfo.userName = '';
    }
  }
  onLoad() {}
}
</script>