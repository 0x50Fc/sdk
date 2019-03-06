'use strict';

var openIdUrl = require('./config').openIdUrl;

App({
  onLaunch: function onLaunch(opts) {
    console.log('App Launch', opts);
  },
  onShow: function onShow(opts) {
    console.log('App Show', opts);
  },
  onHide: function onHide() {
    console.log('App Hide');
  },

  globalData: {
    hasLogin: false,
    openid: null
  },
  // lazy loading openid
  getUserOpenId: function getUserOpenId(callback) {
    var self = this;

    if (self.globalData.openid) {
      callback(null, self.globalData.openid);
    } else {
      wx.login({
        success: function success(data) {
          wx.request({
            url: openIdUrl,
            data: {
              code: data.code
            },
            success: function success(res) {
              console.log('拉取openid成功', res);
              self.globalData.openid = res.data.openid;
              callback(null, self.globalData.openid);
            },
            fail: function fail(res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res);
              callback(res);
            }
          });
        },
        fail: function fail(err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err);
          callback(err);
        }
      });
    }
  }
});