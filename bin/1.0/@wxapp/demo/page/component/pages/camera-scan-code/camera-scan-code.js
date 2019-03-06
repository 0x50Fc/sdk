'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: 'camera',
      path: 'page/component/pages/camera-scan-code/camera-scan-code'
    };
  },


  data: {
    result: {}
  },
  onReady: function onReady() {
    wx.showModal({
      title: '提示',
      content: '将摄像头对准一维码即可扫描',
      showCancel: false
    });
  },
  scanCode: function scanCode(e) {
    console.log('scanCode:', e);
    this.setData({
      result: e.detail
    });
  },
  navigateBack: function navigateBack() {
    wx.navigateBack();
  },
  error: function error(e) {
    console.log(e.detail);
  }
});