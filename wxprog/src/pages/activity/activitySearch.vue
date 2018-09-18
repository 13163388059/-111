<style lang="less">
page {
  background: #e8e8e8;
}

.container {
  background: #fff;
}

.header {
  width: 100%;
  height: 72rpx;
}

.search-box {
  width: 644rpx;
  height: 62rpx;
  margin: 10rpx 12rpx 0 20rpx;
  background: #e8e8e8;
  border-radius: 4rpx;
  font-size: 28rpx;
  color: #9b9b9b;
  float: left;
  border-radius: 8rpx;
}

.icon {
  padding: 18rpx 14rpx 16rpx 22rpx;
  float: left;
}

.search-input {
  width: 540rpx;
  height: 62rpx;
  float: left;
}

.return {
  float: left;
  font-size: 28rpx;
  margin-top: 10rpx;
  line-height: 62rpx;
}

.history-box,
.new-box {
  width: 686rpx;
  padding: 22rpx 32rpx 44rpx 32rpx;
  margin-top: 16rpx;
}

.new-box {
  margin-top: 0;
}

.history-title,
.new-title {
  width: 100%;
  height: 40rpx;
  font-size: 28rpx;
  color: #9b9b9b;
  line-height: 40rpx;
}

.history-title image,
.new-title image {
  width: 30rpx;
  height: 30rpx;
  margin-right: 12rpx;
  margin-top: 5rpx;
  line-height: 0;
  float: left;
}

.list-box {
  width: 100%;
}

.list-li {
  font-size: 24rpx;
  color: #4a4a4a;
  height: 50rpx;
  padding: 0 12rpx 0 14rpx;
  float: left;
  background: #e8e8e8;
  line-height: 50rpx;
  margin-right: 18rpx;
  margin-top: 36rpx;
  border-radius: 8rpx;
}

.en-search-box {
  width: 604rpx;
}

.new-box .hot-image {
  width: 28rpx;
  height: 34rpx;
}
</style>
<template>
  <view class="container">
    <view class="header">
        <view class="search-box {{language=='ZH'?'':'en-search-box'}}">
            <icon class="icon" type="search" size="14" color="#9B9B9B" catchtap="confirm"/>
            <input placeholder="{{language=='ZH'?'请输入活动名称关键字':'Please enter the keywords'}}" confirm-type="search" class="search-input" bindinput="searchInput" bindconfirm="confirm"/>
        </view>
        <view class="return" @tap="backPage">{{language=='ZH'?'取消':'Cancel'}}</view>
    </view>
    <view class="history-box">
        <view class="history-title"><image mode="aspectFill" src="http://pc1u34h1m.bkt.clouddn.com/history-search.png"></image><text>{{language=='ZH'?'历史搜索':'Histories'}}</text></view>
        <view class="list-box">
            <view class="list-li" catchtap="confirm" wx:for="{{historyList}}" data-set="{{item}}" wx:key="{{index}}">{{item}}</view>
        </view>
    </view>
    <view class="new-box">
        <view class="new-title"><image class="hot-image" mode="aspectFill" src="http://pc1u34h1m.bkt.clouddn.com/hot.png"></image><text>{{language=='ZH'?'热门搜索':'Hots'}}</text></view>
        <view class="list-box">
            <view class="list-li" catchtap="confirm" wx:for="{{newList}}" data-set="{{item.hotWordName}}" wx:key="{{index}}">{{item.hotWordName}}</view>
        </view>
    </view>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import { hotSearch } from '../../api/index';

export default class ActivitySearch extends wepy.page {
  config = {};
  components = {};

  data = {
    historyList: [],
    newList: [],
    searchValue: '',
    language: 'ZH'
  };

  computed = {};

  methods = {
    backPage() {
      wx.navigateBack();
    },
    confirm(e) {
      if (e.currentTarget.dataset.set !== undefined) {
        this.searchValue = e.currentTarget.dataset.set;
      }
      if (this.searchValue !== '') {
        this.$parent.globalData.activitySearch = this.searchValue;
        if (wx.getStorageSync('activityHistory') == '') {
          wx.setStorageSync('activityHistory', [this.searchValue]);
        } else {
          for (var i = 0; i < this.historyList.length; i++) {
            if (this.searchValue == this.historyList[i]) {
              this.historyList.splice(i, 1);
            }
          }
          this.historyList.unshift(this.searchValue);
          if (this.historyList.length > 10) {
            this.historyList.splice(10, 1);
          }
          wx.setStorageSync('activityHistory', this.historyList);
        }
        wx.switchTab({
          url: '/pages/activity'
        });
      }
    },
    searchInput(e) {
      this.searchValue = e.detail.value;
    }
  };
  async init() {
    await hotSearch('activity', this.language).then(res => {
      this.newList = res.items;
      this.$apply();
    });
  }
  events = {};
  async onShow() {
    // await this.getData();
  }
  async onLoad() {
    this.historyList = wx.getStorageSync('activityHistory');
    this.language = wx.getStorageSync('language');
    if (this.language == 'ZH') {
      wx.setNavigationBarTitle({
        title: '搜活动'
      });
    } else {
      wx.setNavigationBarTitle({
        title: 'Search Activity'
      });
    }
    this.$broadcast('CL', true);
    await this.init();
  }
}
</script>