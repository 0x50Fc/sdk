"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function request(object) {
    return ker.request(object);
}
exports.request = request;
function uploadFile(object) {
    return ker.uploadFile(object);
}
exports.uploadFile = uploadFile;
function downloadFile(object) {
    return ker.downloadFile(object);
}
exports.downloadFile = downloadFile;
function reportAnalytics(name, data) {
}
exports.reportAnalytics = reportAnalytics;
function saveFile(object) {
    var file = app.openFileURI(object.tempFilePath);
    if (file === undefined) {
        if (object.fail !== undefined) {
            object.fail("未找到文件");
        }
        if (object.complete !== undefined) {
            object.complete();
        }
    }
    else {
        var i = object.tempFilePath.indexOf("://");
        var path_1 = object.tempFilePath.substr(i + 3);
        var toFile_1 = app.openFile(UIApp.kDataDirectory, "file" + path_1);
        file.move(toFile_1, function () {
            if (object.success !== undefined) {
                object.success({
                    savedFilePath: toFile_1.name
                });
            }
            if (object.complete !== undefined) {
                object.complete();
            }
        });
    }
}
exports.saveFile = saveFile;
function removeSavedFile(object) {
    var file = app.openFileURI(object.filePath);
    if (file === undefined) {
        if (object.fail !== undefined) {
            object.fail("未找到文件");
        }
        if (object.complete !== undefined) {
            object.complete();
        }
    }
    else {
        file.remove(function () {
            if (object.success !== undefined) {
                object.success({});
            }
            if (object.complete !== undefined) {
                object.complete();
            }
        });
    }
}
exports.removeSavedFile = removeSavedFile;
function getSystemInfoSync() {
    return {
        pixelRatio: screen.scale,
        screenWidth: screen.width,
        screenHeight: screen.height,
        windowWidth: screen.width,
        windowHeight: screen.height,
        statusBarHeight: 20
    };
}
exports.getSystemInfoSync = getSystemInfoSync;
function getSystemInfo(object) {
    if (object.success !== undefined) {
        object.success(getSystemInfoSync());
    }
    if (object.complete !== undefined) {
        object.complete();
    }
}
exports.getSystemInfo = getSystemInfo;
function showToast(object) {
    ker.showToast(object);
}
exports.showToast = showToast;
function hideToast(object) {
    ker.hideToast(object);
}
exports.hideToast = hideToast;
