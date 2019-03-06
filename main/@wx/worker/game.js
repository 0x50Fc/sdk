require("@ker/ker.js");
var canvas;
var basePath;
global.GameGlobal = global;
global.requestAnimationFrame = function (fn) {
    var wx = global.wx;
    if (wx !== undefined) {
        return wx.requestAnimationFrame(fn);
    }
    return 0;
};
global.cancelAnimationFrame = function (id) {
    var wx = global.wx;
    if (wx !== undefined) {
        wx.cancelAnimationFrame(id);
    }
};
function onResize(width, height, scale) {
    global.screen = {
        width: width,
        height: height,
        density: 1.0,
        scale: scale
    };
    if (canvas === undefined) {
        return;
    }
    var w = width * scale;
    var h = height * scale;
    if (canvas.width != w || canvas.height != h) {
        canvas.width = w;
        canvas.height = h;
        onCanvasResize();
    }
}
function onCanvasResize() {
}
function onReady(v) {
    basePath = v;
    var GA = require('../GameInterface');
    global.wx = new GA.GameInterface(canvas, basePath, global.screen.scale);
    global.canvas = canvas;
    var p = basePath;
    if (p.endsWith("/")) {
        p += "game.js";
    }
    else {
        p += "/game.js";
    }
    app.exec(p);
}
global.oncanvas = function (v) {
    canvas = v;
};
global.onmessage = function (data) {
    if (typeof data != 'object') {
        return;
    }
    if (data.action == "resize") {
        onResize(data.width, data.height, data.scale);
    }
    else if (data.action == "ready") {
        onReady(data.path);
    }
    else if (data.event) {
        var wx = global.wx;
        wx.dispatchEvent(data.event, data.data);
    }
    console.info("[MESSAGE]", data);
};
