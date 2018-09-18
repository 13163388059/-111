<style lang="less">
.informationItem-box {
  width: 718rpx;
  padding-left: 32rpx;
}

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
    <!-- <informationNav></informationNav> -->
    <screenInformation></screenInformation>
    <view class="search-tip {{isClose?'top':''}}" wx:if="{{isSearch}}">{{language=='ZH'?'共搜索到'+total+'条相关结果':'A total of '+total+' related results are searched'}}</view>
    <view class="informationItem-box">
      <informationItem :informationItemOption="informationItemOption"></informationItem>
    </view>
    <noMore></noMore>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import navigation from '../components/navigation';
import tabBar from '../components/tabBar';
import informationNav from '../components/informationNav';
import informationItem from '../components/informationItem';
import screenInformation from '../components/screenInformation';
import noMore from '../components/noMore';
import { newLists } from '../api/index';
export default class Information extends wepy.page {
  config = {
    enablePullDownRefresh: true
  };
  components = {
    toast: Toast,
    informationNav: informationNav,
    informationItem: informationItem,
    screenInformation: screenInformation,
    noMore: noMore
    // navigation: navigation,
    // tabBar: tabBar
  };

  data = {
    // navigationOption: {
    //   title: '资讯',
    //   icon: false
    // }
    informationItemOption: {},
    limit: 8,
    page: 1,
    total: 0,
    isMore: true,
    language: 'ZH',
    offset: 0,
    searchWord: '',
    isSearch: false,
    isClose: false,
    categoryId: '',
    isClose: false,
    inputSearchKey: ''
  };

  computed = {};

  methods = {};

  events = {
    getSize(data) {
      console.log(data);
    },
    async searchCategory(categoryId) {
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
    await newLists(
      {
        limit: this.limit,
        page: this.page,
        offset: this.offset,
        talentShowName: this.searchWord,
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
        this.$broadcast('putInformation', res.items, false);
      } else {
        this.$broadcast('putInformation', res.items, true);
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
    this.searchWord = '';
    this.page = 1;
    this.offset = 0;
    this.isMore = true;
    this.categoryId = '';
    this.$broadcast('noData');
    await this.getData(false);
    this.$broadcast('getPull');
    wx.stopPullDownRefresh();
  }
  async onShow() {
    if (this.$parent.globalData.informationSearch !== '') {
      this.searchWord = this.$parent.globalData.informationSearch;
      this.page = 1;
      this.offset = 0;
      this.isMore = true;
      this.categoryId = '';
      this.$parent.globalData.informationSearch = '';
      this.isSearch = true;
      this.isClose = false;
      setTimeout(() => {
        this.isClose = true;
        this.$apply();
      }, 1000);
    } else {
      this.searchWord = this.$parent.globalData.informationSearch;
      this.page = 1;
      this.offset = 0;
      this.isMore = true;
      this.categoryId = '';
    }
    this.$broadcast('noData');
    this.$broadcast('new');
    this.language = wx.getStorageSync('language');
    this.$broadcast('CL', true);
    try {
      this.inputSearchKey = wx.getStorageSync('informationKey');
      if (this.inputSearchKey !== '') {
        this.$broadcast('changeKey', this.inputSearchKey);
      }
    } catch (err) {
      this.inputSearchKey = '';
    }
    if (this.language == 'EN') {
      wx.setNavigationBarTitle({
        title: 'Information'
      });
    } else {
      wx.setNavigationBarTitle({
        title: '资讯'
      });
    }
    await this.getData(false);
  }
  onLoad() {
    // if()
  }
  onHide() {
    wx.setStorageSync('informationKey', '');
  }
}
</script>