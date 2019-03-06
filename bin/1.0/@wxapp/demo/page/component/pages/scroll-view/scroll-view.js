'use strict';

var order = ['demo1', 'demo2', 'demo3'];

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: 'scroll-view',
      path: 'page/component/pages/scroll-view/scroll-view'
    };
  },


  data: {
    toView: 'green'
  },

  upper: function upper(e) {
    console.log(e);
  },
  lower: function lower(e) {
    console.log(e);
  },
  scroll: function scroll(e) {
    console.log(e);
  },
  scrollToTop: function scrollToTop() {
    this.setAction({
      scrollTop: 0
    });
  },
  tap: function tap() {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        });
        break;
      }
    }
  },
  tapMove: function tapMove() {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    });
  }
});