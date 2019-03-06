

(function () {

	function parseArguments(vs, args) {
		for (var i = 0; i < args.length; i++) {
			var v = args[i];
			switch (typeof v) {
				case 'object':
					var s;
					try {
						s = JSON.stringify(v, undefined, 4);
					} catch (e) {
						s = v + '';
					}
					vs.push(s);
					break;
				default:
					vs.push(v + '');
					break;
			}
		}
	}

	console = {
		log: function () {
			var vs = ["[LOG]"];
			parseArguments(vs, arguments);
			print(vs.join(" "));
		},
		error: function () {
			var vs = ["[ERROR]"];
			parseArguments(vs, arguments);
			print(vs.join(" "));
		},
		debug: function () {
			var vs = ["[DEBUG]"];
			parseArguments(vs, arguments);
			print(vs.join(" "));
		},
		info: function () {
			var vs = ["[INFO]"];
			parseArguments(vs, arguments);
			print(vs.join(" "));
		}
	};

})();

var ker = global.ker || (global.ker = {});

(function () {

    var State = {
        PENDING: 0,
        FULFILLED: 1,
        REJECTED: 2
    };

    Promise = function (executor) {
        this.state = State.PENDING;
        this.value = undefined;

        var p = this;

        try {
            executor(function (result) {
                setValue(p, result);
            }, function (reason) {
                setReason(p, reason);
            });
        } catch (reason) {
            setReason(p, reason);
        }

    };

    Promise.reject = function (reason) {
        var v = Object.create(Promise.prototype, {});
        v.state = State.REJECTED;
        v.value = reason;
        return v;
    };

    Promise.resolve = function (value) {
        var v = Object.create(Promise.prototype, {});
        v.state = State.FULFILLED;
        v.value = value;
        return v;
    };

    Promise.all = function (items) {
        return new Promise(function (resolve, reject) {
            var count = 0;
            var maxCount = items.length;
            var done = false;
            var values = [];

            for (var i = 0; i < items.length; i++) {

                (function (i, item) {

                    item.then(function (value) {

                        if (done) {
                            return;
                        }

                        values[i] = value;
                        count++;
                        if (count == maxCount) {
                            done = true;
                            resolve(values);
                        }
                    }, function (reason) {

                        if (done) {
                            return;
                        }

                        done = true;

                        reject(reason);
                    });

                })(i, items[i]);
            }
        });
    };

    Promise.race = function (items) {
        return new Promise(function (resolve, reject) {
            var done = false;
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                item.then(function (value) {

                    if (done) {
                        return;
                    }
                    done = true;
                    resolve(value);
                }, function (reason) {

                    if (done) {
                        return;
                    }

                    done = true;
                    reject(reason);
                });
            }
        });
    };

    function setValue(p, value) {
        if (p.state != State.PENDING) {
            throw "Promise not is PENDING";
        }

        if (value instanceof Promise) {
            value.then(function (value) {
                try {
                    setValue(p, value);
                } catch (reason) {
                    setReason(p, reason);
                }
            }, function (reason) {
                setReason(p, reason);
            });
        }

        if (typeof p._onResolve == 'function') {

            var fn = p._onResolve;

            p._onResolve = undefined;

            try {
                var newValue = fn(value);
                if (newValue === undefined) {
                    newValue = value;
                }
                setValue(p, newValue);
            } catch (reason) {
                setReason(p, reason);
            }

        } else {
            p.state = State.FULFILLED;
            p.value = value;
        }
    }

    function setReason(p, reason) {

        if (p.state != State.PENDING) {
            throw "Promise not is PENDING";
        }

        if (typeof p._onReject == 'function') {

            var fn = p._onReject;

            p._onReject = undefined;

            try {
                fn(reason);
                setReason(p, reason);
                p.state = State.REJECTED;
                p.value = reason;
            } catch (reason) {
                setReason(p, reason);
            }

        } else {
            p.state = State.REJECTED;
            p.value = reason;
        }

    }

    Promise.prototype = Object.create(Object.prototype, {
        then: {
            value: function (onResolve, onReject) {

                var v = Object.create(Promise.prototype, {});
                v.state = State.PENDING;
                this._onResolve = function (value) {
                    if (typeof onResolve == 'function') {
                        try {
                            var newValue = onResolve(value);
                            if (newValue === undefined) {
                                newValue = value;
                            }
                            setValue(v, newValue);
                        } catch (reason) {
                            setReason(v, reason);
                        }
                    } else {
                        try {
                            setValue(v, value);
                        } catch (reason) {
                            setReason(v, reason);
                        }
                    }
                };
                this._onReject = function (reason) {
                    if (typeof onReject == 'function') {
                        try {
                            onReject(reason);
                            setReason(v, reason);
                        } catch (r) {
                            setReason(v, r);
                        }
                    } else {
                        setReason(v, reason);
                    }
                };
                if (this.state == State.FULFILLED) {
                    this._onResolve(this.value);
                } else if (this.state == State.REJECTED) {
                    this._onReject(this.value);
                }
                return v;

            },
            writable: false,
            configurable: false,
            enumerable: true
        },
        catch: {
            value: function (onReject) {
                return this.then(undefined, onReject);
            },
            writable: false,
            configurable: false,
            enumerable: true
        },
        finally: {
            value: function (onFinally) {
                var fn = function () {
                    if (typeof onFinally == 'function') {
                        try {
                            onFinally();
                        } catch (e) {

                        }
                    }
                };
                return this.then(fn, fn);
            },
            writable: false,
            configurable: false,
            enumerable: true
        }
    });

})();
var ker;
(function (ker) {
    function dateFormat(d, fmt) {
        if (fmt === void 0) { fmt = "yyyy-MM-dd hh:mm:ss"; }
        if (!(d instanceof Date)) {
            d = new Date(parseInt(d + ''));
        }
        var o = {
            "M+": d.getMonth() + 1,
            "d+": d.getDate(),
            "h+": d.getHours(),
            "m+": d.getMinutes(),
            "s+": d.getSeconds(),
            "q+": Math.floor((d.getMonth() + 3) / 3),
            "S": d.getMilliseconds() //毫秒 
        };
        fmt = fmt.replace(/(y+)/, d.getFullYear() + "");
        for (var k in o) {
            var v = o[k] + '';
            if (v.length < 2) {
                v = '0' + v;
            }
            fmt = fmt.replace(new RegExp("(" + k + ")"), v);
        }
        return fmt;
    }
    ker.dateFormat = dateFormat;
})(ker || (ker = {}));
var ker;
(function (ker) {
    function maxlength(s, maxlength, tail) {
        if (tail === void 0) { tail = "..."; }
        var length = 0;
        for (var i = 0; i < s.length; i++) {
            var c = s.charCodeAt(i);
            var len = 1;
            if (c > 0x0ff) {
                len = 2;
            }
            if (length + len > maxlength) {
                return s.substr(0, i) + tail;
            }
            length += len;
        }
        return s;
    }
    ker.maxlength = maxlength;
})(ker || (ker = {}));
var ker;
(function (ker) {
    var Evaluate = /** @class */ (function () {
        function Evaluate(evaluateScript, keys) {
            this.evaluateScript = evaluateScript;
            this.keys = keys;
        }
        Evaluate.prototype.exec = function (object, global) {
            var vs = [];
            for (var _i = 0, _a = this.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                var v = object[key];
                if (v === undefined) {
                    v = global[key];
                }
                vs.push(v);
            }
            try {
                return this.evaluateScript.apply(undefined, vs);
            }
            catch (e) {
                console.error("[Evaluate:exec]", e.stack);
            }
        };
        return Evaluate;
    }());
    ker.Evaluate = Evaluate;
    var KeyCallback = /** @class */ (function () {
        function KeyCallback(func) {
            this.priority = 0;
            this.func = func;
        }
        KeyCallback.prototype.run = function (object, global, changedKeys) {
            var v;
            if (this.evaluate !== undefined) {
                v = this.evaluate.exec(object, global);
            }
            else if (this.keys !== undefined) {
                v = Data.get(object, this.keys);
            }
            this.func(v, changedKeys);
        };
        return KeyCallback;
    }());
    var IObject = /** @class */ (function () {
        function IObject() {
        }
        IObject.prototype.get = function (key) {
            return this[key];
        };
        IObject.prototype.set = function (key, value) {
            if (value === undefined) {
                delete this[key];
            }
            else {
                this[key] = value;
            }
        };
        return IObject;
    }());
    ker.IObject = IObject;
    var Data = /** @class */ (function () {
        function Data(global) {
            this._object = {};
            this._global = global;
            this._keyObserver = {};
            this._defaultObserver = [];
        }
        Object.defineProperty(Data.prototype, "global", {
            get: function () {
                return this._global;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Data.prototype, "object", {
            get: function () {
                return this._object;
            },
            set: function (object) {
                this._object = object;
            },
            enumerable: true,
            configurable: true
        });
        Data.prototype.setData = function (data, changed) {
            if (changed === void 0) { changed = true; }
            if (changed) {
                this.begin();
            }
            for (var key in data) {
                this._object[key] = data[key];
                if (this._keySet !== undefined) {
                    this._keySet[key] = true;
                }
            }
            if (changed) {
                this.commit();
            }
        };
        Data.prototype.begin = function () {
            this._keySet = {};
        };
        Data.prototype.commit = function () {
            var keys = this._keySet;
            this._keySet = undefined;
            if (keys !== undefined) {
                this.changeKeys(keys);
            }
        };
        Data.prototype.cancel = function () {
            this._keySet = undefined;
        };
        Data.prototype.changeKeys = function (keySet) {
            var cbs = [].concat(this._defaultObserver);
            if (keySet === undefined) {
                for (var key in this._keyObserver) {
                    var v = this._keyObserver[key];
                    if (v !== undefined) {
                        cbs = cbs.concat(v);
                    }
                }
            }
            else {
                for (var key in keySet) {
                    var v = this._keyObserver[key];
                    if (v !== undefined) {
                        cbs = cbs.concat(v);
                    }
                }
            }
            cbs.sort(function (a, b) {
                return a.priority - b.priority;
            });
            for (var _i = 0, cbs_1 = cbs; _i < cbs_1.length; _i++) {
                var cb = cbs_1[_i];
                cb.run(this._object, this._global, keySet);
            }
        };
        Data.prototype.on = function (keys, func, priority) {
            if (priority === void 0) { priority = 0; }
            var cb;
            if (keys instanceof Evaluate) {
                cb = new KeyCallback(func);
                cb.priority = priority;
                cb.keys = keys.keys;
                cb.evaluate = keys;
            }
            else {
                cb = new KeyCallback(func);
                cb.priority = priority;
                cb.keys = keys;
            }
            if (cb.keys.length == 0) {
                this._defaultObserver.push(cb);
            }
            else {
                for (var _i = 0, _a = cb.keys; _i < _a.length; _i++) {
                    var key = _a[_i];
                    var vs = this._keyObserver[key];
                    if (vs === undefined) {
                        this._keyObserver[key] = [cb];
                    }
                    else {
                        vs.push(cb);
                    }
                }
            }
        };
        Data.prototype.off = function (keys, func) {
            if (keys instanceof Evaluate) {
                keys = keys.keys;
            }
            if (keys.length == 0) {
                if (func === undefined) {
                    this._defaultObserver = [];
                }
                else {
                    var vs = [];
                    for (var _i = 0, _a = this._defaultObserver; _i < _a.length; _i++) {
                        var cb = _a[_i];
                        if (cb.func !== func) {
                            vs.push(cb);
                        }
                    }
                    this._defaultObserver = vs;
                }
            }
            else {
                for (var _b = 0, keys_1 = keys; _b < keys_1.length; _b++) {
                    var key = keys_1[_b];
                    if (func === undefined) {
                        delete this._keyObserver[key];
                    }
                    else {
                        var cbs = this._keyObserver[key];
                        if (cbs !== undefined) {
                            var vs = [];
                            for (var _c = 0, cbs_2 = cbs; _c < cbs_2.length; _c++) {
                                var cb = cbs_2[_c];
                                if (cb.func !== func) {
                                    vs.push(cb);
                                }
                            }
                            this._keyObserver[key] = vs;
                        }
                    }
                }
            }
        };
        Data.prototype.setParent = function (parent) {
            this.recycle();
            if (parent !== undefined) {
                this._parent = parent;
                var data_1 = this;
                this._onDataFunction = function (value, keySet) {
                    if (value !== undefined) {
                        if (keySet === undefined) {
                            data_1.changeKeys();
                        }
                        else {
                            data_1.begin();
                            for (var key_1 in keySet) {
                                data_1.set([key_1], value[key_1], false);
                            }
                            data_1.commit();
                        }
                    }
                };
                parent.on([], this._onDataFunction);
                var object = parent.object;
                for (var key in object) {
                    this._object[key] = object[key];
                }
            }
        };
        Data.prototype.recycle = function () {
            if (this._parent !== undefined) {
                this._parent.off([], this._onDataFunction);
                this._parent = undefined;
                this._onDataFunction = undefined;
            }
        };
        Data.prototype.get = function (keys) {
            return Data.get(this._object, keys);
        };
        Data.prototype.set = function (keys, value, changed) {
            if (changed === void 0) { changed = true; }
            if (changed) {
                this.begin();
            }
            Data.set(this._object, keys, value);
            if (this._keySet !== undefined && keys.length > 0) {
                this._keySet[keys[0]] = true;
            }
            if (changed) {
                this.commit();
            }
        };
        Data.get = function (object, keys, index) {
            if (index === void 0) { index = 0; }
            if (index < keys.length) {
                var key = keys[index];
                if (typeof object == 'object') {
                    if (object instanceof IObject) {
                        return Data.get(object.get(key), keys, index + 1);
                    }
                    return Data.get(object[key], keys, index + 1);
                }
            }
            else {
                return object;
            }
        };
        Data.set = function (object, keys, value, index) {
            if (index === void 0) { index = 0; }
            if (typeof object != 'object') {
                return;
            }
            if (index + 1 < keys.length) {
                var key = keys[index];
                var v;
                if (object instanceof IObject) {
                    v = object.get(key);
                }
                else {
                    v = object[key];
                }
                if (v === undefined) {
                    v = {};
                    if (object instanceof IObject) {
                        object.set(key, v);
                    }
                    else {
                        object[key] = v;
                    }
                }
                Data.set(v, keys, value, index + 1);
            }
            else if (index < keys.length) {
                var key = keys[index];
                if (object instanceof IObject) {
                    object.set(key, value);
                }
                else {
                    object[key] = value;
                }
            }
        };
        return Data;
    }());
    ker.Data = Data;
})(ker || (ker = {}));
var ker;
(function (ker) {
    function View(document, object, cb) {
        var pageViewContext = [];
        function v_AttributeEvaluate(element, data, key, evaluate) {
            data.on(evaluate, function (value, changedKeys) {
                if (key == 'data') {
                    var e = new Event();
                    e.data = value;
                    element.emit(key, e);
                }
                else if (value !== undefined) {
                    element.set(key, value + '');
                }
            });
        }
        function v_AttributeEvent(element, name, key) {
            element.on(name, function (event, name) {
                var func = object[key];
                if (typeof func == 'function') {
                    func.call(object, event, name);
                }
            });
        }
        function v_AttributeSet(element, data, name, attrs) {
            for (var key in attrs) {
                var v = attrs[key];
                if (key.substr(0, 2) == 'on') {
                    if (typeof v == 'string') {
                        v_AttributeEvent(element, key.substr(2), v);
                    }
                }
                else if (v instanceof ker.Evaluate) {
                    v_AttributeEvaluate(element, data, key, v);
                }
                else {
                    element.set(key, v);
                }
            }
        }
        ;
        function v_createElement(name) {
            return document.createElement(name);
        }
        ;
        function v_For(element, data, name, attrs, children) {
            var v = attrs["kk:for"];
            if (v instanceof ker.Evaluate) {
                delete attrs["kk:for"];
                var indexKey_1 = attrs["kk:index"] || 'index';
                var itemKey_1 = attrs["kk:item"] || 'item';
                var elements_1 = [];
                var datas_1 = [];
                var before_1 = v_createElement("element");
                element.append(before_1);
                data.on(v, function (value, changedKeys) {
                    var index = 0;
                    var forItem = function (item) {
                        var e = index < elements_1.length ? elements_1[index] : undefined;
                        var d = index < datas_1.length ? datas_1[index] : undefined;
                        if (e === undefined) {
                            e = v_createElement(name);
                            before_1.before(e);
                            d = new ker.Data(data.global);
                            d.setParent(data);
                            v_AttributeSet(e, d, name, attrs);
                            pageViewContext.push([]);
                            children(e, d);
                            pageViewContext.pop();
                            d.set([indexKey_1], index, false);
                            d.set([itemKey_1], item, false);
                            d.changeKeys();
                            elements_1.push(e);
                            datas_1.push(d);
                        }
                        else {
                            d.begin();
                            d.set([indexKey_1], index, false);
                            d.set([itemKey_1], item, false);
                            d.commit();
                        }
                        index++;
                    };
                    if (value instanceof Array) {
                        for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                            var v_1 = value_1[_i];
                            forItem(v_1);
                        }
                    }
                    while (index < elements_1.length) {
                        var e = elements_1.pop();
                        var d = datas_1.pop();
                        e.recycle();
                        e.remove();
                        d.recycle();
                    }
                });
            }
        }
        ;
        function v_IfElseIfElse(evaluate, element, data, name, attrs, children) {
            var scope = pageViewContext[pageViewContext.length - 1];
            var before = document.createElement("element");
            var e;
            var d;
            element.append(before);
            scope.push(function (enabled) {
                if (enabled && (evaluate === undefined || evaluate.exec(data.object, data.global))) {
                    if (e === undefined) {
                        e = v_createElement(name);
                        before.before(e);
                        d = new ker.Data(data.global);
                        d.setParent(data);
                        v_AttributeSet(e, d, name, attrs);
                        pageViewContext.push([]);
                        children(e, d);
                        pageViewContext.pop();
                    }
                    d.changeKeys();
                    return true;
                }
                else if (e !== undefined) {
                    e.recycle();
                    e.remove();
                    e = undefined;
                    d.recycle();
                    d = undefined;
                }
                return false;
            });
            if (evaluate !== undefined) {
                data.on(evaluate, function (value, changedKeys) {
                    var enabled = true;
                    for (var _i = 0, scope_1 = scope; _i < scope_1.length; _i++) {
                        var item = scope_1[_i];
                        if (item(enabled)) {
                            enabled = false;
                        }
                    }
                });
            }
        }
        ;
        function v_Element(element, data, name, attrs, children) {
            if (name == "body") {
                v_AttributeSet(element, data, name, attrs);
                pageViewContext.push([]);
                children(element, data);
                pageViewContext.pop();
            }
            else if (attrs["kk:for"]) {
                v_For(element, data, name, attrs, children);
            }
            else if (attrs["kk:if"]) {
                var v = attrs["kk:if"];
                if (v instanceof ker.Evaluate) {
                    delete attrs["kk:if"];
                    v_IfElseIfElse(v, element, data, name, attrs, children);
                }
            }
            else if (attrs["kk:elseif"]) {
                var v = attrs["kk:elseif"];
                if (v instanceof ker.Evaluate) {
                    delete attrs["kk:elseif"];
                    v_IfElseIfElse(v, element, data, name, attrs, children);
                }
            }
            else if (attrs["kk:else"]) {
                delete attrs["kk:else"];
                v_IfElseIfElse(undefined, element, data, name, attrs, children);
            }
            else {
                var e = v_createElement(name);
                element.append(e);
                v_AttributeSet(e, data, name, attrs);
                pageViewContext.push([]);
                children(e, data);
                pageViewContext.pop();
            }
        }
        ;
        pageViewContext.push([]);
        cb(v_Element, function (func, keys) {
            return new ker.Evaluate(func, keys);
        });
        pageViewContext.pop();
    }
    ker.View = View;
})(ker || (ker = {}));
var ker;
(function (ker) {
    function Page(object, page) {
        var setTimeout = page.getLibrary("setTimeout");
        var basename = object.path;
        var i = basename.lastIndexOf(".");
        if (i >= 0) {
            basename = basename.substr(0, i);
        }
        if (object.view === undefined) {
            object.view = "view";
        }
        var document = new Document();
        var context = new UIViewContext(app);
        var layouting = false;
        var element = document.createElement("view");
        var data = new ker.Data(object);
        context.setUnit("px", screen.density, 0);
        if (object.data !== undefined) {
            data.object = object.data;
        }
        document.rootElement = element;
        var layout = function () {
            layouting = false;
            if (page.view) {
                if (object.onlayouting !== undefined) {
                    object.onlayouting(document);
                }
                context.layout(element);
                context.obtainView(element);
                if (object.onlayout !== undefined) {
                    object.onlayout(document);
                }
            }
        };
        var setLayout = function () {
            if (layouting) {
                return;
            }
            layouting = true;
            setTimeout(layout, 0);
        };
        page.on("resize", function () {
            context.setSize(page.width, page.height);
            element.setFrame(0, 0, page.width, page.height);
            setLayout();
        });
        page.on("unload", function () {
            element.recycle();
            if (object.onunload !== undefined) {
                object.onunload();
            }
        });
        page.on("ready", function () {
            context.page = page;
            context.view = page.view;
            element.setFrame(0, 0, page.width, page.height);
            layout();
        });
        page.on("data", function (e, name) {
            var v = e.data;
            if (typeof v == 'object') {
                data.setData(v);
                setLayout();
            }
        });
        document.on("layout", function () {
            setLayout();
        });
        ker.View(document, object, function (V, E) {
            app.exec(basename + "_" + object.view + ".js", {
                element: element,
                data: data,
                V: V,
                E: E
            });
        });
        data.changeKeys();
        setLayout();
        console.info(element.toString());
        object.document = document;
        object.data = data.object;
        object.setData = function (object) {
            data.setData(object);
            setLayout();
        };
        var dataing;
        object.postData = function (object) {
            if (dataing === undefined) {
                dataing = object;
                setTimeout(function () {
                    if (dataing !== undefined) {
                        var v = dataing;
                        dataing = undefined;
                        data.setData(v);
                        setLayout();
                    }
                }, 0);
            }
            else {
                for (var key in object) {
                    dataing[key] = object[key];
                }
            }
        };
        if (object.onload !== undefined) {
            object.onload(document);
        }
    }
    ker.Page = Page;
})(ker || (ker = {}));
var ker;
(function (ker) {
    var Audio = global.Audio;
    var queue;
    var output;
    var file;
    function recycle() {
        if (queue !== undefined) {
            queue.off();
            queue.stop();
            queue = undefined;
        }
        if (output !== undefined) {
            output.close();
            output = undefined;
        }
        if (file !== undefined) {
            file.remove();
            file = undefined;
        }
    }
    function startRecord(object) {
        recycle();
        Audio.startSession(Audio.PlayAndRecord, function (errmsg) {
            if (errmsg) {
                if (object.fail !== undefined) {
                    object.fail(errmsg);
                }
                if (object.complete !== undefined) {
                    object.complete();
                }
            }
            else {
                file = app.openTempFile("ker_startRecord_", ".spx");
                var input = file.openOutputStream();
                var buffer = new BufferOutputStream(input, 2048);
                output = new SpeexOutputStream(buffer, 10);
                queue = new AudioQueueInput(output);
                queue.on("error", function (e) {
                    if (object.fail !== undefined) {
                        object.fail(e.data.errmsg);
                    }
                    if (object.complete !== undefined) {
                        object.complete();
                    }
                    recycle();
                });
                queue.on("done", function (e) {
                    if (object.success !== undefined) {
                        object.success({
                            tempFile: file,
                            duration: queue.duration
                        });
                    }
                    if (object.complete !== undefined) {
                        object.complete();
                    }
                    recycle();
                });
                queue.start();
            }
        });
    }
    ker.startRecord = startRecord;
    function stopRecord() {
        if (queue !== undefined) {
            queue.stop();
        }
    }
    ker.stopRecord = stopRecord;
})(ker || (ker = {}));
var ker;
(function (ker) {
    var Audio = global.Audio;
    var playQueue;
    var playInput;
    function playRecycle() {
        if (playQueue !== undefined) {
            playQueue.off();
            playQueue.stop();
            playQueue = undefined;
        }
        if (playInput !== undefined) {
            playInput.close();
            playInput = undefined;
        }
    }
    function playVoice(object) {
        playRecycle();
        Audio.startSession(Audio.Playback, function (errmsg) {
            if (errmsg) {
                if (object.fail !== undefined) {
                    object.fail(errmsg);
                }
                if (object.complete !== undefined) {
                    object.complete();
                }
            }
            else {
                var input = object.file.openInputStream();
                if (input === undefined) {
                    if (object.fail !== undefined) {
                        object.fail("未找到文件");
                    }
                    if (object.complete !== undefined) {
                        object.complete();
                    }
                    return;
                }
                var buffer = new BufferInputStream(input);
                playInput = Audio.openInputStream(buffer);
                if (playInput === undefined) {
                    playRecycle();
                    if (object.fail !== undefined) {
                        object.fail("不支持的文件类型");
                    }
                    if (object.complete !== undefined) {
                        object.complete();
                    }
                    return;
                }
                playQueue = new AudioQueueOutput(playInput);
                playQueue.on("error", function (e) {
                    if (object.fail !== undefined) {
                        object.fail(e.data.errmsg);
                    }
                    if (object.complete !== undefined) {
                        object.complete();
                    }
                    playRecycle();
                });
                playQueue.on("done", function (e) {
                    if (object.success !== undefined) {
                        object.success();
                    }
                    if (object.complete !== undefined) {
                        object.complete();
                    }
                    playRecycle();
                });
                playQueue.start();
            }
        });
    }
    ker.playVoice = playVoice;
    function stopVoice(object) {
        playRecycle();
        if (object.success !== undefined) {
            object.success();
        }
        if (object.complete !== undefined) {
            object.complete();
        }
    }
    ker.stopVoice = stopVoice;
})(ker || (ker = {}));
var ker;
(function (ker) {
    var Audio = global.Audio;
    var mixWithOther = false;
    var obeyMuteSwitch = false;
    function setInnerAudioOption(object) {
        if (object.mixWithOther !== undefined) {
            mixWithOther = object.mixWithOther;
        }
        if (object.obeyMuteSwitch !== undefined) {
            obeyMuteSwitch = object.obeyMuteSwitch;
        }
        if (object.success !== undefined) {
            object.success();
        }
        if (object.complete !== undefined) {
            object.complete();
        }
    }
    ker.setInnerAudioOption = setInnerAudioOption;
    function getAvailableAudioSources(object) {
        if (object.success !== undefined) {
            object.success({
                audioSources: ['auto']
            });
        }
        if (object.complete !== undefined) {
            object.complete();
        }
    }
    ker.getAvailableAudioSources = getAvailableAudioSources;
    var InnerAudioContext = /** @class */ (function () {
        function InnerAudioContext() {
        }
        InnerAudioContext.prototype.startPlaying = function () {
            if (this._queue !== undefined) {
                this._queue.off();
                this._queue.stop();
                this._queue = undefined;
            }
            if (this._input !== undefined) {
                this._input.close();
                this._input = undefined;
            }
            if (this._src) {
                this._input = this.openInputStream(this._src);
                if (this._input === undefined) {
                    this.doError("无法识别的文件", 10003);
                }
            }
            if (this._input !== undefined && this._autoplay) {
                this.play();
            }
        };
        Object.defineProperty(InnerAudioContext.prototype, "src", {
            get: function () {
                return this._src;
            },
            set: function (v) {
                this._src = v;
                this.startPlaying();
            },
            enumerable: true,
            configurable: true
        });
        InnerAudioContext.prototype.doError = function (errMsg, errCode) {
            if (this._onError !== undefined) {
                this._onError({
                    errMsg: errMsg,
                    errCode: errCode
                });
            }
        };
        InnerAudioContext.prototype.openInputStream = function (v) {
            var file = app.openFileURI(v);
            if (file === undefined) {
                throw "Wrong resource address";
            }
            var buffer = new BufferInputStream(file.openInputStream());
            var inp = Audio.openInputStream(buffer);
            if (inp === undefined) {
                buffer.close();
                throw "Unrecognized audio format";
            }
            return inp;
        };
        Object.defineProperty(InnerAudioContext.prototype, "startTime", {
            get: function () {
                return this._startTime;
            },
            set: function (v) {
                this._startTime = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InnerAudioContext.prototype, "autoplay", {
            get: function () {
                return this._autoplay;
            },
            set: function (v) {
                this._autoplay = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InnerAudioContext.prototype, "loop", {
            get: function () {
                return this._loop;
            },
            set: function (v) {
                this._loop = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InnerAudioContext.prototype, "obeyMuteSwitch", {
            get: function () {
                return this._obeyMuteSwitch;
            },
            set: function (v) {
                this._obeyMuteSwitch = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InnerAudioContext.prototype, "volume", {
            get: function () {
                return this._volume;
            },
            set: function (v) {
                this._volume = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InnerAudioContext.prototype, "duration", {
            get: function () {
                return this._duration;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InnerAudioContext.prototype, "currentTime", {
            get: function () {
                return this._currentTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InnerAudioContext.prototype, "paused", {
            get: function () {
                return this._paused;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InnerAudioContext.prototype, "buffered", {
            get: function () {
                return this._buffered;
            },
            enumerable: true,
            configurable: true
        });
        InnerAudioContext.prototype.play = function () {
            var _this = this;
            if (this._input === undefined) {
                if (this._src) {
                    this._input = this.openInputStream(this._src);
                    if (this._input === undefined) {
                        this.doError("无法识别的文件", 10003);
                        return;
                    }
                }
                else {
                    return;
                }
            }
            if (this._queue === undefined) {
                this._queue = new AudioQueueOutput(this._input);
                this._queue.on("error", function () {
                    _this.destroy();
                    _this.doError("错误的音频文件", 10003);
                });
                this._queue.on("done", function () {
                    if (_this._loop) {
                        _this._queue.seek(0);
                    }
                });
                this._queue.start();
                this._paused = false;
            }
            else if (this._paused) {
                this._queue.resume();
                this._paused = false;
            }
            else {
                this._queue.seek(0);
            }
        };
        InnerAudioContext.prototype.pause = function () {
            if (this._paused) {
                return;
            }
            if (this._queue === undefined) {
                return;
            }
            this._paused = true;
            this._queue.pause();
        };
        InnerAudioContext.prototype.stop = function () {
            if (this._input === undefined) {
                return;
            }
            if (this._queue === undefined) {
                return;
            }
            this._queue.stop();
            this._queue = undefined;
            this._paused = false;
        };
        InnerAudioContext.prototype.seek = function (position) {
            if (this._queue === undefined) {
                return;
            }
            this._queue.seek(position * 1000);
        };
        InnerAudioContext.prototype.destroy = function () {
            if (this._queue !== undefined) {
                this._queue.off();
                this._queue.stop();
                this._queue = undefined;
            }
            if (this._input !== undefined) {
                this._input.close();
                this._input = undefined;
            }
        };
        InnerAudioContext.prototype.onCanplay = function (func) {
            this._onCanplay = func;
        };
        InnerAudioContext.prototype.offCanplay = function (func) {
            if (func === undefined || func == this._onCanplay) {
                this._onCanplay = undefined;
            }
        };
        InnerAudioContext.prototype.onPlay = function (func) {
            this._onPlay = func;
        };
        InnerAudioContext.prototype.offPlay = function (func) {
            if (func === undefined || func == this._onPlay) {
                this._onPlay = undefined;
            }
        };
        InnerAudioContext.prototype.onPause = function (func) {
            this._onPause = func;
        };
        InnerAudioContext.prototype.offPause = function (func) {
            if (func === undefined || func == this._onPause) {
                this._onPause = undefined;
            }
        };
        InnerAudioContext.prototype.onStop = function (func) {
            this._onStop = func;
        };
        InnerAudioContext.prototype.offStop = function (func) {
            if (func === undefined || func == this._onStop) {
                this._onStop = undefined;
            }
        };
        InnerAudioContext.prototype.onEnded = function (func) {
            this._onEnded = func;
        };
        InnerAudioContext.prototype.offEnded = function (func) {
            if (func === undefined || func == this._onEnded) {
                this._onEnded = undefined;
            }
        };
        InnerAudioContext.prototype.onTimeUpdate = function (func) {
            this._onTimeUpdate = func;
        };
        InnerAudioContext.prototype.offTimeUpdate = function (func) {
            if (func === undefined || func == this._onTimeUpdate) {
                this._onTimeUpdate = undefined;
            }
        };
        InnerAudioContext.prototype.onError = function (func) {
            this._onError = func;
        };
        InnerAudioContext.prototype.offError = function (func) {
            if (func === undefined || func == this._onError) {
                this._onError = undefined;
            }
        };
        InnerAudioContext.prototype.onWaiting = function (func) {
            this._onWaiting = func;
        };
        InnerAudioContext.prototype.offWaiting = function (func) {
            if (func === undefined || func == this._onWaiting) {
                this._onWaiting = undefined;
            }
        };
        InnerAudioContext.prototype.onSeeking = function (func) {
            this._onSeeking = func;
        };
        InnerAudioContext.prototype.offSeeking = function (func) {
            if (func === undefined || func == this._onSeeking) {
                this._onSeeking = undefined;
            }
        };
        InnerAudioContext.prototype.onSeeked = function (func) {
            this._onSeeked = func;
        };
        InnerAudioContext.prototype.offSeeked = function (func) {
            if (func === undefined || func == this._onSeeked) {
                this._onSeeked = undefined;
            }
        };
        return InnerAudioContext;
    }());
    ker.InnerAudioContext = InnerAudioContext;
    function createInnerAudioContext() {
        Audio.startSession(Audio.SoloAmbient, function (errmsg) { });
        return new InnerAudioContext();
    }
    ker.createInnerAudioContext = createInnerAudioContext;
})(ker || (ker = {}));
var ker;
(function (ker) {
    var RequestRes = /** @class */ (function () {
        function RequestRes() {
        }
        return RequestRes;
    }());
    ker.RequestRes = RequestRes;
    var RequestTask = /** @class */ (function () {
        function RequestTask(request) {
            var _this = this;
            this._request = request;
            request.on("response", function (event) {
                _this.onResponse(request.responseHeaders);
            });
        }
        RequestTask.prototype.onResponse = function (header) {
            if (this._onHeadersReceived !== undefined) {
                this._onHeadersReceived(header);
            }
        };
        RequestTask.prototype.onHeadersReceived = function (v) {
            this._onHeadersReceived = v;
        };
        RequestTask.prototype.offHeadersReceived = function (v) {
            if (v === undefined || v == this._onHeadersReceived) {
                this._onHeadersReceived = undefined;
            }
        };
        RequestTask.prototype.abort = function () {
            this._request.cancel();
        };
        return RequestTask;
    }());
    ker.RequestTask = RequestTask;
    function request(object) {
        var responseType = HTTPRequest.ResponseTypeString;
        var url = object.url;
        var method = object.method || "GET";
        if (object.responseType == "arraybuffer") {
            responseType = HTTPRequest.ResponseTypeArrayBuffer;
        }
        if (method == 'GET') {
            if (typeof object.data == 'object') {
                var vs = [];
                for (var key in object.data) {
                    var v = object.data[key];
                    vs.push(key + '=' + encodeURIComponent(v + ''));
                }
                if (vs.length > 0) {
                    if (url.endsWith("?")) {
                        url += vs.join("&");
                    }
                    else if (url.indexOf("?") >= 0) {
                        url += "&" + vs.join("&");
                    }
                    else {
                        url += "?" + vs.join("&");
                    }
                }
            }
        }
        console.info("[HTTP]", url);
        var req = new HTTPRequest();
        var contentType;
        if (object.header) {
            for (var key in object.header) {
                req.setRequestHeader(key, object.header[key]);
                if (key.toLowerCase() == 'content-type') {
                    contentType = object.header[key];
                }
            }
        }
        if (contentType === undefined && method != 'GET') {
            contentType = 'application/x-www-form-urlencoded';
            req.setRequestHeader('Content-Type', contentType);
        }
        req.on("done", function (event) {
            if (object.success !== undefined) {
                var res = new RequestRes();
                if (object.responseType == "arraybuffer") {
                    res.data = req.responseArrayBuffer;
                }
                else if (object.dataType === undefined || object.dataType == 'json') {
                    var v = req.responseText;
                    try {
                        res.data = JSON.parse(v);
                    }
                    catch (e) {
                        if (object.dataType == 'json') {
                            console.info("[HTTP] [JSON] [ERROR]", v);
                            if (object.fail !== undefined) {
                                object.fail(e + '');
                            }
                            if (object.complete !== undefined) {
                                object.complete();
                            }
                            return;
                        }
                        else {
                            res.data = v;
                        }
                    }
                }
                else {
                    res.data = req.responseText;
                }
                res.statusCode = req.statusCode;
                res.header = req.responseHeaders;
                object.success(res);
            }
            if (object.complete !== undefined) {
                object.complete();
            }
        });
        req.on("error", function (event) {
            if (object.fail !== undefined) {
                object.fail(event.data.errmsg);
            }
            if (object.complete !== undefined) {
                object.complete();
            }
        });
        req.open(method, url, responseType);
        if (method != 'GET') {
            if (object.data instanceof ArrayBuffer) {
                req.send(object.data);
            }
            else if (typeof object.data == 'string') {
                req.send(object.data);
            }
            else if (typeof object.data == 'object') {
                if (contentType == 'json') {
                    req.send(JSON.stringify(object.data));
                }
                else {
                    var vs = [];
                    for (var key in object.data) {
                        var v = object.data[key];
                        vs.push(key + '=' + encodeURIComponent(v + ''));
                    }
                    req.send(vs.join('&'));
                }
            }
            else {
                req.send();
            }
        }
        else {
            req.send();
        }
        return new RequestTask(req);
    }
    ker.request = request;
    var DownloadFileTask = /** @class */ (function () {
        function DownloadFileTask(request) {
            var _this = this;
            this._request = request;
            request.on("response", function (event) {
                _this.onResponse(request.responseHeaders);
            });
            request.on("progress", function (event) {
                var data = event.data;
                var bytes = data.bytes;
                var total = data.total;
                _this.onProgress(total > 0 ? parseInt((100 * bytes / total) + '') : 0, total, bytes);
            });
        }
        DownloadFileTask.prototype.onResponse = function (header) {
            if (this._onHeadersReceived !== undefined) {
                this._onHeadersReceived(header);
            }
        };
        DownloadFileTask.prototype.onProgress = function (progress, totalBytesWritten, totalBytesExpectedToWrite) {
            if (this._onProgresUpdate !== undefined) {
                this._onProgresUpdate(progress, totalBytesWritten, totalBytesExpectedToWrite);
            }
        };
        DownloadFileTask.prototype.onHeadersReceived = function (v) {
            this._onHeadersReceived = v;
        };
        DownloadFileTask.prototype.offHeadersReceived = function (v) {
            if (v === undefined || v == this._onHeadersReceived) {
                this._onHeadersReceived = undefined;
            }
        };
        DownloadFileTask.prototype.onProgresUpdate = function (v) {
            this._onProgresUpdate = v;
        };
        DownloadFileTask.prototype.offProgresUpdate = function (v) {
            if (v === undefined || v == this._onProgresUpdate) {
                this._onProgresUpdate = undefined;
            }
        };
        DownloadFileTask.prototype.abort = function () {
            this._request.cancel();
        };
        return DownloadFileTask;
    }());
    ker.DownloadFileTask = DownloadFileTask;
    function downloadFile(object) {
        var url = object.url;
        console.info("[HTTP]", url);
        var req = new HTTPRequest();
        if (object.header) {
            for (var key in object.header) {
                req.setRequestHeader(key, object.header[key]);
            }
        }
        req.on("done", function (event) {
            var file = req.responseFile;
            var success = function (file) {
                if (object.success !== undefined) {
                    object.success({
                        tempFile: file,
                        tempFilePath: file.name,
                        statusCode: req.statusCode
                    });
                }
                if (object.complete !== undefined) {
                    object.complete();
                }
            };
            if (object.file === undefined && object.filePath !== undefined) {
                object.file = app.openFileURI(object.filePath);
            }
            if (object.file !== undefined) {
                file.move(object.file, function () {
                    success(object.file);
                });
            }
            else {
                success(file);
            }
        });
        req.on("error", function (event) {
            if (object.fail !== undefined) {
                object.fail(event.data.errmsg);
            }
            if (object.complete !== undefined) {
                object.complete();
            }
        });
        req.open("GET", url, HTTPRequest.ResponseTypeFile);
        req.send();
        return new DownloadFileTask(req);
    }
    ker.downloadFile = downloadFile;
    var UploadFileTask = /** @class */ (function () {
        function UploadFileTask(request) {
            var _this = this;
            this._request = request;
            request.on("response", function (event) {
                _this.onResponse(request.responseHeaders);
            });
            request.on("progress", function (event) {
                var data = event.data;
                var bytes = data.bytes;
                var total = data.total;
                _this.onProgress(total > 0 ? parseInt((100 * bytes / total) + '') : 0, total, bytes);
            });
        }
        UploadFileTask.prototype.onResponse = function (header) {
            if (this._onHeadersReceived !== undefined) {
                this._onHeadersReceived(header);
            }
        };
        UploadFileTask.prototype.onProgress = function (progress, totalBytesWritten, totalBytesExpectedToWrite) {
            if (this._onProgresUpdate !== undefined) {
                this._onProgresUpdate(progress, totalBytesWritten, totalBytesExpectedToWrite);
            }
        };
        UploadFileTask.prototype.onHeadersReceived = function (v) {
            this._onHeadersReceived = v;
        };
        UploadFileTask.prototype.offHeadersReceived = function (v) {
            if (v === undefined || v == this._onHeadersReceived) {
                this._onHeadersReceived = undefined;
            }
        };
        UploadFileTask.prototype.onProgresUpdate = function (v) {
            this._onProgresUpdate = v;
        };
        UploadFileTask.prototype.offProgresUpdate = function (v) {
            if (v === undefined || v == this._onProgresUpdate) {
                this._onProgresUpdate = undefined;
            }
        };
        UploadFileTask.prototype.abort = function () {
            this._request.cancel();
        };
        return UploadFileTask;
    }());
    ker.UploadFileTask = UploadFileTask;
    function uploadFile(object) {
        var url = object.url;
        console.info("[HTTP]", url);
        var req = new HTTPRequest();
        if (object.header) {
            for (var key in object.header) {
                req.setRequestHeader(key, object.header[key]);
            }
        }
        req.on("done", function (event) {
            if (object.success !== undefined) {
                object.success({
                    data: req.responseText,
                    statusCode: req.statusCode
                });
            }
            if (object.complete !== undefined) {
                object.complete();
            }
        });
        req.on("error", function (event) {
            if (object.fail !== undefined) {
                object.fail(event.data.errmsg);
            }
            if (object.complete !== undefined) {
                object.complete();
            }
        });
        req.open("POST", url, HTTPRequest.ResponseTypeString);
        var form = new FormData();
        if (object.formData !== undefined) {
            for (var key in object.formData) {
                form.append(key, object.formData[key]);
            }
        }
        if (object.file === undefined && object.filePath !== undefined) {
            object.file = app.openFileURI(object.filePath);
        }
        if (object.file !== undefined) {
            form.append(object.name, object.file);
        }
        req.send(form);
        return new UploadFileTask(req);
    }
    ker.uploadFile = uploadFile;
})(ker || (ker = {}));
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ker;
(function (ker) {
    var DBIndexType;
    (function (DBIndexType) {
        DBIndexType[DBIndexType["NONE"] = 0] = "NONE";
        DBIndexType[DBIndexType["ASC"] = 1] = "ASC";
        DBIndexType[DBIndexType["DESC"] = 2] = "DESC";
    })(DBIndexType = ker.DBIndexType || (ker.DBIndexType = {}));
    var DBFieldType;
    (function (DBFieldType) {
        DBFieldType[DBFieldType["VARCHAR"] = 0] = "VARCHAR";
        DBFieldType[DBFieldType["INT"] = 1] = "INT";
        DBFieldType[DBFieldType["TINYINT"] = 2] = "TINYINT";
        DBFieldType[DBFieldType["BIGINT"] = 3] = "BIGINT";
        DBFieldType[DBFieldType["DOUBLE"] = 4] = "DOUBLE";
        DBFieldType[DBFieldType["TEXT"] = 5] = "TEXT";
        DBFieldType[DBFieldType["BLOB"] = 6] = "BLOB";
    })(DBFieldType = ker.DBFieldType || (ker.DBFieldType = {}));
    var DBCommandType;
    (function (DBCommandType) {
        DBCommandType[DBCommandType["NONE"] = 0] = "NONE";
        DBCommandType[DBCommandType["ADD"] = 1] = "ADD";
        DBCommandType[DBCommandType["SET"] = 2] = "SET";
        DBCommandType[DBCommandType["REMOVE"] = 3] = "REMOVE";
    })(DBCommandType = ker.DBCommandType || (ker.DBCommandType = {}));
    function DBSQLDefaultValue(fd) {
        switch (fd.type) {
            case DBFieldType.VARCHAR:
                if (fd.default !== undefined) {
                    return JSON.stringify(fd.default + '');
                }
                break;
            case DBFieldType.INT:
            case DBFieldType.TINYINT:
            case DBFieldType.BIGINT:
            case DBFieldType.DOUBLE:
                if (fd.default !== undefined) {
                    return fd.default + '';
                }
                break;
        }
        return 'NULL';
    }
    function DBSQLType(fd) {
        var type = 'VARCHAR';
        switch (fd.type) {
            case DBFieldType.VARCHAR:
                type = 'VARCHAR';
                break;
            case DBFieldType.INT:
                type = 'INT';
                break;
            case DBFieldType.INT:
                type = 'TINYINT';
                break;
            case DBFieldType.BIGINT:
                type = 'BIGINT';
                break;
            case DBFieldType.DOUBLE:
                type = 'DOUBLE';
                break;
            case DBFieldType.TEXT:
                type = 'TEXT';
                break;
            case DBFieldType.BLOB:
                type = 'BLOB';
                break;
        }
        if (fd.length > 0) {
            type += '(' + fd.length + ')';
        }
        return type;
    }
    var DBTransaction = /** @class */ (function () {
        function DBTransaction(emittr) {
            this._emitter = emittr;
            this._commands = [];
        }
        DBTransaction.prototype.add = function (command) {
            this._commands.push(command);
        };
        DBTransaction.prototype.commit = function () {
            var e = new Event();
            e.data = this._commands;
            this._emitter.emit("change", e);
        };
        return DBTransaction;
    }());
    var DBContext = /** @class */ (function () {
        function DBContext(db) {
            this._emitter = new EventEmitter();
            this._db = db;
            this._db.exec("CREATE TABLE IF NOT EXISTS __entrys(name VARCHAR(255) PRIMARY KEY , value TEXT)", [], function (id, errmsg) {
                if (errmsg !== undefined) {
                    console.error("[DBContext] [constructor]", errmsg);
                }
            });
        }
        Object.defineProperty(DBContext.prototype, "db", {
            get: function () {
                return this._db;
            },
            enumerable: true,
            configurable: true
        });
        DBContext.prototype.on = function (name, func) {
            this._emitter.on(name, func);
        };
        DBContext.prototype.off = function (name, func) {
            this._emitter.off(name, func);
        };
        DBContext.prototype.has = function (name) {
            return this._emitter.has(name);
        };
        DBContext.prototype.emit = function (name, event) {
            this._emitter.emit(name, event);
        };
        DBContext.prototype.addEntry = function (entry) {
            var _this = this;
            this._db.query("SELECT * FROM __entrys WHERE name=?", [entry.name], function (items, errmsg) {
                if (errmsg !== undefined) {
                    console.error("[DBContext] [addEntry]", errmsg);
                }
                else if (items && items.length > 0) {
                    var e = JSON.parse(items[0]['value']);
                    var fds = {};
                    var hasUpdate = false;
                    for (var _i = 0, _a = e.fields; _i < _a.length; _i++) {
                        var fd = _a[_i];
                        fds[fd.name] = fd;
                    }
                    for (var _b = 0, _c = entry.fields; _b < _c.length; _b++) {
                        var fd = _c[_b];
                        var f = fds[fd.name];
                        if (f === undefined) {
                            var sql = [];
                            sql.push('ALTER TABLE [');
                            sql.push(entry.name);
                            sql.push("] ADD [");
                            sql.push(fd.name);
                            sql.push("] ");
                            sql.push(DBSQLType(fd));
                            sql.push(" DEFAULT ");
                            sql.push(DBSQLDefaultValue(fd));
                            sql.push("; ");
                            console.info("[SQL]", sql.join(''));
                            _this._db.exec(sql.join(''), [], function (id, errmsg) {
                                if (errmsg !== undefined) {
                                    console.error("[DBContext] [addEntry]", errmsg);
                                }
                            });
                            hasUpdate = true;
                        }
                        else if (f.type != fd.type || f.length != fd.length) {
                            var sql = [];
                            sql.push('ALTER TABLE [');
                            sql.push(entry.name);
                            sql.push("] CHANGE [");
                            sql.push(fd.name);
                            sql.push("] [");
                            sql.push(fd.name);
                            sql.push("] ");
                            sql.push(DBSQLType(fd));
                            sql.push(" DEFAULT ");
                            sql.push(DBSQLDefaultValue(fd));
                            sql.push("; ");
                            console.info("[SQL]", sql.join(''));
                            _this._db.exec(sql.join(''), [], function (id, errmsg) {
                                if (errmsg !== undefined) {
                                    console.error("[DBContext] [addEntry]", errmsg);
                                }
                            });
                            hasUpdate = true;
                        }
                        else if (fd.index != DBIndexType.NONE && f.index == DBIndexType.NONE) {
                            var sql = [];
                            sql.push('CREATE INDEX [');
                            sql.push(entry.name);
                            sql.push('_');
                            sql.push(fd.name);
                            sql.push('_idx] ON [');
                            sql.push(entry.name);
                            sql.push(']([');
                            sql.push(fd.name);
                            sql.push('] ');
                            if (fd.index == DBIndexType.DESC) {
                                sql.push('DESC');
                            }
                            else {
                                sql.push('ASC');
                            }
                            sql.push(');');
                            console.info("[SQL]", sql.join(''));
                            _this._db.exec(sql.join(''), [], function (id, errmsg) {
                                if (errmsg !== undefined) {
                                    console.error("[DBContext] [addEntry]", errmsg);
                                }
                            });
                            hasUpdate = true;
                        }
                    }
                    if (hasUpdate) {
                        console.info("[SQL]", "UPDATE __entrys SET value=? WHERE name=?;");
                        _this._db.exec("UPDATE __entrys SET value=? WHERE name=?;", [JSON.stringify(entry), entry.name], function (id, errmsg) {
                            if (errmsg !== undefined) {
                                console.error("[DBContext] [addEntry]", errmsg);
                            }
                        });
                    }
                }
                else {
                    var sql = [];
                    sql.push("CREATE TABLE IF NOT EXISTS [");
                    sql.push(entry.name);
                    sql.push("](id INTEGER PRIMARY KEY AUTOINCREMENT");
                    for (var _d = 0, _e = entry.fields; _d < _e.length; _d++) {
                        var fd = _e[_d];
                        sql.push(",[");
                        sql.push(fd.name);
                        sql.push('] ');
                        sql.push(DBSQLType(fd));
                        sql.push(" DEFAULT ");
                        sql.push(DBSQLDefaultValue(fd));
                    }
                    sql.push(");");
                    console.info("[SQL]", sql.join(''));
                    _this._db.exec(sql.join(''), [], function (id, errmsg) {
                        if (errmsg !== undefined) {
                            console.error("[DBContext] [addEntry]", errmsg);
                        }
                    });
                    console.info("[SQL]", "INSERT INTO __entrys(name,value) VALUES(?,?);");
                    _this._db.exec("INSERT INTO __entrys(name,value) VALUES(?,?);", [entry.name, JSON.stringify(entry)], function (id, errmsg) {
                        if (errmsg !== undefined) {
                            console.error("[DBContext] [addEntry]", errmsg);
                        }
                    });
                }
            });
        };
        DBContext.prototype.startTransaction = function () {
            return new DBTransaction(this._emitter);
        };
        DBContext.prototype.query = function (sql, data) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this._db.query(sql, data, function (objects, errmsg) {
                    if (errmsg !== undefined) {
                        reject(errmsg);
                    }
                    else {
                        resolve(objects);
                    }
                });
            });
        };
        DBContext.prototype.exec = function (sql, data) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this._db.exec(sql, data, function (id, errmsg) {
                    if (errmsg !== undefined) {
                        reject(errmsg);
                    }
                    else {
                        resolve(id);
                    }
                });
            });
        };
        DBContext.prototype.queryEntry = function (entry, sql, data) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this._db.query(['SELECT * FROM [', entry.name, '] ', sql].join(''), data, function (objects, errmsg) {
                    if (errmsg !== undefined) {
                        reject(errmsg);
                    }
                    else {
                        resolve(objects);
                    }
                });
            });
        };
        DBContext.prototype.add = function (object, entry, trans) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var sql = ['INSERT INTO [', entry.name, ']('];
                var names = [];
                var valus = [];
                var vs = [];
                for (var _i = 0, _a = entry.fields; _i < _a.length; _i++) {
                    var fd = _a[_i];
                    names.push('[' + fd.name + ']');
                    valus.push('?');
                    var v = object[fd.name];
                    if (v === undefined) {
                        vs.push(fd.default);
                    }
                    else {
                        vs.push(v);
                    }
                }
                sql.push(names.join(','));
                sql.push(') VALUES(');
                sql.push(valus.join(','));
                sql.push(')');
                console.info("[SQL]", sql.join(''), vs);
                _this._db.exec(sql.join(''), vs, function (id, errmsg) {
                    object.id = id;
                    if (errmsg === undefined) {
                        if (trans !== undefined) {
                            trans.add({
                                type: DBCommandType.ADD,
                                object: object,
                                entry: entry
                            });
                        }
                        resolve(object);
                    }
                    else {
                        reject(errmsg);
                    }
                });
            });
        };
        DBContext.prototype.remove = function (objects, entry, trans) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var sql = ['DELETE FROM [', entry.name, '] FROM [id] IN ('];
                var vs = [];
                var as = [];
                for (var _i = 0, objects_1 = objects; _i < objects_1.length; _i++) {
                    var v = objects_1[_i];
                    as.push("?");
                    vs.push(v.id);
                }
                sql.push(as.join(','));
                sql.push(")");
                console.info("[SQL]", sql.join(''), vs);
                _this._db.exec(sql.join(''), vs, function (id, errmsg) {
                    if (errmsg === undefined) {
                        if (trans !== undefined) {
                            trans.add({
                                type: DBCommandType.REMOVE,
                                objects: objects,
                                entry: entry
                            });
                        }
                        resolve(objects);
                    }
                    else {
                        reject(errmsg);
                    }
                });
            });
        };
        DBContext.prototype.set = function (object, entry, keys, trans) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var sql = ['UPDATE [', entry.name, '] SET '];
                var items = [];
                var vs = [];
                if (keys === undefined) {
                    keys = [];
                    for (var _i = 0, _a = entry.fields; _i < _a.length; _i++) {
                        var fd = _a[_i];
                        keys.push(fd.name);
                    }
                }
                var defaultValues = {};
                for (var _b = 0, _c = entry.fields; _b < _c.length; _b++) {
                    var fd = _c[_b];
                    defaultValues[fd.name] = fd.default;
                }
                for (var _d = 0, keys_1 = keys; _d < keys_1.length; _d++) {
                    var key = keys_1[_d];
                    var v = object[key];
                    if (v === undefined) {
                        v = defaultValues[key];
                    }
                    vs.push(v);
                    items.push('[' + key + ']=?');
                }
                sql.push(items.join(","));
                sql.push(" WHERE [id]=?");
                vs.push(object.id);
                console.info("[SQL]", sql.join(''), vs);
                _this._db.exec(sql.join(''), vs, function (id, errmsg) {
                    if (errmsg === undefined) {
                        if (trans !== undefined) {
                            trans.add({
                                type: DBCommandType.SET,
                                object: object,
                                keys: keys,
                                entry: entry
                            });
                        }
                        resolve(object);
                    }
                    else {
                        reject(errmsg);
                    }
                });
            });
        };
        return DBContext;
    }());
    ker.DBContext = DBContext;
})(ker || (ker = {}));
var ker;
(function (ker) {
    var Dialog = /** @class */ (function () {
        function Dialog(object) {
            var _this = this;
            this._object = object;
            this._data = new ker.Data(object);
            this._view = new UIView("view");
            this._view.baseURI = app.baseURI;
            this._viewContext = new UIViewContext(app);
            this._viewContext.view = this._view;
            this._document = new Document();
            this._element = this._document.createElement("layout");
            this._document.rootElement = this._element;
            this._viewElement = this._document.createElement("view");
            this._element.append(this._viewElement);
            this._layouting = false;
            this._onLayout = function (event) {
                _this.setLayout();
            };
            screen.on("change", this._onLayout);
        }
        Dialog.prototype.recycle = function () {
            screen.off("change", this._onLayout);
            this._data.off([]);
            this._element.recycle();
            this._view.removeView();
        };
        Dialog.prototype.layout = function () {
            this._viewContext.setSize(screen.width, screen.height);
            this._viewContext.setUnit("px", screen.density, 0);
            this._element.setFrame(0, 0, screen.width, screen.height);
            this._viewContext.layout(this._element);
            this._viewContext.obtainView(this._viewElement);
            this._layouting = false;
        };
        Dialog.prototype.setLayout = function () {
            var _this = this;
            if (this._layouting) {
                return;
            }
            this._layouting = true;
            setTimeout(function () {
                _this.layout();
            }, 0);
        };
        Dialog.prototype.setData = function (data) {
            this._data.setData(data);
            this.setLayout();
        };
        Object.defineProperty(Dialog.prototype, "view", {
            get: function () {
                return this._view;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Dialog.prototype, "document", {
            get: function () {
                return this._document;
            },
            enumerable: true,
            configurable: true
        });
        Dialog.prototype.create = function (func) {
            var _this = this;
            ker.View(this._document, this._object, function (V, E) {
                func(_this._viewElement, _this._data, V, E);
            });
            this.setLayout();
        };
        Dialog.prototype.open = function (path) {
            var _this = this;
            ker.View(this._document, this._object, function (V, E) {
                app.exec(path, {
                    element: _this._viewElement,
                    data: _this._data,
                    V: V,
                    E: E
                });
            });
            this.setLayout();
        };
        Dialog.prototype.show = function () {
            this._view.showToScreen();
        };
        Dialog.prototype.hide = function () {
            this._view.removeView();
        };
        return Dialog;
    }());
    ker.Dialog = Dialog;
})(ker || (ker = {}));
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
var ker;
(function (ker) {
    var ToastView = /** @class */ (function (_super) {
        __extends(ToastView, _super);
        function ToastView(object) {
            return _super.call(this, object) || this;
        }
        ToastView.prototype.create = function () {
            _super.prototype.create.call(this, function (element, data, V, E) {
                V(element, data, "body", {
                    'max-width': '400rpx',
                    'padding': '20rpx',
                    'background-color': 'rgba(0,0,0,0.75)',
                    'border-radius': '8rpx'
                }, function (element, data) {
                    V(element, data, "text", {
                        '#text': E(function (title) { return title; }, ['title']),
                        'font': '28rpx',
                        'color': '#fff'
                    }, function (element, data) { });
                });
            });
        };
        return ToastView;
    }(ker.Dialog));
    var audoId = 0;
    var viewSet = {};
    function showToast(object) {
        if (object.duration === undefined) {
            object.duration = 1500;
        }
        var id = (++audoId) + '';
        var view = new ToastView({});
        view.create();
        view.setData({
            title: object.title
        });
        view.layout();
        view.show();
        viewSet[id] = view;
        setTimeout(function () {
            view.hide();
            view.recycle();
            delete viewSet[id];
        }, object.duration);
        if (object.success !== undefined) {
            object.success();
        }
        if (object.complete !== undefined) {
            object.complete();
        }
    }
    ker.showToast = showToast;
    function hideToast(object) {
        var view;
        var id = 0;
        for (var key in viewSet) {
            if (parseInt(key) > id) {
                id = parseInt(key);
                view = viewSet[key];
            }
        }
        if (view !== undefined) {
            view.hide();
            view.recycle();
            delete viewSet[id + ''];
        }
        if (object.success !== undefined) {
            object.success();
        }
        if (object.complete !== undefined) {
            object.complete();
        }
    }
    ker.hideToast = hideToast;
})(ker || (ker = {}));
