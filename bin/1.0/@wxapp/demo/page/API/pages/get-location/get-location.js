'use strict';

var util = require('../../../../util/util.js');

var formatLocation = util.formatLocation;

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '获取位置',
      path: 'page/API/pages/get-location/get-location'
    };
  },


  data: {
    hasLocation: false
  },
  getLocation: function getLocation() {
    var that = this;
    wx.getLocation({
      success: function success(res) {
        console.log(res);
        that.setData({
          hasLocation: true,
          location: formatLocation(res.longitude, res.latitude)
        });
      }
    });
  },
  clear: function clear() {
    this.setData({
      hasLocation: false
    });
  }
});