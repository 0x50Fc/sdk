
declare namespace ker {

    interface DataObject {
        [key: string]: any
    }

    interface DataKeySet {
        [key: string]: boolean
    }


    type EvaluateScript = any;

    class Evaluate {

        evaluateScript: EvaluateScript
        keys: string[]
        keySet: DataKeySet
        constructor(evaluateScript: EvaluateScript, keys: string[])
        exec(object: DataObject, global: DataObject): any
    }

    type DataFunction = (value: any, changedKeys: DataKeySet) => void;

    class IObject {
        [key: string]: any
        get(key: string): any
        set(key: string, value: any): void
    }

    class Data {

        constructor(global: DataObject);

        object: DataObject

        setData(data: DataObject, changed?: boolean): void

        begin(): void

        commit(): void

        cancel(): void

        changeKeys(keySet: DataKeySet): void

        on(keys: string[] | Evaluate, func: DataFunction, priority?: number): void

        off(keys: string[] | Evaluate, func?: DataFunction): void

        setParent(parent: Data | undefined): void

        recycle(): void

        get(keys: string[]): any

        set(keys: string[], value: any, changed: boolean): void

        static get(object: any, keys: string[], index?: number): any

        static set(object: any, keys: string[], value: any, index?: number): void

    }


    interface ViewObject {
        [key: string]: any
    }

    interface ViewAttributeSet {
        [key: string]: string | Evaluate
    }

    type ViewElementFuntion = (element: Element, data: Data, name: string, attrs: ViewAttributeSet, children: (element: Element, data: Data) => void) => void
    type ViewEvaluateFuntion = (func: EvaluateScript, keys: string[]) => Evaluate

    function View(document: Document, object: ViewObject, cb: (V: ViewElementFuntion, E: ViewEvaluateFuntion) => void): void

    interface UIPageObject extends ViewObject {
        path: string
        view?: string
        document?: Document
        data?: DataObject
        setData?: (object: DataObject) => void
        postData?: (object: DataObject) => void
        onload?: (document: Document) => void
        onunload?: () => void
        onlayout?: (document: Document) => void
        onlayouting?: (document: Document) => void
    }

    class Dialog {

        constructor(object: ViewObject);

        recycle(): void

        setLayout(): void

        setData(data: DataObject): void

        readonly view: UIView

        readonly document: Document

        create(object: ViewObject, func: (element: Element, data: Data, V: ViewElementFuntion, E: ViewEvaluateFuntion) => void): void

        open(path: string, object: ViewObject): void

        show(): void

        hide(): void
    }

    interface ShowToastObject {
        title: string
        duration?: number
        success?: () => void
        fail?: (errmsg?: string) => void
        complete?: () => void
    }

    function showToast(object: ShowToastObject): void

    interface HideToastObject {
        success?: () => void
        fail?: (errmsg?: string) => void
        complete?: () => void
    }

    function hideToast(object: HideToastObject): void

    interface KerAudioStartRecordRes {
        readonly tempFilePath: string
        readonly tempFile: File
        readonly duration: number
    }

    interface KerAudioStartRecordObject {
        success?: (res: KerAudioStartRecordRes) => void
        fail?: (errmsg?: string) => void
        complete?: () => void
    }

    function startRecord(object: KerAudioStartRecordObject): void
    function stopRecord(): void

    class RequestRes {
        data: any
        statusCode: number
        header: HeaderSet
    }

    interface RequestObject {
        url: string
        data?: any
        header?: HeaderSet
        method?: string
        dataType?: string
        responseType?: string
        success?: (res: RequestRes) => void
        fail?: (errmsg?: string) => void
        complete?: () => void
    }

    interface RequestTask {
        onHeadersReceived(v: (header: HeaderSet) => void): void
        offHeadersReceived(v?: (header: HeaderSet) => void): void
        abort(): void
    }

    function request(object: RequestObject): RequestTask;

    enum DBIndexType {
        NONE, ASC, DESC
    }

    enum DBFieldType {
        VARCHAR, INT, TINYINT, BIGINT, DOUBLE, TEXT, BLOB
    }

    interface DBField {
        readonly name: string
        readonly type: DBFieldType
        readonly index: DBIndexType
        readonly length: number
        readonly default: DatabaseValue
    }

    interface DBEntry {
        readonly name: string
        readonly fields: DBField[]
    }

    interface DBObject {
        id: number
        [key: string]: DatabaseValue
    }

    enum DBCommandType {
        ADD, SET, REMOVE
    }

    interface DBCommand {
        readonly type: DBCommandType
    }

    interface DBAddCommand extends DBCommand {
        readonly object: DBObject
        readonly entry: DBEntry
    }

    interface DBSetCommand extends DBCommand {
        readonly object: DBObject
        readonly entry: DBEntry
        readonly keys: string[]
    }

    interface DBRemoveCommand extends DBCommand {
        readonly objects: DBObject[]
        readonly entry: DBEntry
    }

    interface DBFieldSet {
        [key: string]: DBField
    }

    interface DBTransaction {
        commit(): void
    }

    class DBContext {

        constructor(db: Database)

        readonly db: Database

        on(name: string, func: EventFunction): void

        off(name?: string, func?: EventFunction): void

        has(name: string): boolean

