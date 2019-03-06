"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wx = require("./wx");
var WXCanvas = /** @class */ (function () {
    function WXCanvas(canvas, scale) {
        this._canvas = canvas;
        this._scale = scale;
    }
    WXCanvas.prototype.getContext = function (name) {
        var canvas = this._canvas;
        var v = canvas.getContext(name);
        if (name == "2d" && v !== undefined) {
            v.scale(this._scale, this._scale);
            return new Proxy(v, {
                get: function (target, p, receiver) {
                    if (p == 'drawImage') {
                        return function (image) {
                            if (image === undefined) {
                                return;
                            }
                            var vs = [];
                            for (var i = 0; i < arguments.length; i++) {
                                if (i == 0) {
                                    vs[i] = image.image;
                                }
                                else {
                                    vs[i] = arguments[i];
                                }
                            }
                            target.drawImage.apply(target, vs);
                        };
                    }
                    else {
                        var fn_1 = target[p];
                        if (typeof fn_1 == 'function') {
                            return function () {
                                return fn_1.apply(target, arguments);
                            };
                        }
                        else {
                            return fn_1;
                        }
                    }
                },
                set: function (target, p, value, receiver) {
                    target[p] = value;
                    return true;
                }
            });
        }
        return v;
    };
    Object.defineProperty(WXCanvas.prototype, "width", {
        get: function () {
            return this._canvas.width;
        },
        set: function (v) {
            this._canvas.width = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WXCanvas.prototype, "height", {
        get: function () {
            return this._canvas.height;
        },
        set: function (v) {
            this._canvas.height = v;
        },
        enumerable: true,
        configurable: true
    });
    return WXCanvas;
}());
exports.WXCanvas = WXCanvas;
var WXImage = /** @class */ (function () {
    function WXImage(basePath) {
        this._basePath = basePath;
    }
    Object.defineProperty(WXImage.prototype, "src", {
        get: function () {
            return this._src;
        },
        set: function (v) {
            var _this = this;
            this._src = v;
            if (v) {
                if (v.indexOf("://") > 0) {
                    this._image = app.createImage(v);
                }
                else {
                    var p = this._basePath;
                    if (p.endsWith("/")) {
                        p += v;
                    }
                    else {
                        p += "/" + v;
                    }
                    this._image = app.createImage(p);
                }
                this._image.on("load", function () {
                    if (typeof _this.onload == 'function') {
                        _this.onload();
                    }
                });
                this._image.on("error", function () {
                    if (typeof _this.onerror == 'function') {
                        _this.onerror();
                    }
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WXImage.prototype, "image", {
        get: function () {
            return this._image;
        },
        enumerable: true,
        configurable: true
    });
    return WXImage;
}());
exports.WXImage = WXImage;
var WXInnerAudioContext = /** @class */ (function (_super) {
    __extends(WXInnerAudioContext, _super);
    function WXInnerAudioContext(basePath) {
        var _this = _super.call(this) || this;
        _this._basePath = basePath;
        return _this;
    }
    WXInnerAudioContext.prototype.openInputStream = function (v) {
        if (v !== undefined && v.indexOf("://") == -1) {
            v = this._basePath + "/" + v;
        }
        return _super.prototype.openInputStream.call(this, v);
    };
    return WXInnerAudioContext;
}(ker.InnerAudioContext));
exports.WXInnerAudioContext = WXInnerAudioContext;
var GameInterface = /** @class */ (function () {
    function GameInterface(canvas, basePath, scale) {
        this.canvas = new WXCanvas(canvas, scale);
        this.basePath = basePath;
        this._fps = 60;
        this._autoId = 0;
        this._onEvents = {};
    }
    GameInterface.prototype.request = function (object) {
        return wx.request(object);
    };
    GameInterface.prototype.downloadFile = function (object) {
        return wx.downloadFile(object);
    };
    GameInterface.prototype.uploadFile = function (object) {
        return wx.uploadFile(object);
    };
    GameInterface.prototype.reportAnalytics = function (name, data) {
        return wx.reportAnalytics(name, data);
    };
    GameInterface.prototype.saveFile = function (object) {
        return wx.saveFile(object);
    };
    GameInterface.prototype.removeSavedFile = function (object) {
        return wx.removeSavedFile(object);
    };
    GameInterface.prototype.getSystemInfoSync = function () {
        return wx.getSystemInfoSync();
    };
    GameInterface.prototype.getSystemInfo = function (object) {
        wx.getSystemInfo(object);
    };
    GameInterface.prototype.createCanvas = function () {
        if (this._mainCanvas === undefined) {
            this._mainCanvas = this.canvas;
            return this._mainCanvas;
        }
        var v = new WXCanvas(app.createCanvas(), 1.0);
        return v;
    };
    GameInterface.prototype.createImage = function () {
        return new WXImage(this.basePath);
    };
    GameInterface.prototype.setInnerAudioOption = function (object) {
        ker.setInnerAudioOption(object);
    };
    GameInterface.prototype.getAvailableAudioSources = function (object) {
        ker.getAvailableAudioSources(object);
    };
    GameInterface.prototype.createInnerAudioContext = function () {
        return new WXInnerAudioContext(this.basePath);
    };
    GameInterface.prototype.draw = function () {
        if (this._frame !== undefined) {
            this._frame();
        }
    };
    GameInterface.prototype.setPreferredFramesPerSecond = function (fps) {
        var _this = this;
        this._fps = fps;
        if (this._frameId !== undefined) {
            clearInterval(this._frameId);
            this._frameId = setInterval(function () {
                _this.draw();
            }, 1000 / this._fps);
        }
    };
    GameInterface.prototype.requestAnimationFrame = function (fn) {
        var _this = this;
        this._frame = fn;
        if (this._frameId === undefined) {
            this._frameId = setInterval(function () {
                _this.draw();
            }, 1000 / this._fps);
        }
        return 1;
    };
    GameInterface.prototype.cancelAnimationFrame = function (id) {
        this._frame = undefined;
        if (this._frameId !== undefined) {
            clearInterval(this._frameId);
            this._frameId = undefined;
        }
    };
    GameInterface.prototype.dispatchEvent = function (name, event) {
        var fn = this._onEvents[name];
        if (typeof fn == 'function') {
            fn(event);
        }
    };
    GameInterface.prototype.onTouchStart = function (fn) {
        this._onEvents["touchstart"] = fn;
    };
    GameInterface.prototype.onTouchMove = function (fn) {
        this._onEvents["touchmove"] = fn;
    };
    GameInterface.prototype.onTouchEnd = function (fn) {
        this._onEvents["touchend"] = fn;
    };
    GameInterface.prototype.onTouchCancel = function (fn) {
        this._onEvents["touchcancel"] = fn;
    };
    GameInterface.prototype.offTouchStart = function (fn) {
        if (fn === undefined || fn == this._onEvents["touchstart"]) {
            delete this._onEvents["touchstart"];
        }
    };
    GameInterface.prototype.offTouchMove = function (fn) {
        if (fn === undefined || fn == this._onEvents["touchmove"]) {
            delete this._onEvents["touchmove"];
        }
    };
    GameInterface.prototype.offTouchEnd = function (fn) {
        if (fn === undefined || fn == this._onEvents["touchend"]) {
            delete this._onEvents["touchend"];
        }
    };
    GameInterface.prototype.offTouchCancel = function (fn) {
        if (fn === undefined || fn == this._onEvents["touchcancel"]) {
            delete this._onEvents["touchcancel"];
        }
    };
    return GameInterface;
}());
exports.GameInterface = GameInterface;
