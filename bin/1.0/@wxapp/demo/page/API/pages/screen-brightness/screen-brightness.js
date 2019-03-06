'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '屏幕亮度',
      path: 'page/API/pages/screen-brightness/screen-brightness'
    };
  },


  data: {
    screenBrightness: 0
  },

  onLoad: function onLoad() {
    this._updateScreenBrightness();
  },
  changeBrightness: function changeBrightness(e) {
    var _this = this;

    var value = Number.parseFloat(e.detail.value.toFixed(1));
    wx.setScreenBrightness({
      value: value,
      success: function success() {
        _this._updateScreenBrightness();
      }
    });
  },
  _updateScreenBrightness: function _updateScreenBrightness() {
    var _this2 = this;

    wx.getScreenBrightness({
      success: function success(res) {
        _this2.setData({
          screenBrightness: Number.parseFloat(res.value.toFixed(1))
        });
      },
      fail: function fail(err) {
        console.error(err);
      }
    });
  }
});