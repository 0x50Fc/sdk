'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '监听罗盘数据',
      path: 'page/API/pages/on-compass-change/on-compass-change'
    };
  },


  data: {
    enabled: true,
    direction: 0
  },
  onReady: function onReady() {
    var that = this;
    wx.onCompassChange(function (res) {
      that.setData({
        direction: parseInt(res.direction, 10)
      });
    });
  },
  startCompass: function startCompass() {
    if (this.data.enabled) {
      return;
    }
    var that = this;
    wx.startCompass({
      success: function success() {
        that.setData({
          enabled: true
        });
      }
    });
  },
  stopCompass: function stopCompass() {
    if (!this.data.enabled) {
      return;
    }
    var that = this;
    wx.stopCompass({
      success: function success() {
        that.setData({
          enabled: false
        });
      }
    });
  }
});