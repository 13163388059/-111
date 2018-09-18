<style lang="less">
.search-tip {
  position: fixed;
  width: 100%;
  top: 0;
  height: 84rpx;
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  text-align: center;
  line-height: 84rpx;
  z-index: 9;
  margin-top: 0;
  font-size: 26rpx;
}

.top {
  transition: all 2s;
  margin-top: -84rpx;
}
</style>
<template>
  <view class="container">
    <!-- <navigation :navigationOption="navigationOption"></navigation>
    <tabBar></tabBar> -->
    <view class="search-tip {{isClose?'top':''}}" wx:if="{{isSearch}}">{{language=='ZH'?'共搜索到'+total+'条相关结果':'A total of '+total+' related results are searched'}}</view>
    <activityScreen></activityScreen>
    <activityContent></activityContent>
    <noMore wx:if="{{!isMore}}"></noMore>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import navigation from '../components/navigation';
import tabBar from '../components/tabBar';
import activityScreen from '../components/activityScreen';
import activityContent from '../components/activityContent';
import noMore from '../components/noMore';
import { activityLists } from '../api/index';

export default class Activity extends wepy.page {
  config = {
    enablePullDownRefresh: true
  };
  components = {
    toast: Toast,
    activityScreen: activityScreen,
    activityContent: activityContent,
    noMore: noMore
    // navigation: navigation,
    // tabBar: tabBar
  };

  data = {
    // navigationOption: {
    //   title: '活动',
    //   icon: false
    // }
    isMore: true,
    page: 1,
    limit: 8,
    total: 0,
    language: 'ZH',
    offset: 0,
    searchWord: '',
    isSearch: false,
    isClose: false,
    inputSearchKey: '',
    areaSearchKey: '',
    priceSearchKey: '',
    categoryId: ''
  };

  computed = {};

  methods = {};

  events = {
    getSize(data) {
      console.log(data);
    },
    async searchCategory(areaSearchKey, priceSearchKey, inputSearchKey) {
      console.log(areaSearchKey, priceSearchKey, inputSearchKey);
      this.inputSearchKey = inputSearchKey;
      this.areaSearchKey = areaSearchKey;
      this.priceSearchKey = priceSearchKey;
      this.page = 1;
      this.isMore = true;
      this.offset = 0;
      this.searchWord = '';
      await this.getData(false);
    },
    async searchOther(categoryId) {
      this.categoryId = categoryId;
      this.page = 1;
      this.isMore = true;
      this.offset = 0;
      this.searchWord = '';
      await this.getData(false);
    }
  };

  async getData(status) {
    var language = wx.getStorageSync('language');
    wx.showLoading({
      title: this.language == 'ZH' ? '数据加载中' : 'Loading',
      mask: true
    });
    await activityLists(
      {
        limit: this.limit,
        page: this.page,
        offset: this.offset,
        offlineActivityName: this.searchWord,
        inputSearchKey: this.inputSearchKey,
        priceSearchKey: this.priceSearchKey,
        areaSearchKey: this.areaSearchKey,
        categoryId: this.categoryId
      },
      language
    ).then(res => {
      // console.log(res);
      this.total = res.total;
      this.offset += res.items.length;
      if (res.items.length < this.limit) {
        this.isMore = false;
      }
      if (status == false) {
        this.$broadcast('putActivity', res.items, false);
      } else {
        this.$broadcast('putActivity', res.items, true);
      }
    });
    wx.hideLoading();
    this.$apply();
  }
  onReachBottom() {
    if (this.isMore == false) return;
    this.page++;
    this.getData();
  }

  async onPullDownRefresh() {
    this.page = 1;
    this.offset = 0;
    this.searchWord = '';
    this.inputSearchKey = '';
    this.priceSearchKey = '';
    this.areaSearchKey = '';
    this.categoryId = '';
    this.$broadcast('noData');
    await this.getData();
    this.$broadcast('getPull');
    wx.stopPullDownRefresh();
  }

  async onShow() {
    if (this.$parent.globalData.activitySearch !== '') {
      this.searchWord = this.$parent.globalData.activitySearch;
      this.page = 1;
      this.offset = 0;
      this.isMore = true;
      this.inputSearchKey = '';
      this.priceSearchKey = '';
      this.areaSearchKey = '';
      this.$parent.globalData.activitySearch = '';
      this.isSearch = true;
      this.isClose = false;
      setTimeout(() => {
        this.isClose = true;
        this.$apply();
      }, 1000);
    } else {
      this.searchWord = this.$parent.globalData.activitySearch;
      this.page = 1;
      this.offset = 0;
      this.isMore = true;
      this.inputSearchKey = '';
      this.priceSearchKey = '';
      this.areaSearchKey = '';
    }
    this.$broadcast('noData');
    this.$broadcast('new');
    this.language = wx.getStorageSync('language');
    this.$broadcast('CL');
    if (this.language == 'EN') {
      wx.setNavigationBarTitle({
        title: 'Activities'
      });
    } else {
      wx.setNavigationBarTitle({
        title: '活动'
      });
    }
    await this.getData();
  }
  onLoad() {}
}
</script>