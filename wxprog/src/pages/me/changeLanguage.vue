<style lang="less">
Page {
  background: #f2f2f2;
}

.radio-group {
  width: 100%;
  margin-top: 30rpx;
  background: #ffffff;
}

.radio {
  width: 686rpx;
  margin: 0 32rpx;
  border-bottom: 2rpx solid #9b9b9b;
  height: 100rpx;
  line-height: 100rpx;
  font-family: PingFangSC-Medium;
  font-size: 30rpx;
  color: #333333;
  display: block;
}

.radio:last-child {
  border: 0;
}

.radio-icon {
  float: right;
}
</style>
<template>
  <view class="container">
    <radio-group class="radio-group" bindchange="radioChange">
        <label class="radio" wx:for="{{items}}" wx:key="{{index}}">
            {{item.name}}<radio color="#A90202" class="radio-icon" value="{{item.name}}" checked="{{item.checked}}"/>
        </label>
    </radio-group>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';

export default class CourseSearch extends wepy.page {
  config = {};
  components = {};

  data = {
    items: [
      { name: '简体中文', checked: true },
      { name: 'English', checked: false }
    ]
  };

  computed = {};

  methods = {
    radioChange(e) {
      if (e.detail.value == '简体中文') {
        wx.setStorageSync('language', 'ZH');
        wx.setNavigationBarTitle({
          title: '语言切换'
        });
      } else {
        wx.setStorageSync('language', 'EN');
        wx.setNavigationBarTitle({
          title: 'Nationality'
        });
      }
    }
  };

  events = {};
  init() {
    for (var i = 0; i < this.items.length; i++) {
      if (
        this.items[i].name ===
        (wx.getStorageSync('language') == 'ZH' ? '简体中文' : 'English')
      ) {
        this.items[i].checked = true;
      } else {
        this.items[i].checked = false;
      }
    }
  }
  async onShow() {
    this.language = wx.getStorageSync('language');
    if (this.language == 'ZH') {
      wx.setNavigationBarTitle({
        title: '语言切换'
      });
    } else {
      wx.setNavigationBarTitle({
        title: 'Nationality'
      });
    }
  }
  onLoad() {
    this.init();
  }
}
</script>