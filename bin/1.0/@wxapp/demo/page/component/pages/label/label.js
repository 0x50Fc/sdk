'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: 'label',
      path: 'page/component/pages/label/label'
    };
  },


  data: {
    checkboxItems: [{ name: 'USA', value: '美国' }, { name: 'CHN', value: '中国', checked: 'true' }],
    radioItems: [{ name: 'USA', value: '美国' }, { name: 'CHN', value: '中国', checked: 'true' }],
    hidden: false
  },

  checkboxChange: function checkboxChange(e) {
    var checked = e.detail.value;
    var changed = {};
    for (var i = 0; i < this.data.checkboxItems.length; i++) {
      if (checked.indexOf(this.data.checkboxItems[i].name) !== -1) {
        changed['checkboxItems[' + i + '].checked'] = true;
      } else {
        changed['checkboxItems[' + i + '].checked'] = false;
      }
    }
    this.setData(changed);
  },
  radioChange: function radioChange(e) {
    var checked = e.detail.value;
    var changed = {};
    for (var i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
        changed['radioItems[' + i + '].checked'] = true;
      } else {
        changed['radioItems[' + i + '].checked'] = false;
      }
    }
    this.setData(changed);
  },
  tapEvent: function tapEvent() {
    console.log('按钮被点击');
  }
});