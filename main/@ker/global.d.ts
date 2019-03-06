
declare class Event {
    constructor(target?: any)
    data: any
    returnValue: any
    readonly target: any
}

type EventFunction = (event: Event, name: string) => void

declare class EventEmitter {
    on(name: string, func: EventFunction): void
    off(name?: string, func?: EventFunction): void
    has(name: string): boolean
    emit(name: string, event: Event): void
}

type ElementKey = number

declare interface AttributeMap {
    [key: string]: string
}

declare class ElementEvent extends Event {
    dataSet: any
    cancelBubble: boolean
    readonly element: Element
    constructor(element: Element)
}

declare class Element extends EventEmitter {
    readonly elementId: ElementKey
    readonly name: string
    readonly document: Document
    readonly firstChild: Element | undefined
    readonly lastChild: Element | undefined
    readonly nextSibling: Element | undefined
    readonly prevSibling: Element | undefined
    readonly parent: Element | undefined
    baseURI: string
    append(element: Element): void
    appendTo(element: Element): void
    before(element: Element): void
    beforeTo(element: Element): void
    after(element: Element): void
    afterTo(element: Element): void
    remove(): void
    set(key: string, value: string | undefined): void
    get(key: string): string | undefined
    attributes(): AttributeMap
    setObject(key: string, object: any): void
    object(key: string): any
    dispatchEvent(name: string, event: Event): void
    toString(): string
    recycle(): void
    readonly dataSet: any
}

declare class StyleElement extends Element {
    status: string | undefined
    addStatus(s: string): void
    removeStatus(s: string): void
    hasStatus(s: string): boolean
    changedStatus(): void
}

declare class LayoutElement extends StyleElement {
    setFrame(x: number, y: number, width: number, height: number): void
    setContentSize(width: number, height: number): void
}

type LayoutFunction = (context: LayoutContext, element: LayoutElement) => void

declare class LayoutContext {
    setSize(width: number, height: number): void
    setUnit(name: string, scale: number, rate: number): void
    setLayout(name: string, func: LayoutFunction): void
    layout(element: LayoutElement): void
}

declare class Document extends EventEmitter {
    rootElement: Element | undefined
    createElement(name: string): Element
    elementsByName(name: string): Element[]
    set(name: string, library: string): void
    startTransaction(): void
    commitTransaction(): ArrayBuffer
    setTransaction(data: ArrayBuffer): void
    toString(): string
    baseURI: string
}


declare interface Library {
    [key: string]: any
}

declare interface Worker {
    terminate(): void
    postMessage(data: any): void
}

declare interface UICanvasGradient {
    addColorStop(offset: number, color: string): void
}

declare interface UICanvasPattern {

}

