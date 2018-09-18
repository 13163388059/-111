<style lang="less">
.screen {
  width: 718rpx;
  height: 80rpx;
  border-bottom: 2rpx solid #e5e3e3;
  padding: 0 0 0 32rpx;
}

// .screen-search {
//   position: absolute;
//   width: 640rpx;
//   height: 100%;
//   left: 0;
//   top: 0;
//   z-index: 10;
//   background: #fff;
// }

.screen-all,
.screen-com {
  height: 36rpx;
  line-height: 36rpx;
  font-size: 26rpx;
  float: left;
  margin-top: 22rpx;
  position: relative;
}

.screen-all image,
.screen-com image {
  width: 16rpx;
  height: 8rpx;
  margin: 0 30rpx 6rpx 9rpx;
}

.icon {
  padding: 24rpx 32rpx 10rpx 24rpx;
  float: right;
}

.all-box,
.com-box {
  width: 198rpx;
  background: #ffffff;
  box-shadow: 0 1px 8px 0 #8d8c8d;
  border-radius: 2px;
  padding-left: 30rpx;
  position: absolute;
  top: 0;
  z-index: 10;
}

.all-box view,
.com-box view {
  line-height: 78rpx;
  font-family: PingFangSC-Medium;
  font-size: 26rpx;
  color: #000000;
  border-bottom: 2rpx solid #e5e3e3;
}

.all-box view:last-child,
.com-box view:last-child {
  border: 0;
}

.all-box view:hover,
.com-box view:hover {
  background: #f6f6f6;
}

.mask-box {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 7;
  left: 0;
}
</style>
<template>
  <view class="screen">
    <view class="screen-com" catchtap="openCom">{{category2}}<image src="http://pc1u34h1m.bkt.clouddn.com/triangle@3x.png"/>
        <view wx:if="{{isOpenCom}}" catchtap="closeMask" class="mask-box"></view>
        <view  wx:if="{{isOpenCom}}" class="com-box">
           <view data-set="{{['',language=='ZH'?'全部':'All']}}" catchtap="selectOther">{{language=='ZH'?'全部':'All'}}</view>
           <view wx:for="{{otherCategory}}" wx:key="{{index}}" data-set="{{[item.labelId,item.name]}}" catchtap="selectOther">{{item.name}}</view>
       </view>
    </view>
    <view class="screen-all" bindtap="openSelect">{{category1}}<image  src="http://pc1u34h1m.bkt.clouddn.com/triangle@3x.png"/>
       <view wx:if="{{isOpenAll}}" catchtap="closeMask" class="mask-box"></view>
       <view wx:if="{{isOpenAll}}" class="all-box">
           <view wx:for="{{language=='ZH'?allCategory.ZH:allCategory.EN}}" wx:key="{{index}}" data-set="{{item}}" catchtap="selectScreen">{{item}}</view>
       </view>
    </view>
    <icon class="icon" type="search" size="18" color="#000" @tap="searchCourse"/>
  </view>
</template>
<script>
import wepy from 'wepy';
import { searchCategory, searchSort } from '../api/index';

export default class Screen extends wepy.component {
  props = {};

  data = {
    isOpenAll: false,
    isOpenCom: false,
    language: 'ZH',
    allCategory: [],
    category1: '',
    category2: '',
    otherCategory: []
  };
  events = {
    async CL() {
      this.language = wx.getStorageSync('language');
      this.category1 = this.language == 'ZH' ? '综合排序' : 'Integrated sort';
      this.category2 = this.language == 'ZH' ? '全部' : 'All';
      await searchCategory('course', this.language).then(res => {
        this.allCategory = res;
      });
      this.$apply();
      await searchSort({ type: 'COURSE' }, this.language).then(res => {
        this.otherCategory = res.items;
      });
      this.$apply();
    },
    new() {
      this.isOpenAll = false;
      this.isOpenCom = false;
    },
    getPull() {
      this.category1 = this.language == 'ZH' ? '综合排序' : 'Integrated sort';
      this.category2 = this.language == 'ZH' ? '全部' : 'All';
    }
  };

  watch = {};

  methods = {
    openSelect() {
      this.isOpenAll = true;
      this.isOpenCom = false;
    },
    selectScreen(e) {
      this.isOpenAll = false;
      this.$emit('searchCategory', e.currentTarget.dataset.set);
      this.category1 = e.currentTarget.dataset.set;
      if (this.category1 == '') {
        this.category1 = this.language == 'ZH' ? '全部' : 'All';
      }
    },
    selectOther(e) {
      this.isOpenCom = false;
      this.$emit('searchOther', e.currentTarget.dataset.set[0]);
      this.category2 = e.currentTarget.dataset.set[1];
    },
    openCom() {
      this.isOpenCom = true;
      this.isOpenAll = false;
    },
    closeCom() {
      this.isOpenCom = false;
    },
    searchCourse() {
      wx.navigateTo({
        url: 'course/courseSearch'
      });
    },
    closeMask() {
      this.isOpenAll = false;
      this.isOpenCom = false;
    }
  };

  async onLoad() {
    this.isOpenAll = false;
    this.isOpenCom = false;
  }
}
</script>
