
<style lang="less">
.box {
  width: 100%;
  height: 100%;
}
.read-emity {
  width: 234rpx;
  height: 184rpx;
  margin-left: 276rpx;
  margin-top: 266rpx;
  float: left;
}

.empty-tip {
  width: 100%;
  line-height: 32rpx;
  font-size: 22rpx;
  color: #909aac;
  float: left;
  text-align: center;
}

.courseItem-box {
  padding-left: 32rpx;
  width: 718rpx;
}
</style>
<template>
  <view class="container">
      <view class="box">
            <view class="courseItem-box">
               <courseItem></courseItem>
            </view>
        <view wx:if="{{noOrder}}" class="empty-box">
          <image class="read-emity" src="http://pc1u34h1m.bkt.clouddn.com/my-subscribe-empty.png"></image>
          <view class="empty-tip">{{language=='ZH'?'暂时没有订阅':'No courses are purchased'}}</view>  
        </view>
        <noMore wx:if="{{!noOrder}}"></noMore>
      </view>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import courseItem from '../../components/meCourseItem';
import noMore from '../../components/noMore';
import { courseOders } from '../../api/index';

export default class MeSubscribe extends wepy.page {
  config = {
    navigationBarTitleText: '我的订阅'
  };
  components = {
    courseItem: courseItem,
    noMore: noMore
  };

  data = {
    isEmity: false,
    courseItemOption: [],
    isSollect: 1,
    language: 'ZH',
    page: 1,
    limit: 12,
    offset: 0,
    noOrder: false,
    orderMore: true
  };

  computed = {};

  methods = {};

  events = {};

  async init() {
    if (this.orderMore == false) {
      return;
    }
    wx.showLoading({
      title: this.language == 'ZH' ? '数据加载中' : 'Loading',
      mask: true
    });
    await courseOders(
      { limit: this.limit, page: this.page, offset: this.offset },
      this.language
    ).then(res => {
      this.offset += res.items.length;
      if (this.limit > res.items.length) {
        this.orderMore = false;
      }
      if (this.page == 1) {
        if (res.items.length == 0) {
          this.noOrder = true;
        }
      }
      this.page++;
      this.$broadcast('putCourse', res.items, true);
    });
    wx.hideLoading();
    this.$apply();
  }
  async onReachBottom() {
    await this.init();
  }

  async onShow() {}
  async onLoad() {
    this.language = wx.getStorageSync('language');
    if (this.language == 'ZH') {
      wx.setNavigationBarTitle({
        title: '我的订阅'
      });
    } else {
      wx.setNavigationBarTitle({
        title: 'My Courses'
      });
    }
    this.$broadcast('CL', true);
    await this.init();
  }
}
</script>