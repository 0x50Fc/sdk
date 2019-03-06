'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '振动',
      path: 'page/API/pages/vibrate/vibrate'
    };
  },
  vibrateShort: function vibrateShort() {
    wx.vibrateShort({
      success: function success(res) {
        console.log(res);
      },
      fail: function fail(err) {
        console.error(err);
      },
      complete: function complete() {
        console.log('completed');
      }
    });
  },
  vibrateLong: function vibrateLong() {
    wx.vibrateLong({
      success: function success(res) {
        console.log(res);
      },
      fail: function fail(err) {
        console.error(err);
      },
      complete: function complete() {
        console.log('completed');
      }
    });
  }
});