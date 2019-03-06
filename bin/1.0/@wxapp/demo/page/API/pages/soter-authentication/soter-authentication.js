'use strict';

var AUTH_MODE = 'fingerPrint';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '生物认证',
      path: 'page/API/pages/soter-authentication/soter-authentication'
    };
  },
  startAuth: function startAuth() {
    var startSoterAuthentication = function startSoterAuthentication() {
      wx.startSoterAuthentication({
        requestAuthModes: [AUTH_MODE],
        challenge: 'test',
        authContent: '小程序示例',
        success: function success() {
          wx.showToast({
            title: '认证成功'
          });
        },
        fail: function fail(err) {
          console.error(err);
          wx.showModal({
            title: '失败',
            content: '认证失败',
            showCancel: false
          });
        }
      });
    };

    var checkIsEnrolled = function checkIsEnrolled() {
      wx.checkIsSoterEnrolledInDevice({
        checkAuthMode: AUTH_MODE,
        success: function success(res) {
          console.log(res);
          if (parseInt(res.isEnrolled, 10) <= 0) {
            wx.showModal({
              title: '错误',
              content: '您暂未录入指纹信息，请录入后重试',
              showCancel: false
            });
            return;
          }
          startSoterAuthentication();
        },
        fail: function fail(err) {
          console.error(err);
        }
      });
    };

    wx.checkIsSupportSoterAuthentication({
      success: function success(res) {
        console.log(res);
        checkIsEnrolled();
      },
      fail: function fail(err) {
        console.error(err);
        wx.showModal({
          title: '错误',
          content: '您的设备不支持指纹识别',
          showCancel: false
        });
      }
    });
  }
});