declare interface UICanvasCGContext {
    fillStyle: string | UICanvasGradient | UICanvasPattern | undefined
    globalAlpha: number
    globalCompositeOperation: string
    lineCap: string
    lineJoin: string
    lineWidth: number
    miterLimit: number
    shadowBlur: number
    shadowColor: number
    shadowOffsetX: number
    shadowOffsetY: number
    strokeStyle: string | UICanvasGradient | UICanvasPattern | undefined
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise: boolean): void
    arcTo(x1: number, y1: number, x2: number, y2: number, radius): void
    beginPath(): void
    bezierCurveTo(cpX1: number, cpY1: number, cpX2: number, cpY2: number, x: number, y: number): void
    clearRect(x: number, y: number, width: number, height: number): void
    clip(): void
    closePath(): void
    createLinearGradient(xStart: number, yStart: number, xEnd: number, yEnd: number): UICanvasGradient
    createPattern(image: UIImage, repetitionStyle: string): UICanvasPattern
    createRadialGradient(xStart: number, yStart: number, radiusStart: number, xEnd: number, yEnd: number, radiusEnd: number): UICanvasGradient
    createRadialGradient(xStart: number, yStart: number, radiusStart: number, xEnd: number, yEnd: number, radiusEnd: number): UICanvasGradient
    drawImage(image: UIImage, x: number, y: number): void
    drawImage(image: UIImage, x: number, y: number, width: number, height: number)
    drawImage(image: UIImage, sourceX: number, sourceY: number, sourceWidth: number, sourceHeight: number, destX: number, destY: number, destWidth: number, destHeight: number): void
    fill(): void
    fillRect(x: number, y: number, width: number, height: number): void
    lineTo(x: number, y: number): void
    moveTo(x: number, y: number): void
    quadraticCurveTo(cpX: number, cpY: number, x: number, y: number): void
    rect(x: number, y: number, width: number, height: number): void
    restore(): void
    rotate(angle: number): void
    save(): void
    scale(sx: number, sy: number): void
    stroke(): void
    strokeRect(x: number, y: number, width: number, height: number): void
    translate(dx: number, dy: number): void
    setFillStyle(v: string | UICanvasGradient | UICanvasPattern | undefined): void
    setGlobalAlpha(v: number): void
    setGlobalCompositeOperation(v: string): void
    setLineCap(v: string): void
    setLineJoin(v: string): void
    setLineWidth(v: number): void
    setMiterLimit(v: number): void
    setShadowBlur(v: number): void
    setShadowColor(v: string): void
    setShadowOffsetX(v: number): void
    setShadowOffsetY(v: number): void
    setStrokeStyle(v: string | UICanvasGradient | UICanvasPattern | undefined): void
    setLineDash(vs: number[]): void
}

declare interface UICanvasGLContext {

}

type UICanvasContext = UICanvasCGContext | UICanvasGLContext

declare interface UICanvas extends EventEmitter {
    getContext(name: string): UICanvasContext | undefined
    width: number
    height: number
}

declare enum ImageState {
    None = 0,
    Loading = 1,
    Error = 2,
    Loaded = 3
}

declare interface UIImage extends EventEmitter {
    readonly width: number
    readonly height: number
    readonly state: ImageState
}

declare class UIContext extends EventEmitter {
    exec(path: string, library?: Library): void
    getTextContent(path: string): string
    createWorker(path: string): Worker
    createCanvas(): UICanvas
    createImage(src: string): UIImage
    openFileURI(uri: string): File | undefined
    openFile(directory: string, path: string, type?: string): File | undefined
    openTempFile(prefix?: string, suffix?: string, type?: string): File
    readonly appkey: string
    readonly baseURI: string
}

declare interface UISize {
    width: number
    height: number
}

declare class UISpan {

}

declare class UITextSpan extends UISpan {
    constructor();
    text?: string
    font?: string
    color?: string
    backgroundColor?: string
    strokeColor?: string
    strokeWidth?: number
    lineSpacing?: number
    letterSpacing?: number
    paragraphSpacing?: number
    textAlign?: string
}

declare class UILinkSpan extends UITextSpan {
    constructor();
    href?: string
    target?: string
}

declare class UIImageSpan extends UISpan {
    constructor();
    image?: UIImage
    width?: number
    height?: number
    marginLeft?: number
    marginRight?: number
    marginTop?: number
    marginBottom?: number
}

declare class UIText {
    constructor();
    clear(): void
    add(span: UISpan): void
    location(x: number, y: number): UISpan | undefined
    getSize(maxWidth?: number): UISize
}

declare interface Size {
    width: number;
    height: number
}

declare class UIViewConfiguration {

}

declare enum UIWebViewUserScriptInjectionTime {
    Start = 0,
    End = 1
}

declare enum UIWebViewActionPolicy {
    Cancel = 0,
    Allow = 1
}

declare class UIWebViewConfiguration extends UIViewConfiguration {
    addUserScript(code: string, injectionTime: UIWebViewUserScriptInjectionTime): void
    addUserAction(pattern: string, policy: UIWebViewActionPolicy): void
}

declare enum UISubviewPosition {
    Front = 0,
    Back = 1
}

