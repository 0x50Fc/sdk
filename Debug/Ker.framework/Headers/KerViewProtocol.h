//
//  KerViewProtocol.h
//  Ker
//
//  Created by zhanghailong on 2018/10/29.
//  Copyright © 2018年 kkmofang.cn. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <WebKit/WebKit.h>

#if defined(__cplusplus)

namespace kk {
    namespace ui {
        class App;
        class View;
        class ViewConfiguration;
        class Page;
        class Command;
        class PageCommand;
        class Animation;
    }
}

typedef unsigned long long KerId;
typedef kk::ui::App * KerAppCPointer;
typedef kk::ui::ViewConfiguration * KerViewConfigurationCPointer;
typedef kk::ui::Page * KerPageCPointer;
typedef kk::ui::Command * KerCommandCPointer;
typedef kk::ui::PageCommand * KerPageCommandCPointer;
typedef kk::ui::Animation * KerAnimationCPointer;

#else

typedef unsigned long long KerId;
typedef void * KerAppCPointer;
typedef void * KerViewConfigurationCPointer;
typedef void * KerPageCPointer;
typedef void * KerCommandCPointer;
typedef void * KerPageCommandCPointer;
typedef void * KerAnimationCPointer;

#endif

@class KerApp;

@protocol KerViewProtocol <NSObject>

+(instancetype) KerViewCreateWithConfiguration:(KerViewConfigurationCPointer) configuration;

-(void) KerViewObtain:(KerId) viewId;

-(void) KerView:(KerId) viewId setAttribute:(NSString *) key value:(NSString *) value baseURL:(NSURL *) baseURL;

-(void) KerView:(KerId) viewId setContent:(NSString *) content contentType:(NSString *) contentType baseURL:(NSURL *) baseURL;

-(void) KerViewRecycle:(KerId) viewId;

-(UIView *) KerViewContentView;

@end




