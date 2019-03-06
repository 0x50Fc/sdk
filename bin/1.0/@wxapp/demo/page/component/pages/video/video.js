'use strict';

function getRandomColor() {
  var rgb = [];
  for (var i = 0; i < 3; ++i) {
    var color = Math.floor(Math.random() * 256).toString(16);
    color = color.length === 1 ? '0' + color : color;
    rgb.push(color);
  }
  return '#' + rgb.join('');
}

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: 'video',
      path: 'page/component/pages/video/video'
    };
  },
  onReady: function onReady() {
    this.videoContext = wx.createVideoContext('myVideo');
  },


  inputValue: '',
  data: {
    src: '',
    danmuList: [{
      text: '第 1s 出现的弹幕',
      color: '#ff0000',
      time: 1
    }, {
      text: '第 3s 出现的弹幕',
      color: '#ff00ff',
      time: 3
    }]
  },

  bindInputBlur: function bindInputBlur(e) {
    this.inputValue = e.detail.value;
  },
  bindButtonTap: function bindButtonTap() {
    var that = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: function success(res) {
        that.setData({
          src: res.tempFilePath
        });
      }
    });
  },
  bindSendDanmu: function bindSendDanmu() {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    });
  },
  videoErrorCallback: function videoErrorCallback(e) {
    console.log('视频错误信息:');
    console.log(e.detail.errMsg);
  }
});