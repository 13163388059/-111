
<style lang="less">
page {
  background: #f2f2f2;
}
.data-list {
  width: 676rpx;
  height: 98rpx;
  border-bottom: 2rpx solid #e3e3e3;
  padding: 0 34rpx 0 40rpx;
  line-height: 98rpx;
  color: #333333;
  background: #ffffff;
  font-size: 28rpx;
}

.nav-icon {
  width: 17rpx;
  height: 34rpx;
  float: right;
  margin-left: 23rpx;
  margin-top: 32rpx;
}
</style>
<template>
  <view class="container">
    <view data-set="{{item}}" catchtap="changeCountry" wx:for="{{language=='ZH'?countrysZH:countrysEN}}" wx:key="{{index}}" class="data-list country" >{{item}}<image mode="aspectFill" class="nav-icon" src="http://pc1u34h1m.bkt.clouddn.com/right%403x.png"/></view>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import { putUserInfo } from '../../api/index';

export default class chooseCountry extends wepy.page {
  config = {
    navigationBarTitleText: '国家'
  };
  components = {};

  data = {
    countrysZH: [
      '中国',
      '梵蒂冈',
      '白俄罗斯',
      '波兰',
      '乌克兰',
      '保加利亚',
      '丹麦',
      '西班牙',
      '斯洛伐克',
      '德国',
      '爱尔兰',
      '圣马力诺',
      '法国',
      '匈牙利',
      '克罗地亚',
      '希腊',
      '立陶宛',
      '拉脱维亚',
      '瑞士',
      '意大利',
      '罗马尼亚',
      '英国 ',
      '卢森堡',
      '摩尔多瓦',
      '瑞典',
      '摩纳哥',
      '南斯拉夫',
      '挪威',
      '马耳他',
      '斯洛文尼亚',
      '捷克',
      '马其顿',
      '阿尔巴尼亚',
      '芬兰',
      '安道尔',
      '列支敦士登',
      '荷兰',
      '葡萄牙',
      '波斯尼亚和黑塞哥维那',
      '俄罗斯',
      '比利时',
      '奥地利',
      '爱沙尼亚',
      '冰岛'
    ],
    countrysEN: [
      'China',
      'Vatican',
      'Belarus',
      'Poland',
      'Ukraine',
      'Bulgaria',
      'Danish',
      'Spain',
      'Slovakia',
      'Germany',
      'Ireland',
      'San Marino',
      'France',
      'Hungary',
      'Croatia',
      'Greece',
      'Lithuania',
      'Latvia',
      'Switzerland',
      'Italy',
      'Romania',
      'UK',
      'Luxemburg',
      'Moldova',
      'Sweden',
      'Monaco',
      'Yugoslavia',
      'Norway',
      'Malta',
      'Slovenia',
      'Czech',
      'Macedonia',
      'Albania',
      'Finland',
      'Andorra',
      'Liechtenstein',
      'Holland',
      'Portuguese',
      'Bosnia and Herzegovina',
      'Russia',
      'Belgian',
      'Austria',
      'Estonia',
      'Iceland'
    ],
    language: 'ZH'
  };

  computed = {};

  methods = {
    async changeCountry(e) {
      var that = this;
      var userInfo = wx.getStorageSync('importantInfo');
      await putUserInfo({
        country: e.currentTarget.dataset.set
      }).then(res => {
        if (res.status == true) {
          userInfo.country = e.currentTarget.dataset.set;
          wx.showToast({
            title: that.language == 'ZH' ? '修改成功' : 'Amend success',
            icon: 'success',
            duration: 500,
            mask: true
          });
          wx.navigateBack({
            delta: 1
          });
        } else {
          wx.showToast({
            title: that.language == 'ZH' ? '修改失败' : 'Amend fail',
            duration: 500,
            mask: true
          });
          return;
        }
      });
      wx.setStorageSync('importantInfo', userInfo);
    }
  };
  init() {
    this.language = wx.getStorageSync('language');
    if (this.language == 'EN') {
      wx.setNavigationBarTitle({
        title: 'Nationality'
      });
    } else {
      wx.setNavigationBarTitle({
        title: '国家'
      });
    }
  }
  onShow() {
    this.init();
  }
  events = {};
  onLoad() {}
}
</script>