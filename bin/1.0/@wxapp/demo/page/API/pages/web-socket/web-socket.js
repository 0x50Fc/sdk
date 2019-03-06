'use strict';

function showModal(title, content) {
  wx.showModal({
    title: title,
    content: content,
    showCancel: false
  });
}

function showSuccess(title) {
  wx.showToast({
    title: title,
    icon: 'success',
    duration: 1000
  });
}

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: 'Web Socket',
      path: 'page/API/pages/web-socket/web-socket'
    };
  },


  data: {
    socketStatus: 'closed'
  },

  onLoad: function onLoad() {
    var self = this;
    self.setData({
      hasLogin: true
    });
    // qcloud.setLoginUrl(loginUrl)

    // qcloud.login({
    //   success: function(result) {
    //     console.log('登录成功', result)
    //     self.setData({
    //       hasLogin: true
    //     })
    //   },

    //   fail: function(error) {
    //     console.log('登录失败', error)
    //   }
    // })
  },
  onUnload: function onUnload() {
    this.closeSocket();
  },
  toggleSocket: function toggleSocket(e) {
    var turnedOn = e.detail.value;

    if (turnedOn && this.data.socketStatus === 'closed') {
      this.openSocket();
    } else if (!turnedOn && this.data.socketStatus === 'connected') {
      var _showSuccess = true;
      this.closeSocket(_showSuccess);
    }
  },
  openSocket: function openSocket() {
    var _this = this;

    // var socket = this.socket = new qcloud.Tunnel(tunnelUrl)

    wx.onSocketOpen(function () {
      console.log('WebSocket 已连接');
      showSuccess('Socket已连接');
      _this.setData({
        socketStatus: 'connected',
        waitingResponse: false
      });
    });

    wx.onSocketClose(function () {
      console.log('WebSocket 已断开');
      _this.setData({ socketStatus: 'closed' });
    });

    wx.onSocketError(function (error) {
      showModal('发生错误', JSON.stringify(error));
      console.error('socket error:', error);
      _this.setData({
        loading: false
      });
    });

    // 监听服务器推送消息
    wx.onSocketMessage(function (message) {
      showSuccess('收到信道消息');
      console.log('socket message:', message);
      _this.setData({
        loading: false
      });
    });

    // 打开信道
    wx.connectSocket({
      url: 'wss://echo.websocket.org'
    });
  },
  closeSocket: function closeSocket() {
    var _this2 = this;

    if (this.data.socketStatus === 'connected') {
      wx.closeSocket({
        success: function success() {
          showSuccess('Socket已断开');
          _this2.setData({ socketStatus: 'closed' });
        }
      });
    }
  },
  sendMessage: function sendMessage() {
    if (this.data.socketStatus === 'connected') {
      wx.sendSocketMessage({
        data: 'Hello, Miniprogram!'
      });
    }
  }
});