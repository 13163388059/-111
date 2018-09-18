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
.screen-com,
.screen-area,
.screen-price {
  height: 36rpx;
  line-height: 36rpx;
  font-size: 26rpx;
  float: left;
  margin-top: 22rpx;
  position: relative;
}

.screen-all image,
.screen-com image,
.screen-area image,
.screen-price image {
  width: 16rpx;
  height: 8rpx;
  margin: 0 30rpx 6rpx 9rpx;
}

.icon {
  padding: 24rpx 32rpx 10rpx 24rpx;
  float: right;
}

.all-box,
.com-box,
.area-box,
.price-box {
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
.com-box view,
.area-box view,
.price-box view {
  line-height: 78rpx;
  font-family: PingFangSC-Medium;
  font-size: 26rpx;
  color: #000000;
  border-bottom: 2rpx solid #e5e3e3;
}

.all-box view:last-child,
.com-box view:last-child,
.area-box view:last-child,
.price-box view:last-child {
  border: 0;
}

.all-box view:hover,
.com-box view:hover,
.area-box view:hover,
.price-box view:hover {
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
    <view class="screen-com" catchtap="openCom">{{category4}}<image src="http://pc1u34h1m.bkt.clouddn.com/triangle@3x.png"/>
        <view wx:if="{{isOpenCom}}" catchtap="closeMask" class="mask-box"></view>
        <view  wx:if="{{isOpenCom}}" class="com-box">
           <view data-set="{{['',language=='ZH'?'全部':'All']}}" catchtap="selectOther">{{language=='ZH'?'全部':'All'}}</view>
           <view wx:for="{{otherCategory}}" wx:key="{{index}}" data-set="{{[item.labelId,item.name]}}" catchtap="selectOther">{{item.name}}</view>
       </view>
    </view>
    <view class="screen-price" bindtap="openPrice">{{category3}}<image src="http://pc1u34h1m.bkt.clouddn.com/triangle@3x.png"/>
      <view wx:if="{{isOpenPrice}}" catchtap="closeMask" class="mask-box"></view>
       <view wx:if="{{isOpenPrice}}" class="price-box">
           <view wx:for="{{language=='ZH'?sortCategory.ZH:sortCategory.EN}}" wx:key="{{index}}" data-set="{{item}}" catchtap="closePrice">{{item}}</view>
       </view>
    </view>
    <view class="screen-all" bindtap="openAll">{{category1}}<image  src="http://pc1u34h1m.bkt.clouddn.com/triangle@3x.png"/>
      <view wx:if="{{isOpenAll}}" catchtap="closeMask" class="mask-box"></view>
       <view wx:if="{{isOpenAll}}" class="all-box">
         <view data-set="{{language == 'ZH' ? '地区' : 'Area'}}" catchtap="closeAll">{{language=='ZH'?'全部':'All'}}</view>
           <view wx:for="{{language=='ZH'?areaCategory.ZH:areaCategory.EN}}" wx:key="{{index}}" data-set="{{item}}" catchtap="closeAll">{{item}}</view>
       </view>
    </view>
    <view class="screen-area" bindtap="openArea">{{category2}}<image src="http://pc1u34h1m.bkt.clouddn.com/triangle@3x.png"/>
      <view wx:if="{{isOpenArea}}" catchtap="closeMask" class="mask-box"></view>
       <view wx:if="{{isOpenArea}}" class="area-box">
           <view wx:for="{{language=='ZH'?priceCategory.ZH:priceCategory.EN}}" wx:key="{{index}}" data-set="{{item}}" catchtap="closeArea">{{item}}</view>
       </view>
    </view>
    <!-- <view class="screen-com" catchtap="openCom">{{language=='ZH'?'综合排序':'Sort by synthesize'}}<image src="http://pc1u34h1m.bkt.clouddn.com/triangle@3x.png"/>
      <view wx:if="{{isOpenCom}}" catchtap="closeMask" class="mask-box"></view>
        <view wx:if="{{isOpenCom}}" class="com-box">
           <view catchtap="closeCom">综合排序</view>
           <view catchtap="closeCom">播放最多</view>
           <view catchtap="closeCom">最经更新</view>
       </view>
    </view> -->
    <icon class="icon" type="search" size="18" color="#000" @tap="searchActivity"/>
  </view>
</template>
<script>
import wepy from 'wepy';
import { searchCategory, searchSort } from '../api/index';
export default class ActivityScreen extends wepy.component {
  props = {};

  data = {
    isOpenAll: false,
    isOpenCom: false,
    isOpenArea: false,
    isOpenPrice: false,
    language: 'ZH',
    areaCategory: {},
    priceCategory: {},
    sortCategory: {},
    category1: 'Area',
    category2: 'Price',
    category3: 'Sort',
    category4: '',
    key1: '',
    key2: '',
    key3: '',
    otherCategory: []
  };
  events = {
    async CL() {
      this.language = wx.getStorageSync('language');
      this.category1 = this.language == 'ZH' ? '地区' : 'Area';
      this.category2 = this.language == 'ZH' ? '价格' : 'Price';
      this.category3 = this.language == 'ZH' ? '综合排序' : 'Integrated sort';
      this.category4 = this.language == 'ZH' ? '全部' : 'All';
      await searchCategory('activity', this.language).then(res => {
        this.areaCategory = res.area_search;
        this.priceCategory = res.price_search;
        this.sortCategory = res.sort_search;
      });
      await searchSort({ type: 'ACTIVITY' }, this.language).then(res => {
        this.otherCategory = res.items;
      });
      this.$apply();
      this.$apply();
    },
    new() {
      this.isOpenAll = false;
      this.isOpenCom = false;
      this.isOpenArea = false;
      this.isOpenPrice = false;
    },
    getPull() {
      this.category1 = this.language == 'ZH' ? '地区' : 'Area';
      this.category2 = this.language == 'ZH' ? '价格' : 'Price';
      this.category3 = this.language == 'ZH' ? '综合排序' : 'Integrated sort';
      this.category4 = this.language == 'ZH' ? '全部' : 'All';
    }
  };

  watch = {};

  methods = {
    openAll() {
      this.isOpenAll = true;
      this.isOpenCom = false;
      this.isOpenArea = false;
      this.isOpenPrice = false;
    },
    closeAll(e) {
      this.category1 = e.currentTarget.dataset.set;
      if (this.category1 == '地区' || this.category1 == 'Area') {
        this.key1 = '';
      } else {
        for (var i = 0; i < this.areaCategory.EN.length; i++) {
          if (
            this.areaCategory.EN[i] == this.category1 ||
            this.areaCategory.ZH[i] == this.category1
          ) {
            this.key1 = this.areaCategory.EN[i];
          }
        }
      }
      this.$emit('searchCategory', this.key1, this.key2, this.key3);
      // if (this.category1 == '') {
      //   this.category1 = this.language == 'ZH' ? '全部' : 'All';
      // }
      this.isOpenAll = false;
    },
    selectOther(e) {
      this.isOpenCom = false;
      this.$emit('searchOther', e.currentTarget.dataset.set[0]);
      this.category4 = e.currentTarget.dataset.set[1];
    },
    openCom() {
      this.isOpenCom = true;
      this.isOpenAll = false;
      this.isOpenArea = false;
      this.isOpenPrice = false;
    },
    closeCom() {
      this.isOpenCom = false;
    },
    openArea() {
      this.isOpenArea = true;
      this.isOpenCom = false;
      this.isOpenAll = false;
      this.isOpenPrice = false;
    },
    closeArea(e) {
      this.category2 = e.currentTarget.dataset.set;
      if (this.category2 == '价格' || this.category2 == 'Price') {
        this.key2 = '';
      } else {
        this.key2 = this.category2;
      }
      this.$emit('searchCategory', this.key1, this.key2, this.key3);
      // if (this.category2 == '') {
      //   this.category2 = this.language == 'ZH' ? '全部' : 'All';
      // }
      this.isOpenArea = false;
    },
    openPrice() {
      this.isOpenPrice = true;
      this.isOpenAll = false;
      this.isOpenArea = false;
      this.isOpenCom = false;
    },
    closePrice(e) {
      this.category3 = e.currentTarget.dataset.set;
      if (this.category3 == '综合排序' || this.category3 == 'Integrated sort') {
        this.key3 = '';
      } else {
        this.key3 = this.category3;
      }
      this.$emit('searchCategory', this.key1, this.key2, this.key3);
      // if (this.category3 == '') {
      //   this.category3 = this.language == 'ZH' ? '全部' : 'All';
      // }
      this.isOpenPrice = false;
    },
    searchActivity() {
      wx.navigateTo({
        url: 'activity/activitySearch'
      });
    },
    closeMask() {
      this.isOpenAll = false;
      this.isOpenCom = false;
      this.isOpenArea = false;
      this.isOpenPrice = false;
    }
  };

  async onLoad() {}
}
</script>