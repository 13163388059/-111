
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

.avt {
  height: 158rpx;
  line-height: 158rpx;
}

.avatar {
  width: 100rpx;
  height: 104rpx;
  float: right;
  margin-top: 27rpx;
}

.right-content {
  float: right;
  color: #999999;
  height: 104rpx;
}

.gender-icon {
  width: 16rpx;
  height: 8rpx;
  float: right;
  margin-left: 24rpx;
  margin-top: 45rpx;
}

.nav-icon {
  width: 17rpx;
  height: 34rpx;
  float: right;
  margin-left: 23rpx;
  margin-top: 32rpx;
}

.gender {
  position: relative;
}

.all-box {
  width: 198rpx;
  height: 160rpx;
  background: #ffffff;
  box-shadow: 0 4px 8px 0 #8d8c8d;
  border-radius: 2px;
  padding-left: 30rpx;
  position: absolute;
  top: 54rpx;
  right: 0;
  z-index: 10;
}

.all-box view {
  line-height: 78rpx;
  font-family: PingFangSC-Medium;
  font-size: 26rpx;
  color: #000000;
  border-bottom: 2px solid #e5e3e3;
}

.all-box view:last-child {
  border: 0;
}

.country {
  margin-bottom: 16rpx;
}

input {
  text-align: right;
  width: 500rpx;
}
</style>
<template>
  <view class="container">
      <!-- <button open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo">授权登录</button> -->
    <view class="data-list avt">{{language=='ZH'?'头像':'Profile Photo'}}<image catchtap="getAvatar"  mode="aspectFill" class="avatar" src="{{userInfo.photo==undefined?'http://pc1u34h1m.bkt.clouddn.com/headerImg.png':userInfo.photo}}"/></view>
    <!-- <view class="data-list">昵称<view class="right-content">{{userInfo.nickName}}</view></view> -->
    <view class="data-list">{{language=='ZH'?'昵称':'Name'}}<input maxlength="30" bindinput="getChange" bindblur="putChange" data-set="nameWidth" value="{{userInfo.nickname}}" class="right-content"/></view>
      <view class="data-list" catchtap="getPhone">{{language=='ZH'?'手机号':'Phone Number'}}<view class="right-content">{{userInfo.cellphone}}<image  mode="aspectFill" class="nav-icon" src="http://pc1u34h1m.bkt.clouddn.com/right%403x.png"></image></view></view>
      <view class="data-list" catchtap="getEmail">{{language=='ZH'?'邮箱':'Email'}}<view class="right-content">{{userInfo.userName}}<image  mode="aspectFill" class="nav-icon" src="http://pc1u34h1m.bkt.clouddn.com/right%403x.png"></image></view></view>

    <view class="data-list">{{language=='ZH'?'性别':'Gender'}}
        <view catchtap="openSollect" class="right-content gender">{{userInfo.gender=='MALE'?language=='ZH'?'男':'Male':language=='ZH'?'女':'Female'}}<image class="gender-icon" src="http://pc1u34h1m.bkt.clouddn.com/triangle%403x.png"></image>
           <view wx:if="{{sollectGender}}" class="all-box">
                <view data-set="MALE" catchtap="selectScreen">{{language=='ZH'?'男':'MALE'}}</view>
                <view data-set="FEMALE" catchtap="selectScreen">{{language=='ZH'?'女':'FEMALE'}}</view>
           </view>
       </view> 
    </view>
    <view class="data-list country" catchtap="countryTo">{{language=='ZH'?'国籍':'Nationality'}}<view class="right-content">{{userInfo.country}}<image  mode="aspectFill" class="nav-icon" src="http://pc1u34h1m.bkt.clouddn.com/right%403x.png"></image></view></view>
    <view class="data-list">{{language=='ZH'?'公司':'Company'}}<input maxlength="20" value="{{userInfo.company}}" placeholder="{{language=='ZH'?'请输入':'Please enter'}}" data-set="bussWidth" bindinput="getChange" bindblur="putChange"  class="right-content"/></view>
    <view class="data-list">{{language=='ZH'?'职务':'Post'}}<input maxlength="20" value="{{userInfo.position}}" placeholder="{{language=='ZH'?'请输入':'Please enter'}}" data-set="jobWidth" bindinput="getChange" bindblur="putChange" class="right-content"/></view>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';
