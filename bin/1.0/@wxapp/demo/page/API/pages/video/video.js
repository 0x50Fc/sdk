'use strict';

var sourceType = [['camera'], ['album'], ['camera', 'album']];
var camera = [['front'], ['back'], ['front', 'back']];

// eslint-disable-next-line
var duration = Array.apply(null, { length: 60 }).map(function (n, i) {
  return i + 1;
});

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '拍摄/选择视频',
      path: 'page/API/pages/video/video'
    };
  },


  data: {
    sourceTypeIndex: 2,
    sourceType: ['拍摄', '相册', '拍摄或相册'],

    cameraIndex: 2,
    camera: ['前置', '后置', '前置或后置'],

    durationIndex: 59,
    duration: duration.map(function (t) {
      return t + '秒';
    }),

    src: ''
  },
  sourceTypeChange: function sourceTypeChange(e) {
    this.setData({
      sourceTypeIndex: e.detail.value
    });
  },
  cameraChange: function cameraChange(e) {
    this.setData({
      cameraIndex: e.detail.value
    });
  },
  durationChange: function durationChange(e) {
    this.setData({
      durationIndex: e.detail.value
    });
  },
  chooseVideo: function chooseVideo() {
    var that = this;
    wx.chooseVideo({
      sourceType: sourceType[this.data.sourceTypeIndex],
      camera: camera[this.data.cameraIndex],
      maxDuration: duration[this.data.durationIndex],
      success: function success(res) {
        that.setData({
          src: res.tempFilePath
        });
      }
    });
  }
});