'use strict';

var app = getApp();
Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '微信登录',
      path: 'page/API/pages/login/login'
    };
  },
  onLoad: function onLoad() {
    this.setData({
      hasLogin: app.globalData.hasLogin
    });
  },

  data: {},
  login: function login() {
    var that = this;
    wx.login({
      success: function success() {
        app.globalData.hasLogin = true;
        that.setData({
          hasLogin: true
        });
      }
    });
  }
});