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

#ifndef AdobePublishNetworkTaskHeader
#define AdobePublishNetworkTaskHeader

NS_ASSUME_NONNULL_BEGIN

/**
 `AdobePublishNetworkTask` sends and receives network calls made to the Behance API
 */
@interface AdobePublishNetworkTask : NSObject

/**
 Cancels the task if it is in the process of making a network call
 */
- (void)cancel;

@end

NS_ASSUME_NONNULL_END

#endif
