'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: 'textarea',
      path: 'page/component/pages/textarea/textarea'
    };
  },


  data: {
    focus: false
  },

  bindTextAreaBlur: function bindTextAreaBlur(e) {
    console.log(e.detail.value);
  }
});