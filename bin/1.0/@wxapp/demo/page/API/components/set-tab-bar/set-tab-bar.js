'use strict';

var defaultTabBarStyle = {
  color: '#7A7E83',
  selectedColor: '#3cc51f',
  backgroundColor: '#ffffff'
};

var defaultItemName = '接口';

Component({
  data: {
    hasSetTabBarBadge: false,
    hasShownTabBarRedDot: false,
    hasCustomedStyle: false,
    hasCustomedItem: false,
    hasHiddenTabBar: false
  },

  attached: function attached() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    });
  },
  detached: function detached() {
    this.removeTabBarBadge();
    this.hideTabBarRedDot();
    this.showTabBar();
    this.removeCustomStyle();
    this.removeCustomItem();
  },


  methods: {
    navigateBack: function navigateBack() {
      this.triggerEvent('unmount');
    },
    setTabBarBadge: function setTabBarBadge() {
      if (this.data.hasSetTabBarBadge) {
        this.removeTabBarBadge();
        return;
      }
      this.setData({
        hasSetTabBarBadge: true
      });
      wx.setTabBarBadge({
        index: 1,
        text: '1'
      });
    },
    removeTabBarBadge: function removeTabBarBadge() {
      this.setData({
        hasSetTabBarBadge: false
      });
      wx.removeTabBarBadge({
        index: 1
      });
    },
    showTabBarRedDot: function showTabBarRedDot() {
      if (this.data.hasShownTabBarRedDot) {
        this.hideTabBarRedDot();
        return;
      }
      this.setData({
        hasShownTabBarRedDot: true
      });
      wx.showTabBarRedDot({
        index: 1
      });
    },
    hideTabBarRedDot: function hideTabBarRedDot() {
      this.setData({
        hasShownTabBarRedDot: false
      });
      wx.hideTabBarRedDot({
        index: 1
      });
    },
    showTabBar: function showTabBar() {
      this.setData({ hasHiddenTabBar: false });
      wx.showTabBar();
    },
    hideTabBar: function hideTabBar() {
      if (this.data.hasHiddenTabBar) {
        this.showTabBar();
        return;
      }
      this.setData({ hasHiddenTabBar: true });
      wx.hideTabBar();
    },
    customStyle: function customStyle() {
      if (this.data.hasCustomedStyle) {
        this.removeCustomStyle();
        return;
      }
      this.setData({ hasCustomedStyle: true });
      wx.setTabBarStyle({
        color: '#FFF',
        selectedColor: '#1AAD19',
        backgroundColor: '#000000'
      });
    },
    removeCustomStyle: function removeCustomStyle() {
      this.setData({ hasCustomedStyle: false });
      wx.setTabBarStyle(defaultTabBarStyle);
    },
    customItem: function customItem() {
      if (this.data.hasCustomedItem) {
        this.removeCustomItem();
        return;
      }
      this.setData({ hasCustomedItem: true });
      wx.setTabBarItem({
        index: 1,
        text: 'API'
      });
    },
    removeCustomItem: function removeCustomItem() {
      this.setData({ hasCustomedItem: false });
      wx.setTabBarItem({
        index: 1,
        text: defaultItemName
      });
    }
  }
});