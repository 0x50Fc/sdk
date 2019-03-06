
import * as wx from "./wx";

export class WXCanvas {

    private _canvas: UICanvas
    private _scale: number

    constructor(canvas: UICanvas, scale: number) {
        this._canvas = canvas;
        this._scale = scale;
    }

    getContext(name: string): UICanvasContext | undefined {
        let canvas = this._canvas;
        let v = canvas.getContext(name) as UICanvasCGContext;
        if (name == "2d" && v !== undefined) {
            v.scale(this._scale, this._scale);
            return new Proxy(v, {
                get: (target: any, p: PropertyKey, receiver: any): any => {
                    if (p == 'drawImage') {
                        return function (image: WXImage): void {

                            if (image === undefined) {
                                return;
                            }

                            var vs: any[] = [];
                            for (let i = 0; i < arguments.length; i++) {
                                if (i == 0) {
                                    vs[i] = image.image
                                } else {
                                    vs[i] = arguments[i];
                                }
                            }

                            target.drawImage.apply(target, vs);
                        }
                    } else {
                        let fn = target[p];
                        if (typeof fn == 'function') {
                            return function (): any {
                                return fn.apply(target, arguments);
                            }
                        } else {
                            return fn;
                        }
                    }
                },
                set: (target: any, p: PropertyKey, value: any, receiver: any): boolean => {
                    target[p] = value;
                    return true;
                }
            })
        }
        return v;
    }

    get width(): number {
        return this._canvas.width
    }

    set width(v: number) {
        this._canvas.width = v
    }

    get height(): number {
        return this._canvas.height
    }

    set height(v: number) {
        this._canvas.height = v;
    }

}

export class WXImage {

    private _basePath: string
    private _src: string
    private _image: UIImage

    constructor(basePath: string) {
        this._basePath = basePath;
    }

    get src(): string {
        return this._src;
    }

    set src(v: string) {
        this._src = v;
        if (v) {
            if (v.indexOf("://") > 0) {
                this._image = app.createImage(v);
            } else {
                let p = this._basePath;
                if (p.endsWith("/")) {
                    p += v;
                } else {
                    p += "/" + v;
                }
                this._image = app.createImage(p);
            }
            this._image.on("load", (): void => {
                if (typeof this.onload == 'function') {
                    this.onload();
                }
            });
            this._image.on("error", (): void => {
                if (typeof this.onerror == 'function') {
                    this.onerror();
                }
            });
        }
    }

    onload?: () => void
    onerror?: () => void


    get image(): UIImage {
        return this._image
    }
}

export interface WXInnerAudioOptionObject extends ker.InnerAudioOptionObject {

}

export interface WXAvailableAudioSourcesRes extends ker.AvailableAudioSourcesRes {

}

export interface WXAvailableAudioSourcesObject extends ker.AvailableAudioSourcesObject {

}

export interface WXInnerAudioContextErrorRes extends ker.InnerAudioContextErrorRes {

}

export class WXInnerAudioContext extends ker.InnerAudioContext {

    private _basePath: string

    constructor(basePath: string) {
        super()
        this._basePath = basePath;
    }

    protected openInputStream(v: string): AudioInputStream | undefined {
        if (v !== undefined && v.indexOf("://") == -1) {
            v = this._basePath + "/" + v;
        }
        return super.openInputStream(v);
    }

}

interface EventSet {
    [key: string]: (data: any) => void
}

export class GameInterface implements wx.APIInterface {

    
    readonly canvas: WXCanvas
    readonly basePath: string

    constructor(canvas: UICanvas, basePath: string, scale: number) {
        this.canvas = new WXCanvas(canvas, scale);
        this.basePath = basePath;
        this._fps = 60;
        this._autoId = 0;
        this._onEvents = {};
    }

    request(object: wx.WXRequestObject): wx.WXRequestTask {
        return wx.request(object)
    }

    downloadFile(object: wx.WXDownloadFileObject): wx.WXDownloadFileTask {
        return wx.downloadFile(object);
    }

