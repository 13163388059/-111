<style lang="less">
.activity-box {
  width: 750rpx;
}

.activity-list {
  width: 686rpx;
  margin-left: 32rpx;
  padding: 34rpx 32rpx 28rpx 0;
  border-bottom: 2rpx solid #e5e3e3;
  float: left;
}

.activity-list:last-child {
  border: 0;
}

.list-img {
  width: 260rpx;
  height: 156rpx;
  float: left;
  border-radius: 8rpx;
}

.list-right {
  width: 402rpx;
  margin-left: 25rpx;
  float: left;
}

.list-title {
  font-size: 28rpx;
  color: #000000;
  width: 100%;
  line-height: 40rpx;
}

.list-area {
  width: 100%;
  line-height: 34rpx;
  font-size: 24rpx;
  color: #4a4a4a;
  margin-top: 8rpx;
}

.list-area image {
  width: 22rpx;
  height: 28rpx;
  float: left;
  padding-right: 8rpx;
  padding-top: 3rpx;
}

.list-time {
  width: 100%;
  line-height: 54rpx;
  font-size: 22rpx;
  color: #999999;
  margin-top: 6rpx;
}

.state-pay {
  padding: 0 24rpx;
  float: right;
  border: 2rpx solid #a90202;
  color: #a90202;
  line-height: 50rpx;
  border-radius: 8rpx;
  font-size: 24rpx;
}

.state-audit {
  font-size: 24rpx;
  color: #a90202;
  float: right;
}

.state-cancel {
  font-size: 24rpx;
  color: #9b9b9b;
  float: right;
}
</style>
<template>
  <view class="activity-box">
    <view class="activity-list" catchtap="toActivity" wx:for="{{oderActivityOption}}" data-set="{{item}}" wx:key="{{index}}" >
        <image binderror="imgErr" data-set="{{index}}" mode="aspectFill" class="list-img" src="{{item.cover}}"></image>
        <view class="list-right">
            <view class="list-title">{{item.goodsName}}</view>
            <view class="list-area"><image src="http://pc1u34h1m.bkt.clouddn.com/map%402x.png"></image>{{item.address}}</view>
            <view class="list-time">{{item.orderTime}}
                <view catchtap="toPay" data-set="{{item}}" wx:if="{{item.orderStatus=='WAITING_PAYMENT'}}" class="state-pay">{{language=='ZH'?'去付款 | ¥'+item.totalPrice/100:'Pay | ¥'+item.totalPrice/100}}</view>
                <view catchtap="toPayOk" data-set="{{item}}" wx:if="{{item.orderStatus=='COMPLETE_PAYMENT'}}" class="state-audit">{{language=='ZH'?'待审核':'In Review'}}</view>
                <view catchtap="toPayOk" data-set="{{item}}" wx:if="{{item.orderStatus=='APPROVED'}}" class="state-audit">{{language=='ZH'?'审核通过':'Passed'}}</view>
                <view wx:if="{{item.orderStatus=='CANCEL'}}" class="state-cancel">{{language=='ZH'?'已取消':'Cancel'}}</view>
                <view catchtap="toPayOk" data-set="{{item}}" wx:if="{{item.orderStatus=='REFUNDING'||item.orderStatus=='REFUND_APPROVED'}}" class="state-cancel">{{language=='ZH'?'退款申请中':'Refunding'}}</view>
                <view catchtap="toPayOk" data-set="{{item}}" wx:if="{{item.orderStatus=='REFUND_SUCCESS'}}" class="state-cancel">{{language=='ZH'?'已退票':'Refund'}}</view>
                <view catchtap="toPayOk" data-set="{{item}}" wx:if="{{item.orderStatus=='REFUND_REFUSED'}}" class="state-cancel">{{language=='ZH'?'退款拒绝':'Refund Refused'}}</view>
                <view catchtap="toPayOk" data-set="{{item}}" wx:if="{{item.orderStatus=='APPROVED_REFUSE'}}" class="state-cancel">{{language=='ZH'?'审核失败':'Approved Refused'}}</view>
                <view catchtap="toPayOk" data-set="{{item}}" wx:if="{{item.orderStatus=='FINISH'}}" class="state-cancel">{{language=='ZH'?'已完成':'completed'}}</view>
            </view>
        </view>
    </view>
  </view>
</template>
<script>
import wepy from 'wepy';
import { getTime } from '../utils/filter';

export default class OderActivity extends wepy.component {
  props = {};

  data = {
    oderActivityOption: [],
    language: 'ZH'
  };
  events = {
    changeState() {
      if (this.oderActivityOption.length == 0) {
        this.$emit('changeStatus', true);
      } else {
        this.$emit('changeStatus', false);
      }
    },
    getData(data) {
      for (var i = 0; i < data.length; i++) {
        if (this.language == 'ZH') {
          data[i].orderTime = getTime.getZHymd(data[i].orderTime);
        } else {
          data[i].orderTime = getTime.getENymd(data[i].orderTime);
        }
      }
      this.language = wx.getStorageSync('language');
      this.oderActivityOption = data;
      if (this.oderActivityOption.length == 0) {
        this.$emit('changeStatus', true);
      } else {
        this.$emit('changeStatus', false);
      }
    },
    CL(status) {
      this.language = wx.getStorageSync('language');
    }
  };

  watch = {};

  methods = {
    toPay(e) {
      wx.navigateTo({
        url:
          '/pages/activity/oderPay?orderNo=' +
          e.currentTarget.dataset.set.orderNo +
          '&activityId=' +
          e.currentTarget.dataset.set.goodsId +
          '&totalPrice=' +
          e.currentTarget.dataset.set.totalPrice +
          '&number=' +
          e.currentTarget.dataset.set.ticketNumber
      });
    },
    toPayOk(e) {
      wx.navigateTo({
        url:
          '/pages/activity/payOk?&activityId=' +
          e.currentTarget.dataset.set.goodsId +
          '&totalPrice=' +
          e.currentTarget.dataset.set.totalPrice +
          '&number=' +
          e.currentTarget.dataset.set.ticketNumber +
          '&orderStatus=' +
          e.currentTarget.dataset.set.orderStatus +
          '&orderId=' +
          e.currentTarget.dataset.set.orderId
      });
    },
    toActivity(e) {
      wx.navigateTo({
        url:
          '/pages/activity/activityDetail?&id=' +
          e.currentTarget.dataset.set.goodsId
      });
    },
    imgErr(e) {
      this.oderActivityOption[e.currentTarget.dataset.set].thumbnail =
        'http://pc1u34h1m.bkt.clouddn.com/defult.png';
    }
  };
  // getOption(allData, state1, state2, state3, state4) {
  //   var arr = [];
  //   for (var i = 0; i < allData.length; i++) {
  //     if (
  //       allData[i].orderStatus == state1 ||
  //       allData[i].orderStatus == state2 ||
  //       allData[i].orderStatus == state3 ||
  //       allData[i].orderStatus == state4
  //     ) {
  //       arr.push(allData[i]);
  //     }
  //   }
  //   return arr;
  // }
  onLoad() {}
}
</script>