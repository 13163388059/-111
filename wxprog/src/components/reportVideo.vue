<style lang="less">
.report-box {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
}

.report-tip {
  width: 632rpx;
  margin: 278rpx 0 0 60rpx;
  background: #ffffff;
  border-radius: 10rpx;
  float: left;
}

.report-title {
  width: 100%;
  line-height: 42rpx;
  font-family: PingFangSC-Medium;
  font-size: 30rpx;
  color: #4a4a4a;
  margin: 36rpx 0 22rpx 0;
  text-align: center;
  float: left;
}

.report-content {
  font-family: PingFangSC-Medium;
  font-size: 28rpx;
  color: #4a4a4a;
  width: 504rpx;
  min-height: 120rpx;
  border-radius: 10rpx;
  background: #f7f7f7;
  float: left;
  margin-left: 42rpx;
  line-height: 40rpx;
  padding: 22rpx;
  position: relative;
}

.report-number {
  font-family: PingFangSC-Medium;
  font-size: 24rpx;
  color: #bebebe;
  position: absolute;
  right: 18rpx;
  bottom: 10rpx;
}

.btn-cancel {
  width: 166rpx;
  height: 70rpx;
  border: 2rpx solid #9b9b9b;
  border-radius: 10rpx;
  font-family: PingFangSC-Medium;
  font-size: 30rpx;
  color: #9b9b9b;
  text-align: center;
  line-height: 74rpx;
  margin: 34rpx 78rpx 20rpx 112rpx;
  float: left;
}

.btn-confirm {
  width: 166rpx;
  height: 74rpx;
  border-radius: 10rpx;
  font-family: PingFangSC-Medium;
  font-size: 30rpx;
  color: #9b9b9b;
  text-align: center;
  line-height: 74rpx;
  float: left;
  margin-top: 34rpx;
  margin-bottom: 20rpx;
  color: #ffffff;
  background: #a90202;
}

.report-ok {
  width: 632rpx;
  height: 230rpx;
  margin: 278rpx 0 0 60rpx;
  background: #ffffff;
  border-radius: 10rpx;
}

.ok-title {
  width: 100%;
  line-height: 42rpx;
  margin: 44rpx 0 24rpx 0;
  text-align: center;
  font-family: PingFangSC-Medium;
  font-size: 30rpx;
  color: #4a4a4a;
  float: left;
}

.ok-tip {
  width: 100%;
  line-height: 36rpx;
  font-family: PingFangSC-Medium;
  font-size: 26rpx;
  color: #9b9b9b;
  text-align: center;
}

.isReport {
  width: 100%;
  height: 100%;
}
.navToReport {
  width: 100%;
  height: 96rpx;
  font-size: 28rpx;
  color: #4a4a4a;
  line-height: 96rpx;
  position: fixed;
  bottom: 0;
  text-align: center;
  background: #ffffff;
}

.repaly-input {
  width: 100%;
  line-height: 42rpx;
  height: 126rpx;
  color: #000;
}
</style>
<template>
  <view class="report-box">
    <view wx:if="{{isWrite==2}}" class="report-tip">
        <view class="report-title">{{language=='ZH'?'举报原因':'Reason for reporting'}}</view>
        <view class="report-content">
            <textarea auto-height='true' cursor-spacing='21' placeholder="" maxlength="300" class="repaly-input" placeholder-style="color: #BEBEBE;" fixed="true" auto-focus="{{true}}" bindinput="isPut"></textarea>
            <view class="report-number">{{writeLength}}/300</view>
        </view>
        <view catchtap="cancal" class="btn-cancel">{{language=='ZH'?'取消':'Cnacel'}}</view>
        <view catchtap="confirm" class="btn-confirm">{{language=='ZH'?'确认':'Confirm'}}</view>
    </view>
    <view wx:if="{{isWrite==3}}" class="report-ok">
        <view class="ok-title">{{language=='ZH'?'举报成功':'Report has been sent'}}</view>
        <view class="ok-tip">{{language=='ZH'?'你的举报已发送成功，我们会认真进行审核。':'Your report has been sent successfully, we will seriously review it.'}}</view>
        <view class="ok-tip">{{language=='ZH'?'谢谢!':'Thank you!'}}</view>
    </view>
  </view>
</template>
<script>
import wepy from 'wepy';
import { report } from '../api/index.js';

export default class ReportVideo extends wepy.component {
  props = {};

  data = {
    isWrite: 2,
    language: 'ZH',
    writeLength: 0,
    reportId: 0,
    reportContent: '',
    title: '',
    isIos: false
  };
  events = {
    CL(status) {
      this.language = wx.getStorageSync('language');
    },
    reportVideo(reportId, title) {
      this.isWrite = 2;
      this.reportId = reportId;
      this.title = title;
    }
  };

  watch = {};

  methods = {
    isReport() {
      this.isWrite = 2;
    },
    cancal() {
      this.$emit('closeReportVideo', false);
    },
    async confirm() {
      if (this.reportContent == '') {
        this.$emit('closeReportVideo', true);
        return;
      }
      this.isWrite = 3;
      await report(
        {
          targetId: this.reportId,
          targetType: 'course',
          feedbackType: 'report_course',
          description: this.reportContent,
          title: this.title
        },
        this.language
      ).then(res => {
        this.reportContent = '';
      });
      setTimeout(() => {
        this.$emit('closeReportVideo', true);
      }, 1000);
      this.$apply();
    },
    isPut(e) {
      this.writeLength = e.detail.value.length;
      if (e.detail.value.length >= 1) {
        this.isPut = true;
      } else {
        this.isPut = false;
      }
      this.reportContent = e.detail.value;
    }
  };
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