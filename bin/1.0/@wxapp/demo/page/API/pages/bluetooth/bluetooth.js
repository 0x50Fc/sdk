'use strict';

function inArray(arr, key, val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return i;
    }
  }
  return -1;
}

// ArrayBuffer转16进度字符串示例
function ab2hex(buffer) {
  var hexArr = Array.prototype.map.call(new Uint8Array(buffer), function (bit) {
    return ('00' + bit.toString(16)).slice(-2);
  });
  return hexArr.join('');
}

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '蓝牙',
      path: 'page/API/pages/bluetooth/bluetooth'
    };
  },


  data: {
    devices: [],
    connected: false,
    chs: []
  },
  onUnload: function onUnload() {
    this.closeBluetoothAdapter();
  },
  openBluetoothAdapter: function openBluetoothAdapter() {
    var _this = this;

    wx.openBluetoothAdapter({
      success: function success(res) {
        console.log('openBluetoothAdapter success', res);
        _this.startBluetoothDevicesDiscovery();
      },
      fail: function fail(res) {
        if (res.errCode === 10001) {
          wx.showModal({
            title: '错误',
            content: '未找到蓝牙设备, 请打开蓝牙后重试。',
            showCancel: false
          });
          wx.onBluetoothAdapterStateChange(function (res) {
            console.log('onBluetoothAdapterStateChange', res);
            if (res.available) {
              this.startBluetoothDevicesDiscovery();
            }
          });
        }
      }
    });
  },
  getBluetoothAdapterState: function getBluetoothAdapterState() {
    var _this2 = this;

    wx.getBluetoothAdapterState({
      success: function success(res) {
        console.log('getBluetoothAdapterState', res);
        if (res.discovering) {
          _this2.onBluetoothDeviceFound();
        } else if (res.available) {
          _this2.startBluetoothDevicesDiscovery();
        }
      }
    });
  },
  startBluetoothDevicesDiscovery: function startBluetoothDevicesDiscovery() {
    var _this3 = this;

    if (this._discoveryStarted) {
      return;
    }
    this._discoveryStarted = true;
    wx.startBluetoothDevicesDiscovery({
      allowDuplicatesKey: true,
      success: function success(res) {
        console.log('startBluetoothDevicesDiscovery success', res);
        _this3.onBluetoothDeviceFound();
      }
    });
  },
  stopBluetoothDevicesDiscovery: function stopBluetoothDevicesDiscovery() {
    var _this4 = this;

    wx.stopBluetoothDevicesDiscovery({
      complete: function complete() {
        _this4._discoveryStarted = false;
      }
    });
  },
  onBluetoothDeviceFound: function onBluetoothDeviceFound() {
    var _this5 = this;

    wx.onBluetoothDeviceFound(function (res) {
      res.devices.forEach(function (device) {
        if (!device.name && !device.localName) {
          return;
        }
        var foundDevices = _this5.data.devices;
        var idx = inArray(foundDevices, 'deviceId', device.deviceId);
        var data = {};
        if (idx === -1) {
          data['devices[' + foundDevices.length + ']'] = device;
        } else {
          data['devices[' + idx + ']'] = device;
        }
        _this5.setData(data);
      });
    });
  },
  createBLEConnection: function createBLEConnection(e) {
    var _this6 = this;

    var ds = e.currentTarget.dataset;
    var deviceId = ds.deviceId;
    var name = ds.name;
    wx.showLoading();
    wx.createBLEConnection({
      deviceId: deviceId,
      success: function success() {
        _this6.setData({
          connected: true,
          name: name,
          deviceId: deviceId
        });
        _this6.getBLEDeviceServices(deviceId);
      },
      complete: function complete() {
        wx.hideLoading();
      }
    });
    this.stopBluetoothDevicesDiscovery();
  },
  closeBLEConnection: function closeBLEConnection() {
    wx.closeBLEConnection({
      deviceId: this.data.deviceId
    });
    this.setData({
      connected: false,
      chs: [],
      canWrite: false
    });
  },
  getBLEDeviceServices: function getBLEDeviceServices(deviceId) {
    var _this7 = this;

    wx.getBLEDeviceServices({
      deviceId: deviceId,
      success: function success(res) {
        for (var i = 0; i < res.services.length; i++) {
          if (res.services[i].isPrimary) {
            _this7.getBLEDeviceCharacteristics(deviceId, res.services[i].uuid);
            return;
          }
        }
      }
    });
  },
  getBLEDeviceCharacteristics: function getBLEDeviceCharacteristics(deviceId, serviceId) {
    var _this8 = this;

    wx.getBLEDeviceCharacteristics({
      deviceId: deviceId,
      serviceId: serviceId,
      success: function success(res) {
        console.log('getBLEDeviceCharacteristics success', res.characteristics);
        for (var i = 0; i < res.characteristics.length; i++) {
          var item = res.characteristics[i];
          if (item.properties.read) {
            wx.readBLECharacteristicValue({
              deviceId: deviceId,
              serviceId: serviceId,
              characteristicId: item.uuid
            });
          }
          if (item.properties.write) {
            _this8.setData({
              canWrite: true
            });
            _this8._deviceId = deviceId;
            _this8._serviceId = serviceId;
            _this8._characteristicId = item.uuid;
            _this8.writeBLECharacteristicValue();
          }
          if (item.properties.notify || item.properties.indicate) {
            wx.notifyBLECharacteristicValueChange({
              deviceId: deviceId,
              serviceId: serviceId,
              characteristicId: item.uuid,
              state: true
            });
          }
        }
      },
      fail: function fail(res) {
        console.error('getBLEDeviceCharacteristics', res);
      }
    });
    // 操作之前先监听，保证第一时间获取数据
    wx.onBLECharacteristicValueChange(function (characteristic) {
      var idx = inArray(_this8.data.chs, 'uuid', characteristic.characteristicId);
      var data = {};
      if (idx === -1) {
        data['chs[' + _this8.data.chs.length + ']'] = {
          uuid: characteristic.characteristicId,
          value: ab2hex(characteristic.value)
        };
      } else {
        data['chs[' + idx + ']'] = {
          uuid: characteristic.characteristicId,
          value: ab2hex(characteristic.value)
        };
      }
      // data[`chs[${this.data.chs.length}]`] = {
      //   uuid: characteristic.characteristicId,
      //   value: ab2hex(characteristic.value)
      // }
      _this8.setData(data);
    });
  },
  writeBLECharacteristicValue: function writeBLECharacteristicValue() {
    // 向蓝牙设备发送一个0x00的16进制数据
    var buffer = new ArrayBuffer(1);
    var dataView = new DataView(buffer);
    // eslint-disable-next-line
    dataView.setUint8(0, Math.random() * 255 | 0);
    wx.writeBLECharacteristicValue({
      deviceId: this._deviceId,
      serviceId: this._deviceId,
      characteristicId: this._characteristicId,
      value: buffer
    });
  },
  closeBluetoothAdapter: function closeBluetoothAdapter() {
    wx.closeBluetoothAdapter();
    this._discoveryStarted = false;
  }
});