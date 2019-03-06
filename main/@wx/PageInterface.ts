
import * as wx from "./wx";
import { App, QueryObject } from './App';
import { PageViewInterface } from "./Page";
import { ViewContext } from './ViewContext';

export interface PageInterfaceNavigateToObject {
    readonly url: string
}

export interface PageInterfaceNavigationBarTitleObject {
    readonly title: string
    success?: () => void
    fail?: (errmsg?: string) => void
    complete?: () => void
}

export class PageInterface implements wx.APIInterface {

    readonly app: App
    readonly basePath: string
    readonly viewInterface: PageViewInterface
    readonly viewContext: ViewContext

    constructor(app: App, basePath: string, viewInterface: PageViewInterface, viewContext: ViewContext) {
        this.app = app;
        this.basePath = basePath;
        this.viewInterface = viewInterface
        this.viewContext = viewContext
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

    navigateTo(object: PageInterfaceNavigateToObject): void {
        let url = object.url;
        let i = url.indexOf("?");
        let query: QueryObject = {};
        let path: string
        if (i > 0) {
            path = url.substr(0, i);
            let vs = url.substr(i + 1).split("&");
            for (let v of vs) {
                let kv = v.split("=");
                query[kv[0]] = kv.length > 1 ? decodeURIComponent(kv[1]) : "";
            }
        } else {
            path = url;
        }
        this.app.open(this.basePath + '/' + path, query)
    }

    setNavigationBarTitle(object: PageInterfaceNavigationBarTitleObject): void {
        this.viewInterface.setPageOptions({
            title: object.title
        })
        if (object.success !== undefined) {
            object.success();
        }
        if (object.complete !== undefined) {
            object.complete();
        }
    }

    createCanvasContext(canvasId: string): UICanvasCGContext {
        return this.viewContext.getCanvasContext(canvasId)
    }

    getSystemInfoSync(): wx.SystemInfo {
        return wx.getSystemInfoSync();
    }
    getSystemInfo(object: wx.GetSystemInfoObject): void {
        wx.getSystemInfo(object);
    }

    showToast(object: wx.WXShowToastObject): void {
        wx.showToast(object);
    }
    
    hideToast(object: wx.WXHideToastObject): void {
        wx.hideToast(object);
    }
    
    
}

