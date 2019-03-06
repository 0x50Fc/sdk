'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '文件',
      path: 'page/API/pages/file/file'
    };
  },
  onLoad: function onLoad() {
    this.setData({
      savedFilePath: wx.getStorageSync('savedFilePath')
    });
  },

  data: {
    tempFilePath: '',
    savedFilePath: '',
    dialog: {
      hidden: true
    }
  },
  chooseImage: function chooseImage() {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function success(res) {
        that.setData({
          tempFilePath: res.tempFilePaths[0]
        });
      }
    });
  },
  saveFile: function saveFile() {
    if (this.data.tempFilePath.length > 0) {
      var that = this;
      wx.saveFile({
        tempFilePath: this.data.tempFilePath,
        success: function success(res) {
          that.setData({
            savedFilePath: res.savedFilePath
          });
          wx.setStorageSync('savedFilePath', res.savedFilePath);
          that.setData({
            dialog: {
              title: '保存成功',
              content: '下次进入应用时，此文件仍可用',
              hidden: false
            }
          });
        },
        fail: function fail() {
          that.setData({
            dialog: {
              title: '保存失败',
              content: '应该是有 bug 吧',
              hidden: false
            }
          });
        }
      });
    }
  },
  clear: function clear() {
    wx.setStorageSync('savedFilePath', '');
    this.setData({
      tempFilePath: '',
      savedFilePath: ''
    });
  },
  confirm: function confirm() {
    this.setData({
      'dialog.hidden': true
    });
  }
});