"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wx = require("./wx");
var PageInterface = /** @class */ (function () {
    function PageInterface(app, basePath, viewInterface, viewContext) {
        this.app = app;
        this.basePath = basePath;
        this.viewInterface = viewInterface;
        this.viewContext = viewContext;
    }
    PageInterface.prototype.request = function (object) {
        return wx.request(object);
    };
    PageInterface.prototype.downloadFile = function (object) {
        return wx.downloadFile(object);
    };
    PageInterface.prototype.uploadFile = function (object) {
        return wx.uploadFile(object);
    };
    PageInterface.prototype.reportAnalytics = function (name, data) {
        return wx.reportAnalytics(name, data);
    };
    PageInterface.prototype.saveFile = function (object) {
        return wx.saveFile(object);
    };
    PageInterface.prototype.removeSavedFile = function (object) {
        return wx.removeSavedFile(object);
    };
    PageInterface.prototype.navigateTo = function (object) {
        var url = object.url;
        var i = url.indexOf("?");
        var query = {};
        var path;
        if (i > 0) {
            path = url.substr(0, i);
            var vs = url.substr(i + 1).split("&");
            for (var _i = 0, vs_1 = vs; _i < vs_1.length; _i++) {
                var v = vs_1[_i];
                var kv = v.split("=");
                query[kv[0]] = kv.length > 1 ? decodeURIComponent(kv[1]) : "";
            }
        }
        else {
            path = url;
        }
        this.app.open(this.basePath + '/' + path, query);
    };
    PageInterface.prototype.setNavigationBarTitle = function (object) {
        this.viewInterface.setPageOptions({
            title: object.title
        });
        if (object.success !== undefined) {
            object.success();
        }
        if (object.complete !== undefined) {
            object.complete();
        }
    };
    PageInterface.prototype.createCanvasContext = function (canvasId) {
        return this.viewContext.getCanvasContext(canvasId);
    };
    PageInterface.prototype.getSystemInfoSync = function () {
        return wx.getSystemInfoSync();
    };
    PageInterface.prototype.getSystemInfo = function (object) {
        wx.getSystemInfo(object);
    };
    PageInterface.prototype.showToast = function (object) {
        wx.showToast(object);
    };
    PageInterface.prototype.hideToast = function (object) {
        wx.hideToast(object);
    };
    return PageInterface;
}());
exports.PageInterface = PageInterface;
