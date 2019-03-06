'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '动态加载字体',
      path: 'page/API/pages/load-font-face/load-font-face'
    };
  },


  data: {
    fontFamily: 'Bitstream Vera Serif Bold',
    loaded: false
  },

  onLoad: function onLoad() {
    this.setData({
      loaded: false
    });
  },
  loadFontFace: function loadFontFace() {
    var self = this;
    wx.loadFontFace({
      family: this.data.fontFamily,
      source: 'url("https://sungd.github.io/Pacifico.ttf")',
      success: function success(res) {
        console.log(res.status);
        self.setData({ loaded: true });
      },
      fail: function fail(res) {
        console.log(res.status);
      },
      complete: function complete(res) {
        console.log(res.status);
      }
    });
  },
  clear: function clear() {
    this.setData({ loaded: false });
  }
});