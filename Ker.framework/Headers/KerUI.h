//
//  KerUI.h
//  Ker
//
//  Created by zhanghailong on 2019/1/3.
//  Copyright © 2019 kkmofang.cn. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Ker/KerViewProtocol.h>

#define KER_VERSION_STR "1.0"
#define KER_VERSION 100000

@class KerPage;
@class KerApp;

typedef enum KerElementType {
    KerElementTypeNone,
    KerElementTypeView,
    KerElementTypePage,
    KerElementTypeText,
    KerElementTypeImage,
    KerElementTypeCanvas,
    KerElementTypeInput
} KerElementType;

typedef void (^KerUIOpenCallback)(KerId appid,NSString * errmsg);

@interface KerUI : NSObject

+(void) setViewClass:(Class) viewClass name:(NSString *) name elementType:(KerElementType) elementType;

+(KerPage *) getPage:(KerId) pageId;

+(void) removePage:(KerId) pageId;

+(void) openPageViewController:(KerId) pageId animated:(BOOL) animated;

+(void) popPageViewController:(NSUInteger)delta animated:(BOOL) animated;

+(UIViewController * ) rootViewController ;

+(void) setContentOffset:(CGPoint) offset viewId:(KerId) viewId;

+(void) emit:(NSString *) name viewId:(KerId) viewId data:(id) data;

+(NSString *) userAgent;

+(void) setUserAgent:(NSString *)v;

+(NSString *) applicationNameForUserAgent;

+(dispatch_queue_t) IOQueue;

+(dispatch_queue_t) UIQueue;

+(NSString *) mimeType:(NSString *) filePath data:(NSData *) data defaultType:(NSString *) defaultType;

+(void) open:(NSString *) URI query:(NSDictionary<NSString *,NSString *> *) query callback:(KerUIOpenCallback) callback;

+(void) openlib;

+(void) enabledDebugger:(int) port;

+(void) disabledDebugger;

@end
