'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: 'navigatePage',
      path: 'page/component/pages/navigator/navigate'
    };
  },
  onLoad: function onLoad(options) {
    console.log(options);
    this.setData({
      title: options.title
    });
  }
});