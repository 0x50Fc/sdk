'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '数据存储',
      path: 'page/API/pages/storage/storage'
    };
  },


  data: {
    key: '',
    data: '',
    dialog: {
      title: '',
      content: '',
      hidden: true
    }
  },

  keyChange: function keyChange(e) {
    this.data.key = e.detail.value;
  },
  dataChange: function dataChange(e) {
    this.data.data = e.detail.value;
  },
  getStorage: function getStorage() {
    var _data = this.data,
        key = _data.key,
        data = _data.data;

    var storageData = void 0;

    if (key.length === 0) {
      this.setData({
        key: key,
        data: data,
        'dialog.hidden': false,
        'dialog.title': '读取数据失败',
        'dialog.content': 'key 不能为空'
      });
    } else {
      storageData = wx.getStorageSync(key);
      if (storageData === '') {
        this.setData({
          key: key,
          data: data,
          'dialog.hidden': false,
          'dialog.title': '读取数据失败',
          'dialog.content': '找不到 key 对应的数据'
        });
      } else {
        this.setData({
          key: key,
          data: data,
          'dialog.hidden': false,
          'dialog.title': '读取数据成功',
          // eslint-disable-next-line
          'dialog.content': "data: '" + storageData + "'"
        });
      }
    }
  },
  setStorage: function setStorage() {
    var _data2 = this.data,
        key = _data2.key,
        data = _data2.data;

    if (key.length === 0) {
      this.setData({
        key: key,
        data: data,
        'dialog.hidden': false,
        'dialog.title': '保存数据失败',
        'dialog.content': 'key 不能为空'
      });
    } else {
      wx.setStorageSync(key, data);
      this.setData({
        key: key,
        data: data,
        'dialog.hidden': false,
        'dialog.title': '存储数据成功'
      });
    }
  },
  clearStorage: function clearStorage() {
    wx.clearStorageSync();
    this.setData({
      key: '',
      data: '',
      'dialog.hidden': false,
      'dialog.title': '清除数据成功',
      'dialog.content': ''
    });
  },
  confirm: function confirm() {
    this.setData({
      'dialog.hidden': true,
      'dialog.title': '',
      'dialog.content': ''
    });
  }
});