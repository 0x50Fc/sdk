'use strict';

var app = getApp();
var util = require('../../../../util/util.js');

var dataUrl = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46';
Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '背景音乐',
      path: 'page/API/pages/background-audio/background-audio'
    };
  },
  onLoad: function onLoad() {
    this._enableInterval();

    if (app.globalData.backgroundAudioPlaying) {
      this.setData({
        playing: true
      });
    }
  },

  data: {
    playing: false,
    playTime: 0,
    formatedPlayTime: '00:00:00'
  },
  play: function play() {
    var that = this;
    wx.playBackgroundAudio({
      dataUrl: dataUrl,
      title: '此时此刻',
      coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      complete: function complete() {
        that.setData({
          playing: true
        });
      }
    });
    this._enableInterval();
    app.globalData.backgroundAudioPlaying = true;
  },
  seek: function seek(e) {
    clearInterval(this.updateInterval);
    var that = this;
    wx.seekBackgroundAudio({
      position: e.detail.value,
      complete: function complete() {
        // 实际会延迟两秒左右才跳过去
        setTimeout(function () {
          that._enableInterval();
        }, 2000);
      }
    });
  },
  pause: function pause() {
    var that = this;
    wx.pauseBackgroundAudio({
      dataUrl: dataUrl,
      success: function success() {
        that.setData({
          playing: false
        });
      }
    });
    app.globalData.backgroundAudioPlaying = false;
  },
  stop: function stop() {
    var that = this;
    wx.stopBackgroundAudio({
      dataUrl: dataUrl,
      success: function success() {
        that.setData({
          playing: false,
          playTime: 0,
          formatedPlayTime: util.formatTime(0)
        });
      }
    });
    app.globalData.backgroundAudioPlaying = false;
  },
  _enableInterval: function _enableInterval() {
    var that = this;
    function update() {
      wx.getBackgroundAudioPlayerState({
        success: function success(res) {
          that.setData({
            playTime: res.currentPosition,
            formatedPlayTime: util.formatTime(res.currentPosition + 1)
          });
        }
      });
    }

    update();
    this.updateInterval = setInterval(update, 500);
  },
  onUnload: function onUnload() {
    clearInterval(this.updateInterval);
  }
});