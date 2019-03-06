
require("@ker/ker.js");

var canvas: UICanvas;
var basePath: string;

(global as any).GameGlobal = global;

(global as any).requestAnimationFrame = function (fn: () => void): number {

    let wx = (global as any).wx;

    if (wx !== undefined) {
        return wx.requestAnimationFrame(fn);
    }

    return 0;
};

(global as any).cancelAnimationFrame = function (id: number): void {

    let wx = (global as any).wx;

    if (wx !== undefined) {
        wx.cancelAnimationFrame(id);
    }

};

function onResize(width: number, height: number, scale: number): void {

    (global as any).screen = {
        width: width,
        height: height,
        density: 1.0,
        scale: scale
    };

    if (canvas === undefined) {
        return;
    }

    let w = width * scale;
    let h = height * scale;

    if (canvas.width != w || canvas.height != h) {
        canvas.width = w;
        canvas.height = h;
        onCanvasResize();
    }

}

function onCanvasResize(): void {

}

function onReady(v: string): void {

    basePath = v;

    let GA = require('../GameInterface');

    (global as any).wx = new GA.GameInterface(canvas, basePath, (global as any).screen.scale);
    (global as any).canvas = canvas;

    let p = basePath;

    if (p.endsWith("/")) {
        p += "game.js";
    } else {
        p += "/game.js";
    }

    app.exec(p);

}


(global as any).oncanvas = function (v: UICanvas): void {
    canvas = v;
};

(global as any).onmessage = function (data: any): void {

    if (typeof data != 'object') {
        return;
    }

    if (data.action == "resize") {
        onResize(data.width, data.height, data.scale);
    } else if (data.action == "ready") {
        onReady(data.path);
    } else if (data.event) {
        let wx = (global as any).wx
        wx.dispatchEvent(data.event, data.data);
    }

    console.info("[MESSAGE]", data)
};