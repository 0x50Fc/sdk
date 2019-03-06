'use strict';

var templateMessageUrl = require('../../../../config').templateMessageUrl;

var app = getApp();

var formData = {
  address: 'T.I.T 造舰厂',
  time: '2017.01.09',
  name: '帝国歼星舰',
  serial: '123456789'
};

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '模板消息',
      path: 'page/API/pages/template-message/template-message'
    };
  },
  onLoad: function onLoad() {
    this.setData({
      formData: formData
    });
  },
  submitForm: function submitForm(e) {
    var self = this;
    var formId = e.detail.formId;

    var formData = e.detail.value;

    console.log('form_id is:', formId);

    self.setData({
      loading: true
    });

    app.getUserOpenId(function (err, openid) {
      if (!err) {
        wx.request({
          url: templateMessageUrl,
          method: 'POST',
          data: {
            form_id: formId,
            openid: openid,
            formData: formData
          },
          success: function success(res) {
            console.log('submit form success', res);
            wx.showToast({
              title: '发送成功',
              icon: 'success'
            });
            self.setData({
              loading: false
            });
          },
          fail: function fail(_ref) {
            var errMsg = _ref.errMsg;

            console.log('submit form fail, errMsg is:', errMsg);
          }
        });
      } else {
        console.log('err:', err);
      }
    });
  }
});