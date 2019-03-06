'use strict';

var downloadExampleUrl = require('../../../../config').downloadExampleUrl;

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '下载文件',
      path: 'page/API/pages/download-file/download-file'
    };
  },
  downloadImage: function downloadImage() {
    var self = this;

    wx.downloadFile({
      url: downloadExampleUrl,
      success: function success(res) {
        console.log('downloadFile success, res is', res);

        self.setData({
          imageSrc: res.tempFilePath
        });
      },
      fail: function fail(_ref) {
        var errMsg = _ref.errMsg;

        console.log('downloadFile fail, err is:', errMsg);
      }
    });
  }
});