'use strict';

Page({
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '操作菜单',
      path: 'page/API/pages/action-sheet/action-sheet'
    };
  },
  actionSheetTap: function actionSheetTap() {
    wx.showActionSheet({
      itemList: ['item1', 'item2', 'item3', 'item4'],
      success: function success(e) {
        console.log(e.tapIndex);
      }
    });
  }
});