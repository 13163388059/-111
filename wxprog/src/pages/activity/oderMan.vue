
<style lang="less">
page {
  background: #f2f2f2;
}

.information-list {
  width: 670rpx;
  height: 100rpx;
  padding: 0 40rpx;
  background: #ffffff;
  border-bottom: 2rpx solid #ececec;
  line-height: 100rpx;
  font-size: 28rpx;
  color: #9b9b9b;
}

.information-list-frist {
  color: #333;
}

.information-list input {
  width: 430rpx;
  height: 100%;
  float: right;
}

.information-list text {
  color: #a90202;
}

.next {
  width: 100%;
  height: 96rpx;
  line-height: 96rpx;
  text-align: center;
  background: #a90202;
  color: #fff;
  position: fixed;
  bottom: 0;
}

.huise {
  background: #c9c9c9;
}

.information-list .c-input {
  width: 530rpx;
}

.picker-box {
  width: 100rpx;
  height: 100%;
  float: right;
}

.information-list .input-photo {
  width: 430rpx;
  float: right;
}

.picker {
  width: 100rpx;
  height: 100rpx;
}
</style>
<template>
  <view class="container">
    <view class="information-list information-list-frist">{{language=='ZH'?'报名人信息':'Registration'}}</view>
    <view class="information-list ">{{language=='ZH'?'姓名':'Name'}}<text>*</text><iamge></iamge><input value="{{isName}}" class="{{language=='ZH'?'c-input':''}}" bindblur="inputName"/></view>
    <view class="information-list ">{{language=='ZH'?'手机号':'Phone Number'}}<text>*</text>
    <input value="{{isPhone}}" class="input-photo {{language=='ZH'?'c-input':''}}" bindblur="inputPhone"/>
    <picker class="picker-box" bindchange="bindPickerChange" value="{{index}}" range="{{array}}">
        <view class="picker">{{array[index]}}</view>
      </picker>
    </view>
    <view class="information-list ">{{language=='ZH'?'邮箱':'Email'}}<text>*</text><iamge></iamge><input value="{{isEmail}}" class="{{language=='ZH'?'c-input':''}}" bindblur="inputEmail"/></view>
    <view class="information-list ">{{language=='ZH'?'公司名称':'Company'}}<input value="{{isCompany}}" class="{{language=='ZH'?'c-input':''}}" bindblur="inputCompany"/></view>
    <view class="information-list ">{{language=='ZH'?'职务':'Post'}}<input value="{{isPost}}" class="{{language=='ZH'?'c-input':''}}" bindblur="inputPost"/><input/></view>
    <view class="next {{isToNext?'':'huise'}}" catchtap="navigateTo">{{language=='ZH'?'下一步':'Next'}}</view>
  </view>
</template>

<script>
import wepy from 'wepy';
import Toast from 'wepy-com-toast';

export default class OderMan extends wepy.page {
  config = {};
  components = {};

  data = {
    language: 'ZH',
    isName: '',
    isPhone: '',
    isEmail: '',
    isCompany: '',
    isPost: '',
    isToNext: false,
    ticketId: 0,
    number: 1,
    activityId: 0,
    userInfo: {},
    array: [
      '086',
      '030',
      '031',
      '032',
      '033',
      '034',
      '039',
      '040',
      '041',
      '043',
      '044',
      '045',
      '0223',
      '0336',
      '0338',
      '0349',
      '0350',
      '0351',
      '0352',
      '0353',
      '0354',
      '0355',
      '0356',
      '0357',
      '0358',
      '0359',
      '0396',
      '04175'
    ],
    index: 0,
    countryNumber: '0086'
  };

  computed = {};

  methods = {
    navigateTo() {
      if (this.isToNext == false) {
        return;
      }
      wx.setStorageSync('userInfo', {
        apply_phone: this.array[this.index],
        remark1: this.isName,
        remark2: this.isPhone,
        remark3: this.isEmail,
        remark4: this.isCompany,
        remark5: this.isPost
      });
      wx.navigateTo({
        url:
          'oderSure?activityId=' +
          this.activityId +
          '&number=' +
          this.number +
          '&ticketId=' +
          this.ticketId
      });
    },
    inputName(e) {
      this.isName = e.detail.value;
      if (this.isName !== '' && this.isPhone !== '' && this.isEmail !== '') {
        this.isToNext = true;
      } else {
        this.isToNext = false;
      }
    },
    inputPhone(e) {
      var that = this;
      var myreg = /^[1][0-9]{10}$/;
      if (!myreg.test(e.detail.value)) {
        wx.showToast({
          title:
            that.language == 'ZH'
              ? '手机号错误'
              : 'please enter the right phone number',
          icon: 'none',
          duration: 1000,
          mask: true
        });
        return;
      }
      this.isPhone = e.detail.value;
      if (this.isName !== '' && this.isPhone !== '' && this.isEmail !== '') {
        this.isToNext = true;
      } else {
        this.isToNext = false;
      }
    },
    inputEmail(e) {
      var that = this;
      var myreg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (!myreg.test(e.detail.value)) {
        wx.showToast({
          title:
            that.language == 'ZH'
              ? '邮箱错误'
              : 'Please enter valid Email address',
          icon: 'none',
          duration: 1000,
          mask: true
        });
        return;
      }
      this.isEmail = e.detail.value;
      if (this.isName !== '' && this.isPhone !== '' && this.isEmail !== '') {
        this.isToNext = true;
      } else {
        this.isToNext = false;
      }
    },
    inputCompany(e) {
      this.isCompany = e.detail.value;
    },
    inputPost(e) {
      this.isPost = e.detail.value;
    },
    bindPickerChange(e) {
      this.index = e.detail.value;
    }
  };
  events = {};
  async onShow() {}

  async onLoad(e) {
    this.activityId = e.activityId;
    this.number = e.number;
    this.ticketId = e.ticketId;
    this.language = wx.getStorageSync('language');
    this.userInfo = wx.getStorageSync('userInfo');
    if (this.userInfo.remark1 !== undefined) {
      this.isName = this.userInfo.remark1;
      this.isPhone = this.userInfo.remark2;
      this.isEmail = this.userInfo.remark3;
      this.isCompany = this.userInfo.remark4;
      this.isPost = this.userInfo.remark5;
      for (var i = 0; i < this.array.length; i++) {
        if (this.userInfo.apply_phone == this.array[i]) {
          this.index = i;
        }
      }
      this.isToNext = true;
    } else {
      this.index = 0;
    }
    if (this.language == 'ZH') {
      wx.setNavigationBarTitle({
        title: '报名信息'
      });
    } else {
      wx.setNavigationBarTitle({
        title: 'Registration'
      });
    }
  }
}
</script>