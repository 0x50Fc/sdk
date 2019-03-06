'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: 'WXML节点布局相交状态',
      path: 'page/API/pages/intersection-observer/intersection-observer'
    };
  },


  data: {
    appear: false
  },
  onLoad: function onLoad() {
    var _this = this;

    this._observer = wx.createIntersectionObserver(this);
    this._observer.relativeTo('.scroll-view').observe('.ball', function (res) {
      console.log(res);
      _this.setData({
        appear: res.intersectionRatio > 0
      });
    });
  },
  onUnload: function onUnload() {
    if (this._observer) this._observer.disconnect();
  }
});