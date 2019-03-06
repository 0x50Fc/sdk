'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '获取发票抬头',
      path: 'page/API/pages/choose-invoice-title/choose-invoice-title'
    };
  },


  data: {
    type: '',
    title: '',
    taxNumber: '',
    companyAddress: '',
    telephone: '',
    bankName: '',
    bankAccount: ''
  },
  chooseInvoiceTitle: function chooseInvoiceTitle() {
    var _this = this;

    wx.chooseInvoiceTitle({
      success: function success(res) {
        _this.setData({
          type: res.type,
          title: res.title,
          taxNumber: res.taxNumber,
          companyAddress: res.companyAddress,
          telephone: res.telephone,
          bankName: res.bankName,
          bankAccount: res.bankAccount
        });
      },
      fail: function fail(err) {
        console.error(err);
      }
    });
  }
});