    uploadFile(object: wx.WXUploadFileObject): wx.WXUploadFileTask {
        return wx.uploadFile(object);
    }

    reportAnalytics(name: string, data?: any): void {
        return wx.reportAnalytics(name, data);
    }

    saveFile(object: wx.WXSaveFileObject): void {
        return wx.saveFile(object);
    }

    removeSavedFile(object: wx.WXRemoveSavedFileObject): void {
        return wx.removeSavedFile(object);
    }

    getSystemInfoSync(): wx.SystemInfo {
        return wx.getSystemInfoSync();
    }

    getSystemInfo(object: wx.GetSystemInfoObject): void {
        wx.getSystemInfo(object);
    }

    private _mainCanvas: WXCanvas | undefined

    createCanvas(): WXCanvas {
        if (this._mainCanvas === undefined) {
            this._mainCanvas = this.canvas;
            return this._mainCanvas;
        }
        let v = new WXCanvas(app.createCanvas(), 1.0);
        return v;
    }

    createImage(): WXImage {
        return new WXImage(this.basePath);
    }

    setInnerAudioOption(object: WXInnerAudioOptionObject): void {
        ker.setInnerAudioOption(object)
    }

    getAvailableAudioSources(object: WXAvailableAudioSourcesObject): void {
        ker.getAvailableAudioSources(object)
    }

    createInnerAudioContext() {
        return new WXInnerAudioContext(this.basePath);
    }

    private _fps: number
    private _autoId: number
    private _frame?: () => void
    private _frameId: any

    protected draw() {
        if (this._frame !== undefined) {
            this._frame();
        }
    }

    setPreferredFramesPerSecond(fps: number): void {
        this._fps = fps
        if (this._frameId !== undefined) {
            clearInterval(this._frameId);
            this._frameId = setInterval((): void => {
                this.draw();
            }, 1000 / this._fps);
        }
    }

    requestAnimationFrame(fn: () => void): number {
        this._frame = fn;

        if (this._frameId === undefined) {
            this._frameId = setInterval((): void => {
                this.draw();
            }, 1000 / this._fps);
        }

        return 1;
    }

    cancelAnimationFrame(id: number): void {
        this._frame = undefined;
        if (this._frameId !== undefined) {
            clearInterval(this._frameId);
            this._frameId = undefined;
        }
    }

    dispatchEvent(name: string, event: any): void {

        let fn = this._onEvents[name];

        if (typeof fn == 'function') {
            fn(event);
        }
    }

    private _onEvents: EventSet

    touchStart?: (event: any) => void
    touchMove?: (event: any) => void
    touchEnd?: (event: any) => void
    touchCancel?: (event: any) => void

    onTouchStart(fn: (event: any) => void) {
        this._onEvents["touchstart"] = fn;
    }

    onTouchMove(fn: (event: any) => void) {
        this._onEvents["touchmove"] = fn;
    }

    onTouchEnd(fn: (event: any) => void) {
        this._onEvents["touchend"] = fn;
    }
    onTouchCancel(fn: (event: any) => void) {
        this._onEvents["touchcancel"] = fn;
    }

    offTouchStart(fn?: (event: any) => void) {
        if(fn=== undefined||fn == this._onEvents["touchstart"]) {
            delete this._onEvents["touchstart"];
        }
    }

    offTouchMove(fn?: (event: any) => void) {
        if(fn=== undefined||fn == this._onEvents["touchmove"]) {
            delete this._onEvents["touchmove"];
        }
    }

    offTouchEnd(fn?: (event: any) => void) {
        if(fn=== undefined||fn == this._onEvents["touchend"]) {
            delete this._onEvents["touchend"];
        }
    }
    offTouchCancel(fn: (event: any) => void) {
        if(fn=== undefined||fn == this._onEvents["touchcancel"]) {
            delete this._onEvents["touchcancel"];
        }
    }

}