declare interface Point {
    x: number,
    y: number
}

declare class UIView extends EventEmitter {
    constructor(name: string, configuration?: UIViewConfiguration)
    set(key: string, value?: string): void
    setFrame(x: number, y: number, width: number, height: number): void
    setContentSize(width: number, height: number): void
    setContentOffset(x: number, y: number): void
    addSubview(v: UIView, position?: UISubviewPosition): void
    removeView(): void
    evaluateJavaScript(code: string): void
    setContent(content: string, contentType?: string, baseURI?: string): void
    setText(text: UIText | undefined): void
    setImage(image: UIImage | undefined): void
    contentOffset(): Point
    createCanvas(worker?: Worker): UICanvas
    showToScreen(): void
    baseURI: string
    static beginAnimation(): void
    static commitAnimation(): void
    static cancelAnimation(): void
    static setAnimationDuration(v: number): void
    static setAnimationRepeatCount(v: number): void
    static setAnimationAutoreverses(v: boolean): void
}

type StorageLoadCallback = (value: string | undefined) => void
type StorageLoadKeysCallback = (keys: string[]) => void

declare interface Storage {
    get(key: string): string | undefined
    set(key: string, value: string): void
    load(key: string, cb: StorageLoadCallback): void
    clear(): void
    keys(): string[]
    loadKeys(cb: StorageLoadKeysCallback): void
}

declare class UIApp extends UIContext {
    static readonly kDataDirectory: string
    static readonly kTemporaryDirectory: string
    open(uri: string, animated: boolean): void
    back(delta: number, animated: boolean): void
    openDataBase(name: string): Database
    readonly storage: Storage
}

declare class UIViewElement extends LayoutElement {
    readonly view: UIView | undefined
    obtainView(context: UIViewContext): void
    recycleView(): void
}

declare class UIViewContext extends LayoutContext {
    constructor(app: UIApp)
    view: UIView | undefined
    page: UIPage | undefined
    obtainView(element: UIViewElement): void
}

declare interface UISpanElement extends StyleElement {

}

declare interface UIImgElement extends StyleElement {

}

declare interface UITextElement extends UIViewElement {
    readonly text: UIText | undefined
}

declare interface UIInputElement extends UIViewElement {

}

declare interface UIPageOptions {
    [key: string]: any
}

declare interface UIPage extends EventEmitter {
    readonly app: UIApp
    readonly view: UIView
    readonly width: number
    readonly height: number
    setOptions(options: UIPageOptions): void
    close(animated: boolean): void
    getLibrary(name: string): any
}

declare interface UIScreen extends EventEmitter {
    readonly width: number
    readonly height: number
    readonly density: number
    readonly scale: number
}

declare interface Stream {
    close(): void
}

declare interface InputStream extends Stream {

}

declare class BufferInputStream implements InputStream {
    constructor(input: InputStream, size?: number)
    close(): void
}

declare interface OutputStream extends Stream {

}

declare class BufferOutputStream implements OutputStream {
    constructor(output: OutputStream, size?: number)
    flush(): boolean
    close(): void
}

declare interface AudioStream {
    close(): void
}

declare interface AudioInputStream extends AudioStream {
    seek(millisecond: number): void
    close(): void
}

declare interface AudioOutputStream extends AudioStream {
    close(): void
}

declare class Audio {
    static readonly Ambient: number
    static readonly SoloAmbient: number
    static readonly Playback: number
    static readonly Record: number
    static readonly PlayAndRecord: number
    static startSession(category: number, cb: (errmsg: string | undefined) => void): void
    static openInputStream(input: BufferInputStream): AudioInputStream | undefined
}

declare class AudioQueue extends EventEmitter {
    start(): void
    stop(): void
    resume(): void
    pause(): void
    readonly duration: number
}

declare class AudioQueueInput extends AudioQueue {

    constructor(output: AudioOutputStream);
}

