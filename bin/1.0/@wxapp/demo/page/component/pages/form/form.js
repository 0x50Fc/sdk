'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: 'form',
      path: 'page/component/pages/form/form'
    };
  },


  data: {
    pickerHidden: true,
    chosen: ''
  },

  pickerConfirm: function pickerConfirm(e) {
    this.setData({
      pickerHidden: true
    });
    this.setData({
      chosen: e.detail.value
    });
  },
  pickerCancel: function pickerCancel() {
    this.setData({
      pickerHidden: true
    });
  },
  pickerShow: function pickerShow() {
    this.setData({
      pickerHidden: false
    });
  },
  formSubmit: function formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
  },
  formReset: function formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value);
    this.setData({
      chosen: ''
    });
  }
});