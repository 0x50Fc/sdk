'use strict';

var subscribeMessageUrl = require('../../../../config').subscribeMessageUrl;

var app = getApp();

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '订阅消息',
      path: 'page/API/pages/subscribe-message/subscribe-message'
    };
  },


  data: {
    hasAuth: false,
    authType: 0 // 0 - 已授权，1 - 已拒绝授权
  },

  onShow: function onShow() {
    var _this = this;

    wx.getSetting({
      success: function success(res) {
        if (res.authSetting) {
          if (res.authSetting['scope.subscribemsg'] === true || res.authSetting['scope.subscribemsg'] === false) {
            _this.setData({
              hasAuth: true,
              authType: res.authSetting['scope.subscribemsg'] ? 0 : 1
            });
          }
        }
      }
    });
  },
  openSetting: function openSetting() {
    wx.openSetting({});
  },
  onsubscribe: function onsubscribe(res) {
    console.log(res.detail.errMsg);

    if (res.detail.errMsg === 'subscribeMessage:fail auth deny') {
      this.setData({
        hasAuth: true,
        authType: 1
      });
    }

    if (res.detail.errMsg === 'subscribeMessage:ok') {
      this.setData({
        hasAuth: true,
        authType: 0
      });
    }
  },
  dosendmsg: function dosendmsg() {
    var _this2 = this;

    this.setData({
      loading: true
    });

    app.getUserOpenId(function (err, openid) {
      if (!err) {
        wx.request({
          url: subscribeMessageUrl,
          method: 'POST',
          data: {
            openid: openid
          },
          success: function success(res) {
            console.log('send subscribe message success', res);
            wx.showToast({
              title: '发送成功',
              icon: 'success'
            });
            _this2.setData({
              loading: false
            });
          },
          fail: function fail(_ref) {
            var errMsg = _ref.errMsg;

            console.log('send subscribe message fail, errMsg is:', errMsg);
          }
        });
      } else {
        console.log('err:', err);
      }
    });
  }
});