declare class AudioQueueOutput extends AudioQueue {
    constructor(input: AudioInputStream);
    seek(millisecond: number): void
}


declare class SpeexOutputStream implements AudioOutputStream {
    constructor(output: OutputStream, quality?: number)
    close(): void
}

declare class SpeexInputStream implements AudioInputStream {
    constructor(input: BufferInputStream)
    seek(millisecond: number): void
    close(): void
}

declare interface HeaderSet {
    [key: string]: string
}

declare class HTTPRequest extends EventEmitter {
    static ResponseTypeNone: number
    static ResponseTypeString: number
    static ResponseTypeArrayBuffer: number
    static ResponseTypeFile: number
    static ResponseTypeUnzip: number
    constructor()
    open(method: string, url: string, responseType: number): void
    send(value?: string | ArrayBuffer | FormData | undefined): void
    cancel(): void
    setRequestHeader(key: string, value: string): void
    getResponseHeader(key: string): string | undefined
    readonly statusCode: number
    readonly responseText: string | undefined
    readonly responseFile: File | undefined
    readonly responseArrayBuffer: ArrayBuffer | undefined
    readonly responseHeaders: HeaderSet
}

declare type DatabaseValue = string | number | boolean | ArrayBuffer | undefined

declare interface DatabaseRow {
    [key: string]: DatabaseValue
}

declare interface Database {
    exec(sql: string, data: DatabaseValue[], cb: (id: number, errmsg: string | undefined) => void): void;
    query(sql: string, data: DatabaseValue[], cb: (items: DatabaseRow[], errmsg: string | undefined) => void): void;
    close(): void
}

declare interface Blob {
    readonly size: number
    readonly type: string
}

declare class File implements Blob {
    static open(uri: string, type?: string): File | undefined
    readonly size: number
    readonly type: string
    readonly name: string
    readonly lastModified: number
    remove(done?: () => void): void
    move(to: File, done?: () => void): void
    copy(to: File, done?: () => void): void
    openInputStream(): InputStream
    openOutputStream(append?: boolean): OutputStream
}

type FileList = File[]

declare class FileReader extends EventEmitter {
    static readonly EMPTY: number
    static readonly LOADING: number
    static readonly DONE: number
    readonly readyState: number
    readonly result: string | ArrayBuffer | undefined
    readonly error: string | undefined
    readonly md5: string
    readonly size: number
    readAsText(v: Blob | File): void
    readAsDataURL(v: Blob | File): void
    readAsArrayBuffer(v: Blob | File): void
    abort(): void;
    onload?: EventFunction
    onerror?: EventFunction
}

declare class URIQueryObject {
    [key: string]: string
}

declare class URI {
    constructor(v: string)
    scheme: string
    host: string
    hostname: string
    port: string
    query: string
    fragment: string
    path: string
    readonly queryObject: URIQueryObject
    get(key: string): string
    set(keu: string, value: string): void
    toString(): string
}

declare var app: UIApp
declare var userAgent: string
declare var platform: string
declare var path: string
declare var query: any
declare var page: UIPage
declare var screen: UIScreen
declare function compile(code: string, path: string): any


declare class Promise<T> {

    constructor(executor: (resolve: (value: T) => void, reject: (reason: any) => void) => void)

    then(onfulfilled?: (value: T) => T | Promise<T> | undefined, onrejected?: (reason: any) => void): void

    catch(onrejected?: (reason: any) => void): void

    finally(onfinally?: () => void): void

    static all(iterable: Promise<any>[]): Promise<any>
    static race(iterable: Promise<any>[]): Promise<any>
    static resolve(value: any): Promise<any>
    static reject(reason: any): Promise<any>
}

declare class FormData {
    constructor()
    append(key: string, value: string): void
    append(key: string, file: File): void
    append(key: string, blob: Blob, filename?: string): void
}

declare interface Crypto {
    MD5(v: string): string
    encodeBASE64(v: string): ArrayBuffer
}

declare var crypto: Crypto
