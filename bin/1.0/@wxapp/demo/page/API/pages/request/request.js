'use strict';

var requestUrl = require('../../../../config').requestUrl;

var duration = 2000;

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '网络请求',
      path: 'page/API/pages/request/request'
    };
  },
  makeRequest: function makeRequest() {
    var self = this;

    self.setData({
      loading: true
    });

    wx.request({
      url: requestUrl,
      data: {
        noncestr: Date.now()
      },
      success: function success(result) {
        wx.showToast({
          title: '请求成功',
          icon: 'success',
          mask: true,
          duration: duration
        });
        self.setData({
          loading: false
        });
        console.log('request success', result);
      },
      fail: function fail(_ref) {
        var errMsg = _ref.errMsg;

        console.log('request fail', errMsg);
        self.setData({
          loading: false
        });
      }
    });
  }
});