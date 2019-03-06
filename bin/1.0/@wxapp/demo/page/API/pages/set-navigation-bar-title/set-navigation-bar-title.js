'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '设置页面标题',
      path: 'page/API/pages/set-navigation-bar-title/set-navigation-bar-title'
    };
  },
  setNaivgationBarTitle: function setNaivgationBarTitle(e) {
    var title = e.detail.value.title;
    console.log(title);
    wx.setNavigationBarTitle({
      title: title,
      success: function success() {
        console.log('setNavigationBarTitle success');
      },
      fail: function fail(err) {
        console.log('setNavigationBarTitle fail, err is', err);
      }
    });

    return false;
  }
});