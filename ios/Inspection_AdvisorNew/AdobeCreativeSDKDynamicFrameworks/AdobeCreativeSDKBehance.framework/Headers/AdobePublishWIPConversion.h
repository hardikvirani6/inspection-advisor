/******************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2016 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property of
 * Adobe Systems Incorporated and its suppliers, if any. The intellectual and
 * technical concepts contained herein are proprietary to Adobe Systems
 * Incorporated and its suppliers and are protected by trade secret or
 * copyright law. Dissemination of this information or reproduction of this
 * material is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 * THIS FILE IS PART OF THE CREATIVE SDK PUBLIC API
 *
 ******************************************************************************/

#ifndef AdobePublishWIPConversionHeader
#define AdobePublishWIPConversionHeader

#if defined(ADOBEPUBLISH_EXTENSION) && !defined(ADOBEPUBLISH_TVOS)
#import <AdobeCreativeSDKBehanceExtension/AdobePublishContentObject.h>
#else
#import <AdobeCreativeSDKBehance/AdobePublishContentObject.h>
#endif

NS_ASSUME_NONNULL_BEGIN

@class AdobePublishNetworkResponse;

/**
 `AdobePublishWIPConversionStatus` identifies the conversion status of a work in progress into a project
 */
typedef NS_ENUM(NSInteger, AdobePublishWIPConversionStatus) {
    /**
     `AdobePublishWIPConversionStatusUnknown` means the WIP's conversion status is unknown
     */
    AdobePublishWIPConversionStatusUnknown = 0,
    
    /**
     `AdobePublishWIPConversionStatusDoesNotExist` means the WIP does not exist, and has not been converted
     */
    AdobePublishWIPConversionStatusDoesNotExist = 1,
    
    /**
     `AdobePublishWIPConversionStatusNotConverted` means the WIP still exists, and has not been converted
     */
    AdobePublishWIPConversionStatusNotConverted = 2,
    
    /**
     `AdobePublishWIPConversionStatusUnowned` means the WIP may have been converted to a project, but is not owned the requesting user
     */
    AdobePublishWIPConversionStatusUnowned = 3,
    
    /**
     `AdobePublishWIPConversionStatusConvertedNotPublished` means the WIP has been converted to a project, but the project has not been published.
     The associated project is available in the `result` property of the `response`.
     */
    AdobePublishWIPConversionStatusConvertedNotPublished = 4,
    
    /**
     `AdobePublishWIPConversionStatusConvertedPublished` means the WIP has been converted to a project, and the project has been published.
     The associated project is available in the `result` property of the `response`.
     */
    AdobePublishWIPConversionStatusConvertedPublished = 5,
};

/**
 `AdobePublishWIPConversionResponseCompletion` represents the completion block for AdobePublishWIPConversion the network operation.
 */
typedef void(^AdobePublishWIPConversionResponseCompletion)(AdobePublishNetworkResponse *response, AdobePublishWIPConversionStatus status);

/**
 `AdobePublishWIPConversion` aids in discovering the conversion status of a work in progress to a project.
 */
@interface AdobePublishWIPConversion : AdobePublishContentObject <NSCopying, NSCoding>

#pragma mark - API

/**
 Get the conversion status of a work in progress by id
 
 @param wipId id of the work in progress to retrieve
 @param completion `AdobePublishWIPConversionResponseCompletion` callback for the API request
 */
+ (nullable AdobePublishNetworkTask *)wipConversionStatusWithId:(NSNumber *)wipId completion:(AdobePublishWIPConversionResponseCompletion)completion;

@end

NS_ASSUME_NONNULL_END

#endif
