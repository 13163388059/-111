<style lang="less">
page {
  background: #f2f2f2;
}

.tip-title,
.tip-phone {
  width: 718rpx;
  padding-left: 32rpx;
  line-height: 84rpx;
  font-size: 28rpx;
  color: #9b9b9b;
}

.feedback-box {
  width: 686rpx;
  padding: 32rpx;
  background: #ffffff;
  position: relative;
  padding-bottom: 54rpx;
  min-height: 202rpx;
}

.font-number {
  position: absolute;
  font-family: PingFangSC-Medium;
  font-size: 24rpx;
  color: #bebebe;
  bottom: 20rpx;
  right: 32rpx;
}

.phone-input {
  background: #ffffff;
  height: 100rpx;
  line-height: 100rpx;
  font-size: 28rpx;
  color: #9b9b9b;
  width: 686rpx;
  padding: 0 32rpx;
}

.put-btn {
  width: 670rpx;
  line-height: 92rpx;
  background-image: linear-gradient(-237deg, #db3069 0%, #a90202 100%);
  border-radius: 6rpx;
  text-align: center;
  color: #ffffff;
  font-family: PingFangSC-Medium;
  font-size: 32rpx;
  margin-top: 66rpx;
}

.repaly-input {
  width: 100%;
  line-height: 42rpx;
  height: 210rpx;
  color: #000;
}

.no-write {
  background: #c9c9c9;
}
</style>
<template>
  <view class="container">
    <view class="tip-title">{{language=='ZH'?'反馈':'Feedback'}}</view>
    <view class="feedback-box">
        <textarea auto-height='true' cursor-spacing='21' maxlength="300" class="repaly-input" placeholder-style="color: #BEBEBE;" fixed="true" auto-focus="{{true}}" bindinput="isPut"></textarea>
        <view class="font-number">{{writeLength}}/300</view>
    </view>
    <view class="tip-phone">{{language=='ZH'?'手机号码':'Phone number'}}</view>
    <input class="phone-input" maxlength="20" bindblur="blur" placeholder="{{language=='ZH'?'请输入':'Please enter'}}"/>
    <view catchtap="push" class="put-btn {{isPut?'':'no-write'}}">{{language=='ZH'?'提交':'Submit'}}</view>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import { report } from '../../api/index';
export default class CourseSearch extends wepy.page {
  config = {};
  components = {};

  data = {
    writeLength: 0,
    isPut: false,
    language: 'ZH',
    phone: '',
    reportContent: '',
    isIos: false
  };

  computed = {};

  methods = {
    async push() {
      var that = this;
      if (this.isPut == false) {
        return;
      }
      var myreg = /^[1][0-9]{10}$/;
      if (!myreg.test(this.phone)) {
        wx.showToast({
          title:
            that.language == 'ZH'
              ? '手机号错误'
              : 'please enter the right phone number',
          icon: 'none',
          duration: 1000,
          mask: true
        });
        return;
      }
      await report(
        {
          feedbackType: 'suggest',
          applicantCellphone: this.phone,
          description: this.reportContent
        },
        this.language
      ).then(res => {});
      wx.showToast({
        title:
          that.language == 'ZH'
            ? '反馈成功'
            : 'Feedback has been submitted successfully',
        icon: 'none',
        duration: 1000,
        mask: true
      });
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        });
      }, 1000);
    },
    isPut(e) {
      this.writeLength = e.detail.value.length;
      if (e.detail.value.length >= 1) {
        this.isPut = true;
      } else {
        this.isPut = false;
      }
      this.reportContent = e.detail.value;
    },
    blur(e) {
      this.phone = e.detail.value;
    }
  };

  events = {};
  async onShow() {
    this.language = wx.getStorageSync('language');
    if (this.language == 'ZH') {
      wx.setNavigationBarTitle({
        title: '意见反馈'
      });
    } else {
      wx.setNavigationBarTitle({
        title: 'Search Information'
      });
    }
    this.$broadcast('CL', true);
    // await this.getData();
  }
  onLoad() {
    wx.getSystemInfo({
      success: res => {
        var system = res.system.slice(0, 3);
        if (system == 'iOS') {
          this.isIos = true;
        }
      }
    });
  }
}
</script>