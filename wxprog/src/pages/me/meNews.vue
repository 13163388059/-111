<style lang="less">
.empty-box {
  width: 100%;
}

.empty-tip {
  width: 100%;
  line-height: 32rpx;
  font-size: 22rpx;
  color: #909aac;
  float: left;
  text-align: center;
}

.empty {
  width: 262rpx;
  height: 166rpx;
  margin: 232rpx 0 10rpx 274rpx;
  float: left;
}
</style>
<template>
  <view class="container">
       <swiperRemove :swiperRemoveOption.sync="feedBacks"></swiperRemove>
       <view wx:if="{{noFeedBacks}}" class="empty-box">
          <image src="http://pc1u34h1m.bkt.clouddn.com/messages-empty.png" class="empty"></image>
          <view class="empty-tip">{{language=='ZH'?'暂时没有消息':'No message'}}</view>
       </view>
       <noMore wx:if="{{!noFeedBacks}}"></noMore>
  </view>
  
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import swiperRemove from '../../components/swiperRemove';
import noMore from '../../components/noMore';
import { feedBackList } from '../../api/index';
import { getTime } from '../../utils/filter.js';
export default class MeNews extends wepy.page {
  config = {};
  components = {
    swiperRemove: swiperRemove,
    noMore: noMore
  };

  data = {
    feedBacks: [],
    language: 'ZH',
    limit: 10,
    page: 1,
    offset: 0,
    isMore: true,
    noFeedBacks: false
  };

  computed = {};

  methods = {};
  async getData() {
    wx.showLoading({
      title: this.language == 'ZH' ? '数据加载中' : 'Loading',
      mask: true
    });
    await feedBackList(
      {
        limit: this.limit,
        page: this.page,
        offset: this.offset,
        receiverUserId: wx.getStorageSync('importantInfo').userId
      },
      this.language
    ).then(res => {
      this.page++;
      this.offset += res.items.length;
      if (res.items.length < this.limit) {
        this.isMore = false;
      }
      for (var i = 0; i < res.items.length; i++) {
        res.items[i].createTime =
          this.language == 'ZH'
            ? getTime.getZHymd(res.items[i].createTime) +
              ' ' +
              getTime.getZHhm(res.items[i].createTime)
            : getTime.getENymd(res.items[i].createTime) +
              ' ' +
              getTime.getZHhm(res.items[i].createTime);
      }
      this.feedBacks = this.feedBacks.concat(res.items);
      if (this.page == 1 && this.feedBacks.length == 0) {
        this.noFeedBacks = true;
      }
    });
    wx.hideLoading();
    this.$apply();
  }
  events = {};

  onReachBottom() {
    if (this.isMore == false) return;
    this.getData();
  }

  async onShow() {
    this.language = wx.getStorageSync('language');
    if (this.language == 'ZH') {
      wx.setNavigationBarTitle({
        title: '我的消息'
      });
    } else {
      wx.setNavigationBarTitle({
        title: 'Messages'
      });
    }
    this.$broadcast('CL', true);
    this.feedBacks = [];
    this.page = 1;
    this.offset = 0;
    await this.getData();
  }
  async onLoad() {}
}
</script>