'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: 'movable-view',
      path: 'page/component/pages/movable-view/movable-view'
    };
  },


  data: {
    x: 0,
    y: 0,
    scale: 2
  },

  tap: function tap() {
    this.setData({
      x: 30,
      y: 30
    });
  },
  tap2: function tap2() {
    this.setData({
      scale: 3
    });
  },
  onChange: function onChange(e) {
    console.log(e.detail);
  },
  onScale: function onScale(e) {
    console.log(e.detail);
  }
});