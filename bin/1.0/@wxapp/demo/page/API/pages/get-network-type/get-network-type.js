'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '获取手机网络状态',
      path: 'page/API/pages/get-network-type/get-network-type'
    };
  },


  data: {
    hasNetworkType: false
  },
  getNetworkType: function getNetworkType() {
    var that = this;
    wx.getNetworkType({
      success: function success(res) {
        console.log(res);
        that.setData({
          hasNetworkType: true,
          networkType: res.subtype || res.networkType
        });
      }
    });
  },
  clear: function clear() {
    this.setData({
      hasNetworkType: false,
      networkType: ''
    });
  }
});