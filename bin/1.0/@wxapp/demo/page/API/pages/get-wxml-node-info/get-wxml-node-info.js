'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '获取WXML节点信息',
      path: 'page/API/pages/get-wxml-node-info/get-wxml-node-info'
    };
  },


  data: {
    metrics: []
  },

  onReady: function onReady() {
    this.getNodeInfo();
  },
  getNodeInfo: function getNodeInfo() {
    var _this = this;

    var $ = wx.createSelectorQuery();
    var target = $.select('.target');
    target.boundingClientRect();

    $.exec(function (res) {
      var rect = res[0];
      if (rect) {
        var metrics = [];
        // eslint-disable-next-line
        for (var key in rect) {
          if (key !== 'id' && key !== 'dataset') {
            var val = rect[key];
            metrics.push({ key: key, val: val });
          }
        }

        _this.setData({ metrics: metrics });
      }
    });
  }
});