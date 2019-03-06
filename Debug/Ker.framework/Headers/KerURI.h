//
//  KerURI.h
//  Ker
//
//  Created by hailong11 on 2019/2/21.
//  Copyright © 2019 kkmofang.cn. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface KerURI : NSObject

+(NSString *) resolveURI:(NSString *) path;

+(NSString *) resolvePath:(NSString *) URI;

+(NSString *) encodeURL:(NSString *) v;

+(NSString *) decodeURL:(NSString *) v;

+(BOOL) isURLInDirectory:(NSString *) URI;

+(NSURL *) baseURLWithURI:(NSString *) URI;

+(NSString *) mimeType:(NSString *) filePath data:(NSData *) data defaultType:(NSString *) defaultType ;

@end
