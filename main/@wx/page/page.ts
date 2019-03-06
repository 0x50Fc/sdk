import { getApp } from "../App";
import { PageOptions, Page, PageViewInterface } from '../Page';

let appid: number = query.appid;
var refCount = getApp(appid)!;
var wx_app = refCount.object;
var wx_from = query.from || '';

refCount.retain();

page.on("unload", (): void => {
    refCount.release();
});

var webview: UIView

let resize = (): void => {
    let width = page.width;
    let height = page.height;
    let density = screen.density;
    let top = 64 * density;
    var rem = (Math.min(screen.width, screen.height) / screen.density) * 20 / 750.0;
    if (platform == 'Android') {
        top = 44 * density;
    } else if(platform == 'iOS' && screen.height >= 812) {
        top += 24;
    }
    webview.setFrame(0, top, width, height - top);
    webview.evaluateJavaScript("if(document.documentElement) { document.documentElement.style.fontSize = '" + rem + "px'; }")
}

let ready = (): void => {
    webview = new UIView("webview");
    page.view.addSubview(webview);
    resize();
    page.on("resize", resize);

    let wx_path = query.path as string;
    let wx_page = new Page(wx_app, wx_path, page);
    let wx_query: any
    try {
        wx_query = JSON.parse(query.query)
    } catch (e) {
        wx_query = {}
    }

    if (wx_page.options !== undefined) {
        webview.set("background-color", wx_page.options.backgroundColor || '#fff');
        page.setOptions({
            title: wx_page.options.navigationBarTitleText
        })
    }

    let viewInterface: PageViewInterface = {
        setData(object: ker.DataObject, id?: string): void {
            let vs: string[] = [JSON.stringify(object)];
            if (id !== undefined) {
                vs.push(id);
            }
            webview.evaluateJavaScript("kk.setData(" + vs.join(",") + ")");
        },
        sendEvent(id: string, name: string, data: any): void {
            let vs: string[] = [JSON.stringify(id), JSON.stringify(name), JSON.stringify(data)];
            webview.evaluateJavaScript("kk.sendEvent(" + vs.join(",") + ")");
        },
        addSubview(view: UIView): void {
            webview.addSubview(view)
        },
        setHTMLContent(content: string, basePath: string): void {
            webview.setContent(content, "text/html", basePath)
        },
        setPageOptions(options: PageViewInterface): void {
            page.setOptions(options)
        },
        setViewAttribute(name: string, value: string | undefined): void {
            webview.set(name, value);
        }
    };

    webview.on("data", (event: Event): void => {
        if (viewInterface.ondata !== undefined) {
            viewInterface.ondata(event.data);
        }
    })

    wx_page.run(viewInterface, wx_query);

    page.on("unload", (): void => {
        wx_page.recycle();
    });
}

if (page.view) {
    ready();
} else {
    page.on("ready", ready);
}
