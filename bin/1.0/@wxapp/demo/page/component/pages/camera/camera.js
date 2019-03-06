'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: 'camera',
      path: 'page/component/pages/camera/camera'
    };
  },


  data: {
    src: '',
    videoSrc: '',
    position: 'back',
    mode: 'scanCode',
    result: {}
  },
  onLoad: function onLoad() {
    this.ctx = wx.createCameraContext();
  },
  takePhoto: function takePhoto() {
    var _this = this;

    this.ctx.takePhoto({
      quality: 'high',
      success: function success(res) {
        _this.setData({
          src: res.tempImagePath
        });
      }
    });
  },
  startRecord: function startRecord() {
    this.ctx.startRecord({
      success: function success() {
        console.log('startRecord');
      }
    });
  },
  stopRecord: function stopRecord() {
    var _this2 = this;

    this.ctx.stopRecord({
      success: function success(res) {
        _this2.setData({
          src: res.tempThumbPath,
          videoSrc: res.tempVideoPath
        });
      }
    });
  },
  togglePosition: function togglePosition() {
    this.setData({
      position: this.data.position === 'front' ? 'back' : 'front'
    });
  },
  error: function error(e) {
    console.log(e.detail);
  }
});