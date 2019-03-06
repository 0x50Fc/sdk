'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '剪切板',
      path: 'page/API/pages/clipboard-data/clipboard-data'
    };
  },


  data: {
    value: 'edit and copy me',
    pasted: ''
  },

  valueChanged: function valueChanged(e) {
    this.setData({
      value: e.detail.value
    });
  },
  copy: function copy() {
    wx.setClipboardData({
      data: this.data.value,
      success: function success() {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 1000
        });
      }
    });
  },
  paste: function paste() {
    var self = this;
    wx.getClipboardData({
      success: function success(res) {
        self.setData({
          pasted: res.data
        });
        wx.showToast({
          title: '粘贴成功',
          icon: 'success',
          duration: 1000
        });
      }
    });
  }
});