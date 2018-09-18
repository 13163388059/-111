<style lang="less">
.informationItem {
  width: 686rpx;
  border-bottom: 1px solid #e5e3e3;
  padding-right: 32rpx;
  padding-bottom: 36rpx;
}

.informationItem:last-child {
  border: 0;
}

.informationItem image {
  width: 100%;
  height: 354rpx;
  border-radius: 8rpx;
  margin: 40rpx 0 20rpx 0;
}

.information-title {
  width: 100%;
  height: 40rpx;
  line-height: 40rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: PingFangSC-Medium;
  font-size: 28rpx;
  color: rgba(0, 0, 0, 0.8);
}

.information-size {
  width: 100%;
  height: 40rpx;
  line-height: 40rpx;
  overflow: hidden;
  font-family: PingFangSC-Medium;
  font-size: 28rpx;
  color: rgba(0, 0, 0, 0.8);
}

.information-footer {
  width: 100%;
  height: 34rpx;
  font-family: PingFangSC-Medium;
  font-size: 24rpx;
  color: #9b9b9b;
  line-height: 34rpx;
  margin-top: 22rpx;
}

.information-time {
  float: left;
}

.information-number,
.information-share {
  float: right;
}

.information-footer image {
  float: right;
  width: 26rpx;
  height: 26rpx;
  margin: 0;
  margin-right: 12rpx;
  margin-top: 4rpx;
}

.information-number {
  margin-right: 36rpx;
}

.isinformation {
  height: 646rpx;
}

.informationItem .isinformation-img {
  height: 410rpx;
  border-radius: 0;
}

.information-footer .see-number {
  width: 32rpx;
}

.in-img {
  background: #ffffff;
}
</style>
<template>
  <view class="informationItem"  wx:for="{{informationItemOption}}" data-set="{{item.talentShowId}}" catchtap="navTo" wx:key="{{index}}">
    <image binderror="imgErr" data-set="{{index}}" mode="aspectFill" class="in-img {{istab?'isinformation-img':''}}" src="{{item.cover}}"></image>
    <view class="information-title">{{item.title}}</view>
    <view wx:if="{{isIndex}}" class="information-size">{{language=='ZH'?'精选':'American adult'}}</view>
    <view class="information-footer">
      <view class="information-time">{{item.createTime}}</view>
      <view class="information-share">{{item.favoriteNumber==undefined?item.likeNumber:item.favoriteNumber}}</view>
      <image  mode="aspectFill"  src="http://pc1u34h1m.bkt.clouddn.com/collect-grey@3x.png"></image>
      <view class="information-number">{{item.pageViews}}</view>
      <image  mode="aspectFill" class="see-number" src="http://pc1u34h1m.bkt.clouddn.com/see@3x.png"></image>
    </view>
  </view>
</template>
<script>
import wepy from 'wepy';
import { getTime } from '../utils/filter';

export default class InformationItem extends wepy.component {
  props = {};

  data = {
    informationItemOption: [],
    language: 'ZH',
    status: true,
    istab: false,
    isIndex: false
  };
  events = {
    putInformation(data, status) {
      this.status = status;
      for (var i = 0; i < data.length; i++) {
        if (data[i] == undefined) {
          data.splice(i, 1);
        }
      }
      for (var i = 0; i < data.length; i++) {
        if (data[i] !== undefined) {
          if (this.language == 'ZH') {
            data[i].createTime = getTime.getZHymd(data[i].createTime);
          } else {
            data[i].createTime = getTime.getENymd(data[i].createTime);
          }
        }
      }
      if (status == true) {
        for (var i = 0; i < data.length; i++) {
          if (data[i] !== undefined) {
            this.informationItemOption.push(data[i]);
          }
        }
      } else {
        this.informationItemOption = data;
      }
      for (var i = 0; i < this.informationItemOption.length; i++) {
        try {
          this.informationItemOption[i].introduction = JSON.parse(
            this.informationItemOption[i].introduction
          );
        } catch (err) {
          this.informationItemOption[i].introduction = [];
        }
      }
      // console.log(this.informationItemOption);
    },
    CL(istabBar) {
      this.language = wx.getStorageSync('language');
      this.istab = istabBar;
    },
    noData() {
      this.informationItemOption = [];
    },
    isIndex() {
      this.isIndex = true;
      this.$apply();
    }
  };

  watch = {};

  methods = {
    navTo(e) {
      wx.navigateTo({
        url:
          '/pages/information/informationDetail?id=' +
          e.currentTarget.dataset.set
      });
    },
    imgErr(e) {
      this.informationItemOption[e.currentTarget.dataset.set].cover =
        'http://pc1u34h1m.bkt.clouddn.com/defult.png';
    }
  };
  onLoad() {}
}
</script>