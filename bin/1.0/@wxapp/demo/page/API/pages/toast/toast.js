'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '消息提示框',
      path: 'page/API/pages/toast/toast'
    };
  },
  toast1Tap: function toast1Tap() {
    wx.showToast({
      title: '默认'
    });
  },
  toast2Tap: function toast2Tap() {
    wx.showToast({
      title: 'duration 3000',
      duration: 3000
    });
  },
  toast3Tap: function toast3Tap() {
    wx.showToast({
      title: 'loading',
      icon: 'loading',
      duration: 5000
    });
  },
  hideToast: function hideToast() {
    wx.hideToast();
  }
});