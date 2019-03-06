'use strict';

var info = wx.getSystemInfoSync();

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: 'ad',
      path: 'page/component/pages/ad/ad'
    };
  },


  data: {
    platform: info.platform
  }
});