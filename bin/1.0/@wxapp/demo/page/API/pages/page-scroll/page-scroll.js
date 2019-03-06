'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '页面滚动',
      path: 'page/API/pages/page-scroll/page-scroll'
    };
  },
  scrollToTop: function scrollToTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    });
  },
  scrollToBottom: function scrollToBottom() {
    wx.pageScrollTo({
      scrollTop: 3000,
      duration: 300
    });
  }
});