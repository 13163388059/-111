<style lang="less">
.replay-box {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  z-index: 99;
  top: 0;
}

.replay-content {
  width: 100%;
  background: #ffffff;
  position: fixed;
  bottom: 0;
}

.replay-title {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  font-family: PingFangSC-Medium;
  font-size: 30rpx;
  color: #a90202;
}

.replay-area {
  width: 622rpx;
  background: #f7f7f7;
  min-height: 120rpx;
  border-radius: 10rpx;
  margin: 0 32rpx 22rpx 32rpx;
  color: #bebebe;
  font-size: 30rpx;
  position: relative;
  padding: 18rpx 32rpx 50rpx 32rpx;
}

.replay-button {
  width: 176rpx;
  height: 74rpx;
  background: #c9c9c9;
  border-radius: 10rpx;
  font-family: PingFangSC-Medium;
  font-size: 30rpx;
  color: #ffffff;
  float: right;
  line-height: 74rpx;
  text-align: center;
  margin-right: 32rpx;
  margin-bottom: 20rpx;
}

.replay-number {
  line-height: 34rpx;
  position: absolute;
  bottom: 8rpx;
  right: 16rpx;
  font-size: 24rpx;
}

.repaly-input {
  width: 100%;
  line-height: 42rpx;
  height: 126rpx;
  color: #000;
}

.closeReplay-box {
  width: 100%;
  height: 100%;
}

.is-put {
  background: #a90202;
  color: #ffffff;
}
</style>
<template>
  <view class="replay-box" >
    <view catchtap="closeReplays" class="closeReplay-box"></view>
    <view class="replay-content">
        <view class="replay-title">{{language=='ZH'?'评论':'Comment'}}</view>
        <view class="write-box">
          <view class="replay-area">
              <textarea auto-height='true' cursor-spacing='21' maxlength="300" class="repaly-input" placeholder-style="color: #BEBEBE;" fixed="true" auto-focus="true" bindinput="isPut"></textarea>
              <view class="replay-number">{{writeLength}}/300</view>
          </view>
          <view catchtap="putReplay" class="replay-button {{isPut?'is-put':''}}" >{{language=='ZH'?'发表评论':'Send Comment'}}</view>
        </view>
    </view>
  </view>
</template>
<script>
import wepy from 'wepy';
import { sendRelation } from '../api/index';

export default class writeReplay extends wepy.component {
  props = {
    replayData: Object
  };

  data = {
    isPut: false,
    writeLength: 0,
    language: 'ZH',
    description: '',
    isIos: false
  };
  events = {
    CL(status) {
      this.language = wx.getStorageSync('language');
    }
  };

  watch = {};

  methods = {
    async closeReplays() {
      this.$emit('closeReplay', false);
      this.description = '';
    },
    async putReplay() {
      if (this.description == '') {
        this.$emit('closeComment');
        return;
      }
      var that = this;
      await sendRelation(
        {
          description: this.description,
          parent_id: this.replayData.parent_id,
          relationType: this.replayData.relationType,
          production: this.replayData.production,
          relationId: this.replayData.relationId
        },
        this.language
      ).then(res => {
        if (res.status == true) {
          this.description = '';
          that.$emit('closeReplay');
        }
      });
      this.$apply();
    },
    isPut(e) {
      this.writeLength = e.detail.value.length;
      this.description = e.detail.value;
      if (e.detail.value.length >= 1) {
        this.isPut = true;
      } else {
        this.isPut = false;
      }
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