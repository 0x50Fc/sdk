"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = require("../App");
var Page_1 = require("../Page");
var appid = query.appid;
var refCount = App_1.getApp(appid);
var wx_app = refCount.object;
var wx_from = query.from || '';
refCount.retain();
page.on("unload", function () {
    refCount.release();
});
var webview;
var resize = function () {
    var width = page.width;
    var height = page.height;
    var density = screen.density;
    var top = 64 * density;
    var rem = (Math.min(screen.width, screen.height) / screen.density) * 20 / 750.0;
    if (platform == 'Android') {
        top = 44 * density;
    }
    else if (platform == 'iOS' && screen.height >= 812) {
        top += 24;
    }
    webview.setFrame(0, top, width, height - top);
    webview.evaluateJavaScript("if(document.documentElement) { document.documentElement.style.fontSize = '" + rem + "px'; }");
};
var ready = function () {
    webview = new UIView("webview");
    page.view.addSubview(webview);
    resize();
    page.on("resize", resize);
    var wx_path = query.path;
    var wx_page = new Page_1.Page(wx_app, wx_path, page);
    var wx_query;
    try {
        wx_query = JSON.parse(query.query);
    }
    catch (e) {
        wx_query = {};
    }
    if (wx_page.options !== undefined) {
        webview.set("background-color", wx_page.options.backgroundColor || '#fff');
        page.setOptions({
            title: wx_page.options.navigationBarTitleText
        });
    }
    var viewInterface = {
        setData: function (object, id) {
            var vs = [JSON.stringify(object)];
            if (id !== undefined) {
                vs.push(id);
            }
            webview.evaluateJavaScript("kk.setData(" + vs.join(",") + ")");
        },
        sendEvent: function (id, name, data) {
            var vs = [JSON.stringify(id), JSON.stringify(name), JSON.stringify(data)];
            webview.evaluateJavaScript("kk.sendEvent(" + vs.join(",") + ")");
        },
        addSubview: function (view) {
            webview.addSubview(view);
        },
        setHTMLContent: function (content, basePath) {
            webview.setContent(content, "text/html", basePath);
        },
        setPageOptions: function (options) {
            page.setOptions(options);
        },
        setViewAttribute: function (name, value) {
            webview.set(name, value);
        }
    };
    webview.on("data", function (event) {
        if (viewInterface.ondata !== undefined) {
            viewInterface.ondata(event.data);
        }
    });
    wx_page.run(viewInterface, wx_query);
    page.on("unload", function () {
        wx_page.recycle();
    });
};
if (page.view) {
    ready();
}
else {
    page.on("ready", ready);
}
