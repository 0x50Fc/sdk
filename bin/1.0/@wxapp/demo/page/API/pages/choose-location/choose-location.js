'use strict';

var util = require('../../../../util/util.js');

var formatLocation = util.formatLocation;

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '使用原生地图选择位置',
      path: 'page/API/pages/choose-location/choose-location'
    };
  },


  data: {
    hasLocation: false
  },
  chooseLocation: function chooseLocation() {
    var that = this;
    wx.chooseLocation({
      success: function success(res) {
        console.log(res);
        that.setData({
          hasLocation: true,
          location: formatLocation(res.longitude, res.latitude),
          locationAddress: res.address
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