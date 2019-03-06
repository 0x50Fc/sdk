'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '获取用户信息',
      path: 'page/API/pages/get-user-info/get-user-info'
    };
  },


  data: {
    hasUserInfo: false
  },
  getUserInfo: function getUserInfo(info) {
    var userInfo = info.detail.userInfo;
    this.setData({
      userInfo: userInfo,
      hasUserInfo: true
    });
  },
  clear: function clear() {
    this.setData({
      hasUserInfo: false,
      userInfo: {}
    });
  }
});