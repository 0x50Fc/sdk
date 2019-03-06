'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: 'redirectPage',
      path: 'page/component/pages/navigator/redirect'
    };
  },
  onLoad: function onLoad(options) {
    console.log(options);
    this.setData({
      title: options.title
    });
  }
});