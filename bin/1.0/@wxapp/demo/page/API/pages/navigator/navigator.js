'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '页面跳转',
      path: 'page/API/pages/navigator/navigator'
    };
  },
  navigateTo: function navigateTo() {
    wx.navigateTo({ url: './navigator' });
  },
  navigateBack: function navigateBack() {
    wx.navigateBack();
  },
  redirectTo: function redirectTo() {
    wx.redirectTo({ url: './navigator' });
  },
  switchTab: function switchTab() {
    wx.switchTab({ url: '/page/component/index' });
  },
  reLaunch: function reLaunch() {
    wx.reLaunch({ url: '/page/component/index' });
  }
});