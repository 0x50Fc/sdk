'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: 'Wi-Fi',
      path: 'page/API/pages/wifi/wifi'
    };
  },


  data: {
    wifiList: []
  },

  onUnload: function onUnload() {
    this.stopSearch();
  },
  startSearch: function startSearch() {
    var _this = this;

    var getWifiList = function getWifiList() {
      wx.getWifiList({
        success: function success() {
          wx.onGetWifiList(function (res) {
            var wifiList = res.wifiList.sort(function (a, b) {
              return b.signalStrength - a.signalStrength;
            }).map(function (wifi) {
              var strength = Math.ceil(wifi.signalStrength * 4);
              return Object.assign(wifi, { strength: strength });
            });
            _this.setData({
              wifiList: wifiList
            });
          });
        },
        fail: function fail(err) {
          console.error(err);
        }
      });
    };

    var startWifi = function startWifi() {
      wx.startWifi({
        success: getWifiList,
        fail: function fail(err) {
          console.error(err);
        }
      });
    };

    wx.getSystemInfo({
      success: function success(res) {
        var isIOS = res.platform === 'ios';
        if (isIOS) {
          wx.showModal({
            title: '提示',
            content: '由于系统限制，iOS用户请手动进入系统WiFi页面，然后返回小程序。',
            showCancel: false,
            success: function success() {
              startWifi();
            }
          });
          return;
        }
        startWifi();
      }
    });
  },
  stopSearch: function stopSearch() {
    wx.stopWifi({
      success: function success(res) {
        console.log(res);
      },
      fail: function fail(err) {
        console.error(err);
      }
    });
  }
});