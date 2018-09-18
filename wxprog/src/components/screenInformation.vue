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
  left: 0;
  z-index: 7;
}
</style>
<template>
  <view class="screen">
    <view class="screen-all" bindtap="openSelect">{{category}}<image  src="http://pc1u34h1m.bkt.clouddn.com/triangle@3x.png"/>
      <view wx:if="{{isOpenAll}}" catchtap="closeMask" class="mask-box"></view>
       <view wx:if="{{isOpenAll}}" class="all-box">
           <view data-set="{{['',language=='ZH'?'全部':'All']}}" catchtap="selectScreen">{{language=='ZH'?'全部':'All'}}</view>
           <view wx:for="{{language=='ZH'?allCategory.ZH:allCategory.EN}}" wx:key="{{index}}" data-set="{{[item.categoryId,item.categoryName]}}" catchtap="selectScreen">{{item.categoryName}}</view>
       </view>
    </view>
    <!-- <view class="screen-com" catchtap="openCom">{{language=='ZH'?'综合排序':'Sort by synthesize'}}<image src="http://pc1u34h1m.bkt.clouddn.com/triangle@3x.png"/>
      <view wx:if="{{isOpenCom}}" catchtap="closeMask" class="mask-box"></view>
        <view wx:if="{{isOpenCom}}" class="com-box">
           <view catchtap="closeCom">综合排序</view>
           <view catchtap="closeCom">浏览最多</view>
           <view catchtap="closeCom">更新发布</view>
       </view>
    </view> -->
    <icon class="icon" type="search" size="18" color="#000" @tap="searchCourse"/>
  </view>
</template>
<script>
import wepy from 'wepy';
import { searchCategory, searchSort } from '../api/index';
export default class ScreenInformation extends wepy.component {
  props = {};

  data = {
    isOpenAll: false,
    isOpenCom: false,
    language: 'ZH',
    allCategory: [],
    category: '',
    otherCategory: []
  };
  events = {
    async CL() {
      this.language = wx.getStorageSync('language');
      this.category = this.language == 'ZH' ? '全部' : 'All';
      await searchCategory('show', this.language).then(res => {
        this.allCategory = res;
      });
      await searchSort({ type: 'SHOW' }, this.language).then(res => {
        this.otherCategory = res.items;
      });
      this.$apply();
    },
    new() {
      this.isOpenAll = false;
      this.isOpenCom = false;
    },
    async changeKey(type) {
      this.category = type;
      await searchCategory('show', this.language).then(res => {
        this.allCategory = res;
      });
      for (var i = 0; i < this.allCategory.EN.length; i++) {
        if (this.language == 'ZH') {
          if (this.allCategory.ZH[i].categoryName == type) {
            this.$emit('searchCategory', this.allCategory.ZH[i].categoryId);
          }
        } else {
          if (this.allCategory.EN[i].categoryName == type) {
            this.$emit('searchCategory', this.allCategory.EN[i].categoryId);
          }
        }
      }
    },
    getPull() {
      this.category = this.language == 'ZH' ? '全部' : 'All';
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
      this.$emit('searchCategory', e.currentTarget.dataset.set[0]);
      this.category = e.currentTarget.dataset.set[1];
      if (this.category == '') {
        this.category = this.language == 'ZH' ? '全部' : 'All';
      }
    },
    openCom(e) {
      this.isOpenCom = true;
      this.isOpenAll = false;
    },
    closeCom() {
      this.isOpenCom = false;
    },
    searchCourse() {
      wx.navigateTo({
        url: 'information/informationSearch'
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
