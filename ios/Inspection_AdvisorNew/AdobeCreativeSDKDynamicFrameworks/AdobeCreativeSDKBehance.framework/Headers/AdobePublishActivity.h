/******************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2013 Adobe Systems Incorporated
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

#ifndef AdobePublishActivityHeader
#define AdobePublishActivityHeader

NS_ASSUME_NONNULL_BEGIN

@class AdobePublishActivityActionItem;
@class AdobePublishNetworkTask;

/**
 Convert an activity's type string from the Behance API into a `AdobePublishActivityActionType`
 */
AdobePublishActivityActionType AdobePublishActivityTypeFromString(NSString *typeString);


/**
 `AdobePublishActivity` wraps arrays of activity items returned from the Behance API.
 */
@interface AdobePublishActivity : AdobePublishBaseModel

/**
 The array of `AdobePublishActivityActionItem` items returned by the Behance API.
 */
@property (nonatomic, strong) NSArray<AdobePublishActivityActionItem *> * actions;

/**
 Timestamp for the earliest `AdobePublishActivityActionItem` item creation date returned
 */
@property (nonatomic, assign) NSTimeInterval earliestTS;

/**
 Flag identifying whether more results are available from the Behance API.
 */
@property (nonatomic, assign) BOOL hasMore;


#pragma mark - API

/**
 Activity for the user associated with the current session.
 
 @param completion `AdobePublishNetworkResponseCompletion` callback for the API request
 */
+ (nullable AdobePublishNetworkTask *)fetchActivityWithCompletion:(AdobePublishNetworkResponseCompletion)completion;

/**
 Activity for the user associated with the current session.
 
 @param timestamp Pagination is based on timestamp. For the next page, pass in `earliestTS`; the timestamp of the earliest activity item retrieved.
 @param completion `AdobePublishNetworkResponseCompletion` callback for the API request
 */
+ (nullable AdobePublishNetworkTask *)fetchActivityBeforeTime:(NSTimeInterval)timestamp completion:(AdobePublishNetworkResponseCompletion)completion;

@end

NS_ASSUME_NONNULL_END

#endif
