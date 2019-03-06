'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '下拉刷新',
      path: 'page/API/pages/pull-down-refresh/pull-down-refresh'
    };
  },
  onPullDownRefresh: function onPullDownRefresh() {
    wx.showToast({
      title: 'loading...',
      icon: 'loading'
    });
    console.log('onPullDownRefresh', new Date());
  },
  stopPullDownRefresh: function stopPullDownRefresh() {
    wx.stopPullDownRefresh({
      complete: function complete(res) {
        wx.hideToast();
        console.log(res, new Date());
      }
    });
  }
});