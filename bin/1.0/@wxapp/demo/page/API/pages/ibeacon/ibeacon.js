'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: 'iBeacon',
      path: 'page/API/pages/ibeacon/ibeacon'
    };
  },


  data: {
    uuid: '',
    beacons: []
  },

  onUnload: function onUnload() {
    this.stopSearch();
  },
  enterUuid: function enterUuid(e) {
    this.setData({
      uuid: e.detail.value
    });
  },
  startSearch: function startSearch() {
    var _this = this;

    if (this._searching) return;
    this._searching = true;
    wx.startBeaconDiscovery({
      uuids: [this.data.uuid],
      success: function success(res) {
        console.log(res);
        wx.onBeaconUpdate(function (_ref) {
          var beacons = _ref.beacons;

          _this.setData({
            beacons: beacons
          });
        });
      },
      fail: function fail(err) {
        console.error(err);
      }
    });
  },
  stopSearch: function stopSearch() {
    this._searching = false;
    wx.stopBeaconDiscovery();
  }
});