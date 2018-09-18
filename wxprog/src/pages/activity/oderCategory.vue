<style lang="less">
page {
  background: #f2f2f2;
}
.oder-size-box {
  background: #fff;
  width: 686rpx;
  padding: 36rpx 32rpx 32rpx 44rpx;
}

.size-title {
  width: 100%;
  height: 40rpx;
  font-family: PingFangSC-Regular;
  font-size: 28rpx;
  color: #4a4a4a;
  letter-spacing: 0;
  line-height: 40rpx;
}

.size-list {
  width: 638rpx;
  height: 108rpx;
  border: 2rpx solid #e6e6e6;
  font-family: PingFangSC-Medium;
  font-size: 32rpx;
  color: #4a4a4a;
  line-height: 108rpx;
  padding: 0 22rpx;
  margin-top: 28rpx;
}

.size-list view {
  float: right;
}

.margin-top {
  margin-top: 38rpx;
}

.size-tip {
  width: 638rpx;
  height: 74rpx;
  font-family: PingFangSC-Medium;
  font-size: 26rpx;
  color: #9b9b9b;
  line-height: 74rpx;
  padding: 0 22rpx;
  border: 2rpx solid #e6e6e6;
  border-top: 0;
}

.red-border {
  border-color: #a90202;
}

.oder-number-tip {
  width: 678rpx;
  height: 86rpx;
  padding: 0 36rpx;
  line-height: 86rpx;
  font-size: 28rpx;
  color: #4a4a4a;
}

.oder-number-box {
  width: 678rpx;
  height: 134rpx;
  background: #fff;
  padding: 0 32rpx 0 40rpx;
}

.oder-number {
  width: 100%;
  height: 52rpx;
  line-height: 52rpx;
  margin-top: 28rpx;
  margin-bottom: 6rpx;
  font-size: 28rpx;
  color: #666666;
}

.number-change-ku {
  float: right;
}

.surplus {
  line-height: 32rpx;
  font-size: 22rpx;
  color: #9b9b9b;
  float: right;
}

.put-oder {
  width: 100%;
  height: 96rpx;
  position: fixed;
  bottom: 0;
  background: #fff;
}

.oder-price {
  width: 316rpx;
  height: 100%;
  text-align: center;
  line-height: 96rpx;
  font-size: 24rpx;
  float: left;
}

.oder-price text {
  color: #a90202;
  font-size: 32rpx;
}

.oder-next {
  width: 434rpx;
  height: 100%;
  background: #a90202;
  color: #ffffff;
  text-align: center;
  float: left;
  line-height: 96rpx;
}
</style>
<template>
  <view class="container">
    <view class="oder-size-box">
        <view class="size-title">{{language=='ZH'?'票种类型':'Ticket Types'}}</view>
        <view wx:for="{{option.offlineActivityTicketResps}}" wx:key="{{index}}">
            <view class="size-list {{isSelect==index?'red-border':''}}" data-set="{{[item,index]}}" catchtap="selectSize">{{item.name}}
              <view>{{item.price/100}}</view>
            </view>
        <!-- <view data-set="{{false}}" catchtap="selectSize">
            <view class="size-list margin-top {{!isSelect?'red-border':''}}">{{language=='ZH'?'普通票':'Ticket'}}<view>150</view></view>
            <view class="size-tip {{!isSelect?'red-border':''}}">{{language=='ZH'?'备注：需支付门票费':'Remark：You have to pay for the ticket.'}}</view>
        </view> -->
        </view>
    </view>
    <view class="oder-number-tip">{{language=='ZH'?'购买数量':'Quantity'}}</view>
    <view class="oder-number-box">
      <view class="oder-number">{{language=='ZH'?'数量':'Quantity'}}<numberChange class="number-change-ku" :numberChange.sync="numberChange"></numberChange></view>
      <view class="surplus">{{language=='ZH'?'剩余'+count+'张':'Remaining '+count}}</view>
    </view>
    <view class="put-oder">
      <view class="oder-price">{{language=='ZH'?'合计：':'Total：'}}<text>¥{{price*number/100}}</text></view>
      <view class="oder-next" catchtap="nextTo">{{language=='ZH'?'下一步':'Next'}}</view>
    </view>
  </view>
</template>
<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import numberChange from '../../components/numberChange';
import { activityDetail, userInfo } from '../../api/index';

export default class oderCategory extends wepy.page {
  config = {};
  components = {
    numberChange: numberChange
  };
  data = {
    isSelect: 0,
    language: 'ZH',
    option: [],
    ticketId: 0,
    price: 0,
    number: 1,
    activityId: 0,
    count: 0,
    numberChange: 0
  };

  computed = {};

  methods = {
    selectSize(e) {
      if (this.isSelect == e.currentTarget.dataset.set[1]) {
        return;
      }
      this.isSelect = e.currentTarget.dataset.set[1];
      this.ticketId = e.currentTarget.dataset.set[0].offlineActivityTicketId;
      this.price = e.currentTarget.dataset.set[0].price;
      this.count = this.option.offlineActivityTicketResps[
        e.currentTarget.dataset.set[1]
      ].number;
      this.number = 1;
      this.$broadcast('newNumber');
      this.numberChange = this.count;
    },
    async nextTo() {
      var that = this;
      if (this.count == 0) {
        wx.showToast({
          title: that.language == 'ZH' ? '活动票数为空' : 'No more ticket',
          icon: 'none',
          duration: 1000,
          mask: true
        });
        return;
      }
      await userInfo(this.language).then(res => {
        if (
          res.remark1 == undefined &&
          wx.getStorageSync('userInfo').remark1 == undefined
        ) {
          wx.navigateTo({
            url:
              'oderMan?activityId=' +
              this.activityId +
              '&number=' +
              this.number +
              '&ticketId=' +
              this.ticketId
          });
        } else {
          if (res.remark1 !== undefined) {
            if (res.apply_phone == undefined) {
              res.apply_phone = '086';
            }
            wx.setStorageSync('userInfo', res);
          }
          wx.navigateTo({
            url:
              'oderSure?activityId=' +
              this.activityId +
              '&number=' +
              this.number +
              '&ticketId=' +
              this.ticketId
          });
        }
      });
    }
  };

  events = {
    changeNumber(number) {
      this.number = number;
    }
  };
  async getData() {
    await activityDetail(this.activityId, this.language).then(res => {
      this.option = res;
      if (this.option.offlineActivityTicketResps.length == 0) {
        this.option.offlineActivityTicketResps = [
          {
            price: 0,
            offlineActivityTicketId: '',
            name: this.language == 'ZH' ? '免费票' : 'Free '
          }
        ];
        this.count = this.option.limitNumber - this.option.purchaseQuantity;
        this.numberChange = this.count;
      } else {
        this.count = this.option.offlineActivityTicketResps[0].number;
        this.numberChange = this.count;
      }
      try {
        this.price = this.option.ticketInfos[0].price;
      } catch (err) {
        this.price = 0;
      }
      try {
        this.ticketId = this.option.offlineActivityTicketResps[0].offlineActivityTicketId;
      } catch (err) {
        this.ticketId = '';
      }
      this.$apply();
    });
  }
  async onShow() {}
  async onLoad(e) {
    this.activityId = e.id;
    this.language = wx.getStorageSync('language');
    if (this.language == 'ZH') {
      wx.setNavigationBarTitle({
        title: '选择票种'
      });
    } else {
      wx.setNavigationBarTitle({
        title: 'Select Ticket'
      });
    }
    await this.getData();
  }
}
</script>