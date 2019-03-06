'use strict';

var _require = require('../../../../util/util.js'),
    fib = _require.fib;

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '多线程Worker',
      path: 'page/API/pages/worker/worker'
    };
  },


  data: {
    res: '',
    input: 35
  },

  onLoad: function onLoad() {
    this._worker = wx.createWorker('workers/fib/index.js');
  },
  onUnload: function onUnload() {
    clearInterval(this.interval);
    if (this._worker) this._worker.terminate();
  },
  bindInput: function bindInput(e) {
    var val = Number(e.detail.value);
    if (val > 40) return { value: 40 };
    if (Number.isNaN(val)) return { value: 33 };
    this.setData({
      input: val
    });
    return undefined;
  },
  reset: function reset() {
    this.setData({ res: '' });
  },
  compute: function compute() {
    this.reset();
    wx.showLoading({
      title: '计算中...'
    });
    var t0 = +Date.now();
    var res = fib(this.data.input);
    var t1 = +Date.now();
    wx.hideLoading();
    this.setData({
      res: res,
      time: t1 - t0
    });
  },
  multiThreadCompute: function multiThreadCompute() {
    var _this = this;

    this.reset();
    wx.showLoading({
      title: '计算中...'
    });

    var t0 = +Date.now();
    this._worker.postMessage({
      type: 'execFunc_fib',
      params: [this.data.input]
    });
    this._worker.onMessage(function (res) {
      if (res.type === 'execFunc_fib') {
        wx.hideLoading();
        var t1 = +Date.now();
        _this.setData({
          res: res.result,
          time: t1 - t0
        });
      }
    });
  },
  onReady: function onReady() {
    this.position = {
      x: 150,
      y: 150,
      vx: 2,
      vy: 2
    };

    this.drawBall();
    this.interval = setInterval(this.drawBall, 17);
  },
  drawBall: function drawBall() {
    var p = this.position;
    p.x += p.vx;
    p.y += p.vy;
    if (p.x >= 300) {
      p.vx = -2;
    }
    if (p.x <= 7) {
      p.vx = 2;
    }
    if (p.y >= 300) {
      p.vy = -2;
    }
    if (p.y <= 7) {
      p.vy = 2;
    }

    var context = wx.createContext();

    function ball(x, y) {
      context.beginPath(0);
      context.arc(x, y, 5, 0, Math.PI * 2);
      context.setFillStyle('#1aad19');
      context.setStrokeStyle('rgba(1,1,1,0)');
      context.fill();
      context.stroke();
    }

    ball(p.x, 150);
    ball(150, p.y);
    ball(300 - p.x, 150);
    ball(150, 300 - p.y);
    ball(p.x, p.y);
    ball(300 - p.x, 300 - p.y);
    ball(p.x, 300 - p.y);
    ball(300 - p.x, p.y);

    wx.drawCanvas({
      canvasId: 'canvas',
      actions: context.getActions()
    });
  }
});