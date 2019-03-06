'use strict';

var date = new Date();
var years = [];
var months = [];
var days = [];

for (var i = 1990; i <= date.getFullYear(); i++) {
  years.push(i);
}

for (var _i = 1; _i <= 12; _i++) {
  months.push(_i);
}

for (var _i2 = 1; _i2 <= 31; _i2++) {
  days.push(_i2);
}

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: 'picker-view',
      path: 'page/component/pages/picker-view/picker-view'
    };
  },


  data: {
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    value: [9999, 1, 1],
    isDaytime: true
  },

  bindChange: function bindChange(e) {
    var val = e.detail.value;
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      isDaytime: !val[3]
    });
  }
});