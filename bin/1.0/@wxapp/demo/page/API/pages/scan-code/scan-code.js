'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '扫码',
      path: 'page/API/pages/scan-code/scan-code'
    };
  },


  data: {
    result: ''
  },

  scanCode: function scanCode() {
    var that = this;
    wx.scanCode({
      success: function success(res) {
        that.setData({
          result: res.result
        });
      },
      fail: function fail() {}
    });
  }
});