import { putUserInfo } from '../../api/index';

export default class CourseSearch extends wepy.page {
  config = {};
  components = {};

  data = {
    userInfo: {},
    nameWidth: 28,
    bussWidth: 28,
    jobWidth: 28,
    sollectGender: false,
    language: 'ZH'
  };

  computed = {};

  methods = {
    // bindGetUserInfo(e) {
    //   wx.setStorageSync('userInfo', e.detail.userInfo);
    // },
    getChange(e) {
      if (e.currentTarget.dataset.set == 'nameWidth') {
        this.userInfo.nickname = e.detail.value;
      } else if (e.currentTarget.dataset.set == 'bussWidth') {
        this.userInfo.company = e.detail.value;
      } else if (e.currentTarget.dataset.set == 'jobWidth') {
        this.userInfo.position = e.detail.value;
      }
    },
    putChange(e) {
      var allData = '';
      if (e.currentTarget.dataset.set == 'nameWidth') {
        if (
          this.userInfo.nickname == wx.getStorageSync('importantInfo').nickname
        ) {
          return;
        }
        this.userInfo.nickname = e.detail.value;
      } else if (e.currentTarget.dataset.set == 'bussWidth') {
        if (
          this.userInfo.company == wx.getStorageSync('importantInfo').company
        ) {
          return;
        }
        this.userInfo.company = e.detail.value;
      } else if (e.currentTarget.dataset.set == 'jobWidth') {
        if (
          this.userInfo.position == wx.getStorageSync('importantInfo').position
        ) {
          return;
        }
        this.userInfo.position = e.detail.value;
      }
      this.putUser();
    },
    selectScreen(e) {
      this.sollectGender = false;
      this.userInfo.gender = e.currentTarget.dataset.set;
      this.putUser();
    },
    openSollect() {
      this.sollectGender = true;
    },
    countryTo() {
      wx.navigateTo({
        url: 'chooseCountry'
      });
    },
    getPhone() {
      wx.navigateTo({
        url: '/pages/me/getPhone'
      });
    },
    getEmail() {
      wx.navigateTo({
        url: '/pages/me/getEmail'
      });
    },
    async getAvatar() {
      var that = this;
      await wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          wx.uploadFile({
            url:
              'http://shangdao.dev.sudaotech.com/api/app/file/oss/qiniu/upload?prefix=IMG',
            filePath: tempFilePaths[0],
            name: 'file',
            success: function(res) {
              var data = JSON.parse(res.data);
              that.userInfo.photo = data.fileName;
              that.putUser();
            }
          });
        }
      });
    }
  };
  async putUser() {
    var that = this;
    await putUserInfo({
      nickname: this.userInfo.nickname,
      company: this.userInfo.company,
      position: this.userInfo.position,
      photo: this.userInfo.photo,
      gender: this.userInfo.gender
    }).then(res => {
      if (res.status == true) {
        wx.showToast({
          title: that.language == 'ZH' ? '修改成功' : 'Amend success',
          icon: 'success',
          duration: 500,
          mask: true
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
    wx.setStorageSync('importantInfo', this.userInfo);
    this.$apply();
  }
  async init() {
    this.language = wx.getStorageSync('language');
    this.userInfo = wx.getStorageSync('importantInfo');
    var myreg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    if (!myreg.test(this.userInfo.userName)) {
      this.userInfo.userName = '';
    }
    if (this.userInfo.company == undefined) {
      this.userInfo.company = '';
    }
    if (this.userInfo.position == undefined) {
      this.userInfo.position = '';
    }
  }
  events = {};
  onShow() {
    this.init();
    if (this.language == 'ZH') {
      wx.setNavigationBarTitle({
        title: '个人资料'
      });
    } else {
      wx.setNavigationBarTitle({
        title: 'Personal data'
      });
    }
  }
  onLoad() {}
}
</script>