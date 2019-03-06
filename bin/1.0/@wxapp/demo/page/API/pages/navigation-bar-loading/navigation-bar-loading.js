'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '标题栏加载动画',
      path: 'page/API/pages/navigation-bar-loading/navigation-bar-loading'
    };
  },
  showNavigationBarLoading: function showNavigationBarLoading() {
    wx.showNavigationBarLoading();
  },
  hideNavigationBarLoading: function hideNavigationBarLoading() {
    wx.hideNavigationBarLoading();
  }
});