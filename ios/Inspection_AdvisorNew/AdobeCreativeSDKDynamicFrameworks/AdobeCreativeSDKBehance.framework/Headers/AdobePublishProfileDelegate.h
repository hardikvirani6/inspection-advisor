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

#ifndef AdobePublishProfileDelegateHeader
#define AdobePublishProfileDelegateHeader

NS_ASSUME_NONNULL_BEGIN

@protocol AdobePublishDelegate;
@protocol AdobePublishURLDelegate;

@class AdobePublishUser;

/**
 Allows clients to be notified of profile editing flow.
 */
@protocol AdobePublishProfileDelegate <AdobePublishDelegate, AdobePublishURLDelegate>
@optional

/**
 Called when the profile editing window is about to close.
 */
- (void)profileEditWillClose;

/**
 Called when the profile editing window has closed.
 */
- (void)profileEditDidClose;

/**
 Called on profile edit upload progress for the profile image.
 
 @param progress an `NSProgress` object encapsulating the upload progress for the task
 */
- (void)profileEditImageUploadProgress:(NSProgress *)progress;

/**
 Called on profile editing success.
 
 @param user the updated user profile
 */
- (void)profileEditDidComplete:(AdobePublishUser *)user;

/**
 Called on profile editing failure.
 
 @param error the error that resulted in a failure
 */
- (void)profileEditDidFail:(nullable NSError *)error;

@end

NS_ASSUME_NONNULL_END

#endif