        emit(name: string, event: Event): void

        addEntry(entry: DBEntry): void

        startTransaction(): DBTransaction

        query(sql: string, data: DatabaseValue[]): Promise<DatabaseRow[]>

        exec(sql: string, data: DatabaseValue[]): Promise<number>

        queryEntry(entry: DBEntry, sql: string, data: DatabaseValue[]): Promise<DBObject[]>

        add(object: DBObject, entry: DBEntry, trans?: DBTransaction): Promise<DBObject>

        remove(objects: DBObject[], entry: DBEntry, trans?: DBTransaction): Promise<DBObject[]>

        set(object: DBObject, entry: DBEntry, keys?: string[] | undefined, trans?: DBTransaction): Promise<DBObject>
    }

    function dateFormat(d: Date | string | number, fmt: string): string

    function maxlength(s: string, maxlength: number, tail?: string): string

    function Page(object: UIPageObject, page: UIPage): void

    interface AudioPlayVoiceObject {
        file: File
        success?: () => void
        fail?: (errmsg?: string) => void
        complete?: () => void
    }

    interface AudioStopVoiceObject {
        success?: () => void
        fail?: (errmsg?: string) => void
        complete?: () => void
    }

    function playVoice(object: AudioPlayVoiceObject): void

    function stopVoice(object: AudioStopVoiceObject): void

    export interface UploadFileRes {
        readonly data: string
        readonly statusCode: number
    }

    export interface UploadFileTask {
        onHeadersReceived(v: (header: HeaderSet) => void): void
        offHeadersReceived(v?: (header: HeaderSet) => void): void
        onProgresUpdate(v: (progress: number, totalBytesWritten: number, totalBytesExpectedToWrite: number) => void): void
        offProgresUpdate(v?: (progress: number, totalBytesWritten: number, totalBytesExpectedToWrite: number) => void): void
        abort(): void
    }
    export interface UploadFileFormData {
        [key: string]: string
    }

    export interface UploadFileObject {
        url: string
        name: string
        file?: File
        filePath?: string
        header?: HeaderSet
        formData?: UploadFileFormData
        success?: (res: UploadFileRes) => void
        fail?: (errmsg?: string) => void
        complete?: () => void
    }

    export function uploadFile(object: UploadFileObject): UploadFileTask

    export interface DownloadFileRes {
        readonly tempFile: File
        readonly statusCode: number
    }

    export interface DownloadFileTask {
        onHeadersReceived(v: (header: HeaderSet) => void): void
        offHeadersReceived(v?: (header: HeaderSet) => void): void
        onProgresUpdate(v: (progress: number, totalBytesWritten: number, totalBytesExpectedToWrite: number) => void): void
        offProgresUpdate(v?: (progress: number, totalBytesWritten: number, totalBytesExpectedToWrite: number) => void): void
        abort(): void
    }

    export interface DownloadFileObject {
        url: string
        header?: HeaderSet
        file?: File
        filePath?: string
        success?: (res: DownloadFileRes) => void
        fail?: (errmsg?: string) => void
        complete?: () => void
    }

    export function downloadFile(object: DownloadFileObject): DownloadFileTask

    export interface InnerAudioOptionObject {
        readonly mixWithOther?: boolean
        readonly obeyMuteSwitch?: boolean
        success?: () => void
        fail?: (errmsg?: string) => void
        complete?: () => void
    }

    export function setInnerAudioOption(object: InnerAudioOptionObject): void 

    export interface AvailableAudioSourcesRes {
        readonly audioSources: string[]
    }

    export interface AvailableAudioSourcesObject {
        success?: (res: AvailableAudioSourcesRes) => void
        fail?: (errmsg?: string) => void
        complete?: () => void
    }

    export function getAvailableAudioSources(object: AvailableAudioSourcesObject): void 

    export interface InnerAudioContextErrorRes {
        readonly errCode: number
        readonly errMsg: string
    }

    export class InnerAudioContext {

        src: string 
        startTime: number
        autoplay: boolean
        loop: boolean
        obeyMuteSwitch: boolean
        volume: number
        duration: number
        currentTime: number
        paused: boolean
        buffered: number

        protected openInputStream(v: string): AudioInputStream | undefined
        
        play(): void 
        pause(): void 
        stop(): void 
        seek(position: number): void 
        destroy(): void 
        onCanplay(func: () => void): void 
        offCanplay(func?: () => void): void 
        onPlay(func: () => void): void 
        offPlay(func?: () => void): void 
        onPause(func: () => void): void 
        offPause(func?: () => void): void 
        onStop(func: () => void): void 
        offStop(func?: () => void): void 
        onEnded(func: () => void): void 
        offEnded(func?: () => void): void 
        onTimeUpdate(func: () => void): void 
        offTimeUpdate(func?: () => void): void 
        onError(func: (res: InnerAudioContextErrorRes) => void): void 
        offError(func?: (res: InnerAudioContextErrorRes) => void): void 
        onWaiting(func: () => void): void 
        offWaiting(func?: () => void): void 
        onSeeking(func: () => void): void 
        offSeeking(func?: () => void): void 
        onSeeked(func: () => void): void 
        offSeeked(func?: () => void): void 
    }

    export function createInnerAudioContext() 
}
