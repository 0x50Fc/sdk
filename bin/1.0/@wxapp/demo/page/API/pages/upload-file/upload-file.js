'use strict';

var uploadFileUrl = require('../../../../config').uploadFileUrl;

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '上传文件',
      path: 'page/API/pages/upload-file/upload-file'
    };
  },
  chooseImage: function chooseImage() {
    var self = this;

    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function success(res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths[0]);

        var imageSrc = res.tempFilePaths[0];

        wx.uploadFile({
          url: uploadFileUrl,
          filePath: imageSrc,
          name: 'data',
          success: function success(res) {
            console.log('uploadImage success, res is:', res);

            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 1000
            });

            self.setData({
              imageSrc: imageSrc
            });
          },
          fail: function fail(_ref) {
            var errMsg = _ref.errMsg;

            console.log('uploadImage fail, errMsg is', errMsg);
          }
        });
      },
      fail: function fail(_ref2) {
        var errMsg = _ref2.errMsg;

        console.log('chooseImage fail, err is', errMsg);
      }
    });
  }
});