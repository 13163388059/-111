<style lang="less">
.courseItem-box {
  padding-left: 32rpx;
  width: 718rpx;
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
    <view class="search-tip {{isClose?'top':''}}" wx:if="{{isSearch}}">{{language=='ZH'?'共搜索到'+total+'条相关结果':'A total of '+total+' related results are searched'}}</view>
    <screen></screen>
    <view class="courseItem-box">
      <courseItem></courseItem>
    </view>
    <noMore wx:if="{{!isMore}}"></noMore>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import navigation from '../components/navigation';
import tabBar from '../components/tabBar';
import courseItem from '../components/courseItem';
import noMore from '../components/noMore';
import screen from '../components/screen';
import { courseLists, searchSize } from '../api/index';

export default class Course extends wepy.page {
  config = {
    enablePullDownRefresh: true
  };
  components = {
    toast: Toast,
    courseItem: courseItem,
    noMore: noMore,
    screen: screen

    // navigation: navigation,
    // tabBar: tabBar
  };

  data = {
    // navigationOption: {
    //   title: '课程',
    //   icon: false
    // }
    courseItemOption: [],
    ishao: [],
    isMore: true,
    total: 0,
    page: 1,
    limit: 8,
    screen: false,
    language: 'ZH',
    offset: 0,
    searchWord: '',
    isSearch: false,
    isClose: false,
    inputSearchKey: '综合排序',
    categoryId: ''
  };

  computed = {};

  methods = {};
  events = {
    getSize(data) {
      console.log(data);
    },
    async searchCategory(inputSearchKey) {
      this.inputSearchKey = inputSearchKey;
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
    await courseLists(
      {
        limit: this.limit,
        page: this.page,
        offset: this.offset,
        onlineCourseName: this.searchWord,
        inputSearchKey: this.inputSearchKey,
        categoryId: this.categoryId
      },
      language
    ).then(res => {
      this.total = res.total;
      this.offset += res.items.length;
      if (res.items.length < this.limit) {
        this.isMore = false;
      }
      for (var i = 0; i < res.items.length; i++) {
        try {
          res.items[i].introduction = JSON.parse(res.items[i].introduction);
        } catch (err) {
          res.items[i].introduction = [];
        }
      }
      if (status == false) {
        this.$broadcast('putCourse', res.items, false);
      } else {
        this.$broadcast('putCourse', res.items, true);
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
    this.inputSearchKey = '综合排序';
    this.isSearch = false;
    this.isClose = true;
    this.categoryId = '';
    this.$broadcast('noData');
    await this.getData();
    this.$broadcast('getPull');
    wx.stopPullDownRefresh();
  }
  async onShow() {
    if (this.$parent.globalData.courseSearch !== '') {
      this.searchWord = this.$parent.globalData.courseSearch;
      this.page = 1;
      this.offset = 0;
      this.isMore = true;
      this.inputSearchKey = '综合排序';
      this.$parent.globalData.courseSearch = '';
      this.isSearch = true;
      this.isClose = false;
      setTimeout(() => {
        this.isClose = true;
        this.$apply();
      }, 1000);
    } else {
      this.searchWord = this.$parent.globalData.courseSearch;
      this.page = 1;
      this.offset = 0;
      this.isMore = true;
      this.inputSearchKey = '综合排序';
    }
    this.$broadcast('noData');
    this.language = wx.getStorageSync('language');
    this.$broadcast('CL');
    this.$broadcast('new');
    if (this.language == 'EN') {
      wx.setNavigationBarTitle({
        title: 'Course'
      });
    } else {
      wx.setNavigationBarTitle({
        title: '课程'
      });
    }
    await this.getData();
  }
  onLoad() {}
}
</script>