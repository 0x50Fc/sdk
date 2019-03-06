'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '监听手机网络变化',
      path: 'page/API/pages/on-network-status-change/on-network-status-change'
    };
  },


  data: {
    isConnected: false
  },
  onLoad: function onLoad() {
    var that = this;
    wx.onNetworkStatusChange(function (res) {
      that.setData({
        isConnected: res.isConnected,
        networkType: res.networkType
      });
    });
  },
  onShow: function onShow() {
    var that = this;
    wx.getNetworkType({
      success: function success(res) {
        that.setData({
          isConnected: res.networkType !== 'none',
          networkType: res.networkType
        });
      }
    });
  }
});