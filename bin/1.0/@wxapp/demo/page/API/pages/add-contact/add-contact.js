'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '新增联系人',
      path: 'page/API/pages/add-contact/add-contact'
    };
  },
  submit: function submit(e) {
    var formData = e.detail.value;
    wx.addPhoneContact(_extends({}, formData, {
      success: function success() {
        wx.showToast({
          title: '联系人创建成功'
        });
      },
      fail: function fail() {
        wx.showToast({
          title: '联系人创建失败'
        });
      }
    }));
  }
});