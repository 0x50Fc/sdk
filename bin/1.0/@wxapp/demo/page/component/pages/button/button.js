'use strict';

var types = ['default', 'primary', 'warn'];
var pageObject = {
  data: {
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false
  },

  onShareAppMessage: function onShareAppMessage() {
    return {
      title: 'button',
      path: 'page/component/pages/button/button'
    };
  },
  setDisabled: function setDisabled() {
    this.setData({
      disabled: !this.data.disabled
    });
  },
  setPlain: function setPlain() {
    this.setData({
      plain: !this.data.plain
    });
  },
  setLoading: function setLoading() {
    this.setData({
      loading: !this.data.loading
    });
  }
};

for (var i = 0; i < types.length; ++i) {
  (function (type) {
    pageObject[type] = function () {
      var key = type + 'Size';
      var changedData = {};
      changedData[key] = this.data[key] === 'default' ? 'mini' : 'default';
      this.setData(changedData);
    };
  })(types[i]);
}

Page(pageObject);