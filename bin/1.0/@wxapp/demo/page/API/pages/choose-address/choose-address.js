'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '收货地址',
      path: 'page/API/pages/choose-address/choose-address'
    };
  },


  data: {
    addressInfo: null
  },
  chooseAddress: function chooseAddress() {
    var _this = this;

    wx.chooseAddress({
      success: function success(res) {
        _this.setData({
          addressInfo: res
        });
      },
      fail: function fail(err) {
        console.log(err);
      }
    });
  }
});