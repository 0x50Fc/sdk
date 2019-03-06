'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: 'switch',
      path: 'page/component/pages/switch/switch'
    };
  },
  switch1Change: function switch1Change(e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value);
  },
  switch2Change: function switch2Change(e) {
    console.log('switch2 发生 change 事件，携带值为', e.detail.value);
  }
});