
<style lang="less">
.map-tip {
  width: 684rpx;
  height: 298rpx;
  position: fixed;
  z-index: 123;
}

.tip-content {
  width: 614rpx;
  height: 224rpx;
  background: #ffffff;
  border-radius: 8rpx;
  padding: 44rpx 26rpx 0 44rpx;
  position: relative;
}

.triangle {
  width: 60rpx;
  height: 30rpx;
  bottom: 2rpx;
  left: 316rpx;
  position: absolute;
}

.cover-image-tip {
  width: 120rpx;
  height: 120rpx;
  border-radius: 12rpx;
  float: left;
}

.map-area {
  width: 334rpx;
  font-size: 32rpx;
  color: #485465;
  line-height: 43rpx;
  float: left;
  margin-left: 32rpx;
  white-space: normal;
}

.map-footer {
  width: 100%;
  height: 44rpx;
  float: left;
  line-height: 44rpx;
  font-family: HelveticaNeue;
  font-size: 24rpx;
  color: #1e2429;
  margin-top: 32rpx;
}
.cover-map-icon {
  width: 24rpx;
  height: 30rpx;
  float: left;
  margin-top: 7rpx;
  margin-right: 10rpx;
}

.distance {
  background: #cbd2dc;
  border-radius: 8rpx;
  line-height: 44rpx;
  float: right;
  padding: 0 20rpx;
  color: #fff;
}

.tip-content .map-top-img {
  width: 70rpx;
  height: 86rpx;
  position: absolute;
  right: 44rpx;
  top: 0;
  border-radius: 0;
}

.dizhi {
  float: left;
  line-height: 44rpx;
  width: 470rpx;
}
</style>
<template>
  <view class="container">
    <!-- <map id="map" bindtouchstart="moveStart" bindtouchmove="moveIng" longitude="114.34482574462912" latitude="30.527169330332164" scale="14" controls="{{controls}}" 
    bindcontroltap="controltap" markers="{{markers}}" bindmarkertap="markertap" polyline="{{polyline}}" 
    bindregionchange="regionchange" show-location class="map" style="width: 750rpx;height:100vh;">
       <cover-view style="left:{{left+'rpx'}};top:{{top+'rpx'}}" class="map-tip">
        <cover-view class="tip-content">
            <cover-image class="cover-image-tip" mode="aspectFill" src="http://pc1u34h1m.bkt.clouddn.com/006.jpg"></cover-image>
            <cover-view class="map-area">湖北武汉东湖国际会议中心</cover-view>
            <cover-view class="map-footer">
              <cover-image class="cover-map-icon" src="http://pc1u34h1m.bkt.clouddn.com/map.png"></cover-image>
              <cover-view class="dizhi">武汉市江汉区中山大道121号</cover-view>
              <cover-view class="distance">891m</cover-view>
            </cover-view>
            <cover-image mode="aspectFill" src="http://pc1u34h1m.bkt.clouddn.com/sign.png" class="map-top-img"></cover-image>
        </cover-view>
        <cover-image src="http://pc1u34h1m.bkt.clouddn.com/triangle.png" class="triangle"></cover-image>
    </cover-view>
    </map> -->
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import { activityDetail } from '../../api/index';
export default class Map extends wepy.page {
  config = {};
  components = {};

  data = {
    markers: [
      {
        iconPath: '../../assets/icon/map-icon.png',
        id: 0,
        latitude: 23.097984,
        longitude: 113.34462,
        width: 45,
        height: 45
      }
    ],
    polyline: [
      {
        points: [
          {
            longitude: 124.359207,
            latitude: 30.588569
          },
          {
            longitude: 124.359207,
            latitude: 30.588569
          }
        ],
        color: '#FF0000DD',
        width: 2,
        dottedLine: true
      }
    ],
    language: 'ZH',
    pageX: 0,
    pageY: 0,
    top: 230,
    left: 30,
    index: 0,
    option: {},
    activityId: 0
  };

  computed = {};

  methods = {
    moveStart(e) {
      this.pageX = e.changedTouches[0].pageX;
      this.pageY = e.changedTouches[0].pageY;
    },
    moveIng(e) {
      this.left += 2 * (e.changedTouches[0].pageX - this.pageX);
      this.top += 2 * (e.changedTouches[0].pageY - this.pageY);
      this.pageX = e.changedTouches[0].pageX;
      this.pageY = e.changedTouches[0].pageY;
    }
  };

  events = {};

  regionchange(e) {
    console.log(e);
  }
  // markertap(e) {
  //   console.log(e.markerId);
  // }
  // controltap(e) {
  //   console.log(e.controlId);
  // }
  async getData() {
    await activityDetail(this.activityId, this.language).then(res => {
      this.option = res;
      console.log(this.option);
    });
  }
  async onShow() {
    this.language = wx.getStorageSync('language');
    if (this.language == 'ZH') {
      wx.setNavigationBarTitle({
        title: '地图'
      });
    } else {
      wx.setNavigationBarTitle({
        title: 'Map'
      });
    }
    await this.getData();
    if (this.index == 0) {
      this.index++;
    } else {
      wx.navigateBack({
        delta: 1
      });
    }
  }
  onLoad(e) {
    this.activityId = e.id;
    this.index = 0;
  }
}
</script>