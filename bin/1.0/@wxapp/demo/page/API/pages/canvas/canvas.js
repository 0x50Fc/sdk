'use strict';

var example = require('./example.js');

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '创建画布',
      path: 'page/API/pages/canvas/canvas'
    };
  },
  onLoad: function onLoad() {
    this.context = wx.createContext();

    var methods = Object.keys(example);
    this.setData({
      methods: methods
    });

    var that = this;
    methods.forEach(function (method) {
      that[method] = function () {
        example[method](that.context);
        var actions = that.context.getActions();

        wx.drawCanvas({
          canvasId: 'canvas',
          actions: actions
        });
      };
    });
  },
  toTempFilePath: function toTempFilePath() {
    wx.canvasToTempFilePath({
      canvasId: 'canvas',
      success: function success(res) {
        console.log(res);
      },
      fail: function fail(res) {
        console.log(res);
      }
    });
  }
});