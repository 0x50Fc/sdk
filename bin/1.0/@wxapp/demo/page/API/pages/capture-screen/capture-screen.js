'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '用户截屏事件',
      path: 'page/API/pages/capture-screen/capture-screen'
    };
  },


  data: {
    captured: false
  },
  onLoad: function onLoad() {
    var _this = this;

    wx.onUserCaptureScreen(function () {
      _this.setData({
        captured: true
      });
    });
  }
});