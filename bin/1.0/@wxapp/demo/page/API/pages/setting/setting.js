'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '设置',
      path: 'page/API/pages/setting/setting'
    };
  },


  data: {
    setting: {}
  },

  getSetting: function getSetting() {
    var _this = this;

    wx.getSetting({
      success: function success(res) {
        console.log(res);
        _this.setData({ setting: res.authSetting });
      }
    });
  }
});