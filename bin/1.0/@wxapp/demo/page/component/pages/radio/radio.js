'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: 'radio',
      path: 'page/component/pages/radio/radio'
    };
  },


  data: {
    items: [{ value: 'USA', name: '美国' }, { value: 'CHN', name: '中国', checked: 'true' }, { value: 'BRA', name: '巴西' }, { value: 'JPN', name: '日本' }, { value: 'ENG', name: '英国' }, { value: 'FRA', name: '法国' }]
  },

  radioChange: function radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var items = this.data.items;
    for (var i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value;
    }

    this.setData({
      items: items
    });
  }
});