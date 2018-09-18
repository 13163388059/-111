
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
  width: 350rpx;
  float: right;
  text-align: right;
  height: 96rpx;
  color: #9b9b9b;
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
    <view class="phone-box"><view style="float:left;">{{language=='ZH'?'手机号':'Phone number'}}</view>
      <picker class="picker-box" bindchange="bindPickerChange" value="{{index}}" range="{{array}}">
             <view class="picker">{{array[index]}}</view>
      </picker>
      <input class="phone-input" bindblur="getPhone" maxlength='11' placeholder="{{language=='ZH'?'请输入手机号':'Enter the phone number'}}" value="{{importantInfo.cellphone}}"/>
      
      </view>
    <view><view class="yanzhengma-box"><input bindblur="getCode" maxlength='4' placeholder="{{language=='ZH'?'请输入验证码':'Verification code'}}" class="input"/></view><view catchtap="getYanzhen" class="get-yanzhengma">{{getYanzhen}}</view></view>
    <view catchtap="modify" class="next-btn">{{language=='ZH'?'确认修改':'Reset phone number'}}</view>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import { bind, phoneCode } from '../../api/index.js';
export default class GetPhone extends wepy.page {
  config = {};
  components = {};

  data = {
    language: 'ZH',
    newGetYanzhen: true,
    getYanzhen: '',
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
    index: 0,
    cellPhone: '',
    phoneCode: '',
    importantInfo: ''
  };

  computed = {};

  methods = {
    async getYanzhen() {
      var that = this;
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
    },
    getPhone(e) {
      this.cellPhone = e.detail.value;
    },
    getCode(e) {
      this.phoneCode = e.detail.value;
    },
    async modify() {
      var that = this;
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
      if (that.phoneCode.length == 0) {
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
          cellphone: that.cellPhone,
          phonecode: that.phoneCode
        },
        this.language
      ).then(res => {
        if (res.message == '该账号已经被绑定了,请确认!') {
          wx.showToast({
            title:
              that.language == 'ZH'
                ? '手机号已绑定'
                : 'The phone number has been bound',
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
        that.importantInfo.cellphone = that.cellPhone;
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
        title: '绑定手机号'
      });
      this.getYanzhen = '获取验证码';
    } else {
      wx.setNavigationBarTitle({
        title: 'Bind Phone Number'
      });
      this.getYanzhen = 'Send';
    }
    this.importantInfo = wx.getStorageSync('importantInfo');
  }
  onLoad() {}
}
</script>