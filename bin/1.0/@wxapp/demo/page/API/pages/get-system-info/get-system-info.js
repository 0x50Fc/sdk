'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '获取手机系统信息',
      path: 'page/API/pages/get-system-info/get-system-info'
    };
  },


  data: {
    systemInfo: {}
  },
  getSystemInfo: function getSystemInfo() {
    var that = this;
    wx.getSystemInfo({
      success: function success(res) {
        that.setData({
          systemInfo: res
        });
      }
    });
  }
});