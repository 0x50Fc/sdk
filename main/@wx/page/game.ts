

var mainView: UIView
var worker: Worker

let resize = (): void => {
    let width = page.width;
    let height = page.height;
    let density = screen.density;
    let scale = screen.scale;
    let top = 64 * density;
    if (platform == 'Android') {
        top = 44 * density;
    } else if (platform == 'iOS' && screen.height >= 812) {
        top += 24;
    }
    mainView.setFrame(0, top, width, height - top);
    worker.postMessage({
        action: 'resize',
        width: width / density,
        height: (height - top) / density,
        scale: density * scale
    });
}

function touchsData(touches: any[]): any[] {
    let r: any[] = [];

    for (let touch of touches) {
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

function touchEventData(data: any): any {
    return {
        timeStamp: data.timestamp,
        touches: touchsData(data.touches),
        changedTouches: touchsData(data.changedTouches),
    };
}

var ready = (): void => {

    worker = app.createWorker("@wx/worker/game.js");

    mainView = new UIView("canvas");

    resize();

    page.view.addSubview(mainView);

    page.on("resize", resize);

    page.on("unload", (): void => {
        worker.terminate();
    });

    mainView.createCanvas(worker);

    mainView.on("touchstart", (event: Event): void => {
        worker.postMessage({
            event: 'touchstart',
            data: touchEventData(event.data)
        });
    });

    mainView.on("touchmove", (event: Event): void => {
        worker.postMessage({
            event: 'touchmove',
            data: touchEventData(event.data)
        });
    });

    mainView.on("touchend", (event: Event): void => {
        worker.postMessage({
            event: 'touchend',
            data: touchEventData(event.data)
        });
    });

    mainView.on("touchcancel", (event: Event): void => {
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
} else {
    page.on("ready", ready);
}
