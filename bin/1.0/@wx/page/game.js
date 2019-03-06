var mainView;
var worker;
var resize = function () {
    var width = page.width;
    var height = page.height;
    var density = screen.density;
    var scale = screen.scale;
    var top = 64 * density;
    if (platform == 'Android') {
        top = 44 * density;
    }
    else if (platform == 'iOS' && screen.height >= 812) {
        top += 24;
    }
    mainView.setFrame(0, top, width, height - top);
    worker.postMessage({
        action: 'resize',
        width: width / density,
        height: (height - top) / density,
        scale: density * scale
    });
};
function touchsData(touches) {
    var r = [];
    for (var _i = 0, touches_1 = touches; _i < touches_1.length; _i++) {
        var touch = touches_1[_i];
        r.push({
            identifier: touch.id,
            screenX: touch.x,
            screenY: touch.y,
            clientX: touch.x,
            clientY: touch.y
        });
    }
    return r;
}
function touchEventData(data) {
    return {
        timeStamp: data.timestamp,
        touches: touchsData(data.touches),
        changedTouches: touchsData(data.changedTouches),
    };
}
var ready = function () {
    worker = app.createWorker("@wx/worker/game.js");
    mainView = new UIView("canvas");
    resize();
    page.view.addSubview(mainView);
    page.on("resize", resize);
    page.on("unload", function () {
        worker.terminate();
    });
    mainView.createCanvas(worker);
    mainView.on("touchstart", function (event) {
        worker.postMessage({
            event: 'touchstart',
            data: touchEventData(event.data)
        });
    });
    mainView.on("touchmove", function (event) {
        worker.postMessage({
            event: 'touchmove',
            data: touchEventData(event.data)
        });
    });
    mainView.on("touchend", function (event) {
        worker.postMessage({
            event: 'touchend',
            data: touchEventData(event.data)
        });
    });
    mainView.on("touchcancel", function (event) {
        worker.postMessage({
            event: 'touchcancel',
            data: touchEventData(event.data)
        });
    });
    worker.postMessage({
        action: 'ready',
        path: query.path
    });
};
if (page.view) {
    ready();
}
else {
    page.on("ready", ready);
}
