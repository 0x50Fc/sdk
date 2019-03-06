'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: 'input',
      path: 'page/component/pages/input/input'
    };
  },


  data: {
    focus: false,
    inputValue: ''
  },

  bindKeyInput: function bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },
  bindReplaceInput: function bindReplaceInput(e) {
    var value = e.detail.value;
    var pos = e.detail.cursor;
    var left = void 0;
    if (pos !== -1) {
      // 光标在中间
      left = e.detail.value.slice(0, pos);
      // 计算光标的位置
      pos = left.replace(/11/g, '2').length;
    }

    // 直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos

      // 或者直接返回字符串,光标在最后边
      // return value.replace(/11/g,'2'),
    };
  },
  bindHideKeyboard: function bindHideKeyboard(e) {
    if (e.detail.value === '123') {
      // 收起键盘
      wx.hideKeyboard();
    }
  }
});